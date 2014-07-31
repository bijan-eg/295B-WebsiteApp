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
		 $http({
		    url:"http://mighty-lowlands-2957.herokuapp.com/agentapp/packages/",
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
  
  .controller('NewPackageCreatedController', ['$scope', 'packages', '$routeParams', function($scope, packages, $routeParams) {
	  
	packages.create($routeParams.pkgName, $routeParams.desc, $routeParams.newstartMonth+"/"+$routeParams.newstartDay+"/"+$routeParams.newstartYear, $routeParams.newendMonth+"/"+$routeParams.newendDay+"/"+$routeParams.newendYear, $scope.myToken, function(newPackage){
		$scope.resultPackage = newPackage;
	});
  }])
  
  .controller('CreatedPackagesController', ['$scope', 'packages', function($scope, packages) {
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
  
  .controller('PackageDetailController', ['$scope', '$routeParams', 'packages', '$http', 'JWTtoken', '$window', function($scope, $routeParams, packages, $http, JWTtoken, $window) {
	packages.find($routeParams.pid, function(singlepackage) {
		$scope.singlepackage = singlepackage;
	});
	
	JWTtoken.getToken(function(JWTtoken) {
	$scope.myTokenD = JWTtoken["token"];	
	});
	$scope.removePackage = function(removingpackage) {
		var deletePackage = $window.confirm('Are you sure you want to delete this package?');
		if (deletePackage) {
			$http({ url:'http://mighty-lowlands-2957.herokuapp.com/agentapp/packages/'+$routeParams.pid+'/',
			method: "DELETE",
			headers:{"Authorization":"JWT "+$scope.myTokenD}
			})
			.success(function(data, status, headers, config) {
				$scope[removingpackage] = data;
			})
			.error(function(data, status, headers, config) {
				$scope[removingpackage] = status; 
			});
			$window.alert('Package Deleted!');
		}
	}
  }])
  
  .controller('ReservePackageController', ['$scope', function($scope) {  
  }])
  
  .controller('SearchHotelsController', ['$scope', 'packages', '$routeParams', '$http',
										function($scope, packages, $routeParams, $http){
	
	packages.find($routeParams.pid, function(singlepackage) {
		$scope.singlepackage = singlepackage;
	});	
  }])
  
  .controller('SearchHotelsResultsController', ['$scope', 'packages', 'hotels', '$routeParams', function($scope, packages, hotels, $routeParams){
		
		packages.find($routeParams.pid, function(singlepackage) {
			$scope.singlepackage = singlepackage;
		});
		
		hotels.search ($routeParams.hotelCity, $routeParams.hotelState, $routeParams.startMonth+"/"+$routeParams.startDay+"/"+$routeParams.startYear, $routeParams.endMonth+"/"+$routeParams.endDay+"/"+$routeParams.endYear, function(results){
			$scope.hotelResults = results;
			console.log($scope.hotelResults);
		});
  }])
	
  .controller('HotelBookController', ['$scope', 'packages', 'JWTtoken', '$routeParams', '$http', 'sharedProperties', function($scope, packages, JWTtoken, $routeParams, $http, sharedProperties){
		
		packages.find($routeParams.pid,  function(singlepackage) {
			$scope.singlepackage = singlepackage;
		});
		
		sharedProperties.sethotelId($routeParams.hid);
		sharedProperties.setroomTypeCode($routeParams.roomTypeCode);
		sharedProperties.setrateCode($routeParams.rateCode);
		sharedProperties.setchargeableRate($routeParams.chargeableRate);		
		
		
		/*$scope.bookSelectedHotel = function(booking) {
		 $http({
			url:"http://mighty-lowlands-2957.herokuapp.com/agentapp/hotel-reservation/",
			method: "POST",
			data: payload,
			headers:{"Content-Type": "application/json","Authorization":"JWT "+$scope.newToken}
		 })
		 .success(function(data, status, headers, config) {
			$scope.booking = data;
		 })
		 .error(function(data, status, headers, config) {
			$scope.booking = status; 
		 });
		};*/
  }])
  .controller('HotelBookConfirmController', ['$scope', 'JWTtoken', 'packages', 'hotels',  'sharedProperties', function($scope, JWTtoken, packages, hotels, sharedProperties){
		//$scope.newToken = {};
		//JWTtoken.getToken(function(JWTtoken) {
			// $scope.newToken = JWTtoken;
			//sharedProperties.setToken(tokenTest);
			//["token"]
//		});			
		
		/*
		payload.hotelId = ;
		payload.roomTypeCode = ;
		payload.rateCode = ;
		payload.chargeableRate = ;*/
		
		hotels.book(sharedProperties.gethotelId(), sharedProperties.getroomTypeCode(), sharedProperties.getrateCode(), sharedProperties.getchargeableRate(),  function(booking){
			$scope.booking = booking;
		});
  }])