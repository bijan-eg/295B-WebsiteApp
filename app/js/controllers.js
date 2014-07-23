'use strict';

/* Controllers */

angular.module('travelApp.controllers', [])
  
  .controller('NewPackageController', ['$scope', '$http', function($scope, $http) {
		
		 $scope.formData = {};
		 
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
  .controller('PackageDetailController', ['$scope', '$routeParams', 'packages', function($scope, $routeParams, packages) {
	packages.find($routeParams.pid, function(singlepackage) {
	$scope.singlepackage = singlepackage;
	});
  }])
  .controller('ReservePackageController', ['$scope', function($scope) {
  
  }])