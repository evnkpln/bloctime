(function() {
  function Tasks($firebaseArray) {
    var ref = firebase.database().ref().child("tasks");

    // download tasks into a synchronized array
    var tasks = $firebaseArray(ref);
    var addTask = function(newTask){
      this.all.$add(newTask);
    };

    return {
      all: tasks,
      addTask: addTask
    };
  }

  angular
    .module('blocTime')
    .factory('Tasks', ['$firebaseArray', Tasks]);
})();
