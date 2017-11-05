(function() {
    function TaskBarCtrl(Tasks) {
      this.val = 'Task Name';
      this .addTask = function(newTask){
        Tasks.addTask({name: newTask});
      };
    }

    angular
        .module('blocTime')
        .controller('TaskBarCtrl', ['Tasks', TaskBarCtrl]);
})();
