var app = angular.module('task', [ 'ngRoute' ]);

app.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl : 'partials/dashboard.html',
		controller : 'taskCtrl'
	}).when('/task', {
		templateUrl : 'partials/task.html',
		controller : 'taskCtrl'
	}).when('/myaccount', {
		templateUrl : 'partials/myaccount.html',
	}).otherwise({
		redirectTo : '/home'
	});
} ]);

app.controller('taskCtrl', function($scope, $http, $filter) {
 
	$scope.today = Date.now();
    $scope.curDate = $filter('date')($scope.today, "MM-dd-yyyy");
	$http.get("data/data.json").success(function(response) {
		$scope.tasks = response.tasks;
	});

	$scope.getPendingItems = function() {
		return $scope.tasks.filter(function(item) {
			return item.assignee === false;
		}).length

	};

	$scope.getCompletedItems = function() {
		return $scope.tasks.filter(function(item) {
			return item.assignee === true;
		}).length

	};

	$scope.getItemsDueToday = function() {
		return $scope.tasks.filter(function(item) {
			return item.due <= $scope.curDate;
		}).length

	};

});