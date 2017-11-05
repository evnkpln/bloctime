(function() {
    function TaskBarCtrl(Tasks) {
      this.val = 'Task Name';
      this.tasks = Tasks.all;
      this.addTask = function(newTask){
        Tasks.addTask({name: newTask, completed: true, completedAt: Date.now()});
      };
    }

    angular
        .module('blocTime')
        .controller('TaskBarCtrl', ['Tasks', TaskBarCtrl]);
})();
