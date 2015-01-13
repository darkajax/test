angular.module("todoApp",[]).controller("TodoController", function($scope){
	$scope.tasks = (localStorage['tasks'] ? angular.fromJson(localStorage['tasks']) : []);
	$scope.taskEdits = new Array($scope.tasks.length);
	$scope.Title = "To Do List (with localStorage)";
	
	$scope.checkCompleted = function(){
		var comp = false;
		var cnt = 0;
		angular.forEach($scope.tasks, function(task){
			if(task.done) comp = true;
			else cnt++;
		});
		$scope.pendingCount = cnt;
		$scope.completedCount = $scope.tasks.length - cnt;
		return comp;
	}

	$scope.completedExist = $scope.checkCompleted();

	$scope.updateTasks = function(){
			var updated = $scope.tasks;
			localStorage['tasks'] = angular.toJson(updated);
			$scope.completedExist = $scope.checkCompleted();
			//console.log($scope.tasks);
	}

	$scope.addTask = function(){
		if($scope.newTask) {
			var current = {text:$scope.newTask,done:false};
			$scope.tasks.push(current);
			//console.log($scope.newTask);
			$scope.newTask = '';
			$scope.updateTasks(current);
			//console.log($scope.tasks);
		} /*else { }*/
	}

	$scope.removeCompleted = function(){
		$scope.tasks = $scope.tasks.filter(function(e){
			return ! e.done;
		});
		$scope.updateTasks();
	}

	$scope.removeTask = function(idx){
		$scope.tasks.splice(idx,1);
		$scope.updateTasks();
	}

	$scope.changeAll = function(val){
		angular.forEach($scope.tasks,function(task){
			task.done = val;
		});
		$scope.updateTasks();
	}

	$scope.makeEditable = function(idx){
		$scope.taskEdits[idx] = !$scope.taskEdits[idx];
	}

});