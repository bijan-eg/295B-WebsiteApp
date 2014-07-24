'use strict';
/* Controllers */
angular.module('travelApp.controllers', [])
  .controller('NewPackageController', ['$scope','$http', 'JWTtoken', function($scope, $http, JWTtoken) {
	JWTtoken.getToken(function(JWTtoken) {
	$scope.myToken = JWTtoken["token"];	
	});
	$scope.createPackage = function(resultPackage) {
		var payload = {
		"package_name": $scope.package_name, 
		"description": $scope.description, 
		"start_date": $scope.start_date, 
		"end_date": $scope.end_date, 
		"package_type": $scope.package_type, 
		"flight": "false", 
		"hotel": "true", 
		"insurance": "false", 
		"restaurant": "false", 
		"local_booking": "false", 
		};	
		 $http({ url:"http://mighty-lowlands-2957.herokuapp.com/agentapp/packages/",
			method: "POST",
			data:payload,
			headers:{"Authorization":"JWT "+$scope.myToken}
		})
		.success(function(data, status, headers, config) {
			$scope[resultPackage] = data;
		})
		.error(function(data, status, headers, config) {
			$scope[resultPackage] = status; 
		});
	};		 
  }])
  .controller('CreatedPackagesController', ['$scope', 'packages',  function($scope, packages) {
	  packages.list(function(packages) {
		  $scope.packages = packages;
	  });
  }])
  .controller('ReservedPackagesController', ['$scope', 'packages', function($scope, packages) {
		packages.list(function(packages) {
		  $scope.packages = packages;
	  });
	  $scope.Apackage={};
	  $scope.currentPackage={};
  }])
  .controller('PublishedPackagesController', ['$scope', 'packages', function($scope, packages) {
		packages.list(function(packages) {
		  $scope.packages = packages;
	  });
  }])
  .controller('PackageDetailController', ['$scope', '$routeParams', 'packages', '$http', function($scope, $routeParams, packages, $http) {
	packages.find($routeParams.pid, function(singlepackage) {
		$scope.singlepackage = singlepackage;
	});
	$scope.searchHotel = function(hotelResults) {
		$http({
			method: 'GET',
			url: 'http://mighty-lowlands-2957.herokuapp.com/agentapp/hotels/?city='+$scope.hotelCity+'&state='+$scope.hotelState+'&startDate='+$scope.hotelStartDate+'&endDate='+$scope.hotelEndDate,
			cache: true
		})
		.success(function(data, status, headers, config) {
			$scope[hotelResults] = data;
		})
		.error(function(data, status, headers, config) {
			$scope[hotelResults] = status; 
		});
	}
	//hotels.search($scope.hotelCity, $scope.hotelState, $scope.hotelStartDate, $scope.hotelEndDate, function(hotels){
	//	$scope.hotelResults = hotels;
	//});
  }])
  .controller('ReservePackageController', ['$scope', function($scope) {  
  }])
  .controller('SearchHotelsController', ['$scope', function($scope  ) {	
	/*$scope.searchHotel = function(hotelResults) {
		$http({
			method: 'GET',
			url: 'http://mighty-lowlands-2957.herokuapp.com/agentapp/hotels/?city='+$scope.hotelCity+'&state='+$scope.hotelState+'&startDate='+$scope.hotelStartDate+'&endDate='+$scope.hotelEndDate,
			cache: true
		})
		.success(function(data, status, headers, config) {
			$scope[hotelResults] = data;
		})
		.error(function(data, status, headers, config) {
			$scope[hotelResults] = status; 
		});
	}*/
  }])