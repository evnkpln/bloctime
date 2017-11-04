(function() {
  function PomTimer($interval){
    var PomTimer = {};

/* =========================================================================
*                     PRIVATE VARIABLES
    /**
    * @desc Default length of Pomodoros and breaks in minutes.
    * @type {Number}
    */
    const POM_TIME = 25;
    const BREAK_TIME = 5;
    /**
    * @desc Remaining time in seconds.
    * @type {Number}
    */
    var remTime = POM_TIME * 60;
    /**
    * @desc True if the timer is running.
    * @type {Boolean}
    **/
    var running = false;
    /**
    * @desc Current $interval promise.
    * @type {Promise}
    */
    var timerPromise;

/* =========================================================================
*                     PRIVATE FUNCTIONS                                       */
    /**
    * @function toClock
    * @desc Converts input time in seconds into clock format.
    * @param {Number} time
    * @returns {String}
    */
    var toClock = function(time) {
      var seconds = Math.abs(time%60);
      var minutes = Math.floor(time/60);
      var buffer = "";
      if (seconds<10) {
        buffer = "0";
      }
      return minutes + ":" + buffer + seconds;
    };
    /**
    * @function updateClock
    * @desc Sets the Pomtimer.clock to current value based on remTime.
    **/
    var updateClock = function() {
      PomTimer.clock = toClock(remTime);
    };
    /**
    * @function tickTime
    * @desc Decrements timer by 1 or optional input and updates clock. Handles timer ending.
    * @param {Number} time Optional. Default 1.
    **/
    var tickTime = function({ time = 1 }) {
      remTime -= time;
      updateClock();
      if(remTime <= 0 && !PomTimer.ringing) {
        ringTimer();
      }
    };
    /**
    * @function setTime
    * @desc Sets the timer based on current paramaters.
    **/
    var setTime = function() {
      remTime = (PomTimer.mode == "Work") ? POM_TIME * 60 : BREAK_TIME * 60;
      updateClock();
    };
    /**
    * @function ringTimer
    * @desc Ends timer. TODO: Make timer ring.
    **/
    var ringTimer = function() {
      PomTimer.ringing = true;
    };
/* =========================================================================
*                           PUBLIC VARIABLES                              */
    /**
    * @desc Current time in clock format
    * @type {String}
    */
    PomTimer.clock = toClock(remTime);
    /**
    * @desc Text for the start button.
    * @type {String}
    */
    PomTimer.buttonText = "Start";
    /**
    * @desc Current mode of the timer. Either "work" or "break"
    * @type {String}
    **/
    PomTimer.mode = "Work";
    /**
    * @desc True if timer is ringing.
    * @type {Boolean}
    **/
    PomTimer.ringing = false;
/* =========================================================================
*                           PUBLIC METHODS                                */
    /**
    * @function toggle
    * @desc Starts timer if running or resets it if not.
    **/
    PomTimer.toggle = function() {
      running ? PomTimer.reset() : PomTimer.start();
    };
    /**
    * @function start
    * @desc Starts the timer.
    **/
    PomTimer.start = function() {
      timerPromise = $interval(tickTime, 1000);
      running = true;
      PomTimer.buttonText = "Reset";
    };
    /**
    * @function reset
    * @desc Resets the timer.
    **/
    PomTimer.reset = function() {
      $interval.cancel(timerPromise);
      running = false;
      PomTimer.buttonText = "Start";
      setTime();
    };
    /**
    * @function end
    * @desc Ends the timer and sets up a new one.
    **/
    PomTimer.end = function() {
      if(PomTimer.mode == "Work"){
        PomTimer.mode = "Break";
      } else {
        PomTimer.mode = "Work";
      }
      PomTimer.ringing = false;
      PomTimer.reset();
    };
    /**
    * @function skipTime
    * @desc FOR TESTING. Skips time by specified time in seconds.
    * @param {Number} time
    **/
    PomTimer.skipTime = function (time) {
      tickTime({ time });
    };
    return PomTimer;
  }

  angular
    .module('blocTime')
    .factory('PomTimer', ['$interval', PomTimer]);
})();
