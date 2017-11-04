(function() {
    function PomodoroCtrl(PomTimer) {
      POM_TIME = 25;
      this.pomTimer = PomTimer;
    }

    angular
        .module('blocTime')
        .controller('PomodoroCtrl', ['PomTimer', PomodoroCtrl]);
})();
