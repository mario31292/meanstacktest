var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

	var refresh = function() {
		$scope.hide = "none";
		$http.get('/app/user').success(function(response) {
			console.log(response);
			$scope.user = response;
			var username = response.login;
			$http.get('/app/courses/' + username).success(function(response){
				$scope.courses = response;
			})
		});
	};

	refresh();

	$scope.logout = function() {
		$scope.logout = "/";
		$http.get('/app/logout').success(function(response) {
			console.log("session closed...");
			$scope.user = "";
		});
	}


	var updateViews = function(){
		for (var i = $scope.courses.length - 1; i >= 0; i--) {
			$('#'+$scope.courses[i]._id).attr('style', 'display: none');
		}
			
	}

	$scope.act = function(id) {
		if($('#'+id).css('display') === 'none'){
			updateViews();
			$('#'+id).removeAttr("style");
		}else{
			updateViews();
		}
	}



}]);