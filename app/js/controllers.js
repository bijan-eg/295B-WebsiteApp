'use strict';

/* Controllers */

angular.module('travelApp.controllers', [])
  
  .controller('NewPackageController', ['$scope', function($scope) {

  }])
  .controller('CreatedPackagesController', ['$scope', 'packages',  function($scope, packages) {
	  $scope.packagesNew = {};
	  packages.list(function(packages) {
		  $scope.packagesNew = packages["results"];
	  });
  }])
  .controller('ReservedPackagesController', ['$scope', function($scope) {
  
  }])
  .controller('PublishedPackagesController', ['$scope', function($scope) {
  
  }])
  .controller('PackageDetailController', ['$scope', '$routeParams', 'packages', function($scope, $routeParams, packages) {
	packages.find($routeParams.pid, function(singlepackage) {
	$scope.singlepackage = singlepackage;
	});
  }])
  .controller('ReservePackageController', ['$scope', function($scope) {
  
  }])