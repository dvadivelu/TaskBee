var app = angular.module('login', []);
app.controller('appCtrl', function($scope, $http) {
	$scope.signin = function() {
		$http({
			method : 'POST',
			url : 'LoginServlet',
			params : {
				uemail : $scope.email,
				upassword : $scope.password
			}
		}).success(function(response) {
			window.location = response;
		});
	};
});


