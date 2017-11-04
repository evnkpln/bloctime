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
    * @desc Current mode of the timer. Either "work" or "break"
    * @type {String}
    **/
    var mode = "work";
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
      var seconds = time%60;
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
    * @desc Decrements timer by 1 or optional input and updates clock.
    * @param {Number} time Optional. Default 1.
    **/
    var tickTime = function({ time = 1 }) {
      remTime -= time;
      updateClock();
    };
    /**
    * @function setTime
    * @desc Sets the timer based on current paramaters.
    **/
    var setTime = function() {
      remTime = (mode == "work") ? POM_TIME * 60 : BREAK_TIME * 60;
      updateClock();
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
    * @function skipTime
    * @desc FOR TESTING. Skips time by specified time in seconds.
    * @param {Number} time
    **/
    PomTimer.skipTime = function (time) {
      tickTime({ time });
    };
    /**
    * @function buttonText
    * @desc Returns appropriate string for start button.
    * @returns {String}
    **/
    return PomTimer;
  }

  angular
    .module('blocTime')
    .factory('PomTimer', ['$interval', PomTimer]);
})();
