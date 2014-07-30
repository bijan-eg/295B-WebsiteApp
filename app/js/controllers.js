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
  .controller('PackageDetailController', ['$scope', '$routeParams', 'packages', '$http', 'JWTtoken', function($scope, $routeParams, packages, $http, JWTtoken) {
	packages.find($routeParams.pid, function(singlepackage) {
		$scope.singlepackage = singlepackage;
	});
	JWTtoken.getToken(function(JWTtoken) {
	$scope.myToken = JWTtoken["token"];	
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
	$scope.removePackage = function(id, removingpackage) {
		//var deletePackage = $window.confirm('Are you sure you want to delete this package?');
		//if (deletePackage) {
			//packages.remove($routeParams.pid, function(removedPackage){
				//$scope.removedpackage = removedPackage;
			//});
			$http({ url:'http://mighty-lowlands-2957.herokuapp.com/agentapp/packages/'+id,
			method: "DELETE",
			headers:{"Authorization":"JWT "+$scope.myToken}
			})
			.success(function(data, status, headers, config) {
				$scope[removingpackage] = data;
			})
			.error(function(data, status, headers, config) {
				$scope[removingpackage] = status; 
			});
			//$window.alert('Package Deleted!');
		//}
	}
	$scope.bookSelectedHotel = function(booking) {
		 var payload = {
		"hotelId": $scope.hotelResults.HotelListResponse.HotelList.HotelSummary[0].hotelId,
		"arrivalDate": $scope.startDate,
		"departureDate": $scope.endDate,
		"supplierType": $scope.hotelResults.HotelListResponse.HotelList.HotelSummary[0].supplierType,
		"roomTypeCode": $scope.hotelResults.HotelListResponse.HotelList.HotelSummary[0].RoomRateDetailsList.RoomRateDetails.roomTypeCode,
		"rateCode": $scope.hotelResults.HotelListResponse.HotelList.HotelSummary[0].RoomRateDetailsList.RoomRateDetails.rateCode,
		"chargeableRate": $scope.hotelResults.HotelListResponse.HotelList.HotelSummary[0].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo['@total'],
		"room1": "2",
		"room1FirstName": "test", 
		"room1LastName": "tester", 
		"room1BedTypeId": "23",
		"room1SmokingPreferece": "NS",
		"email": $scope.bookemail,
		"firstName": "test", 
		"lastName": "tester",
		"city": "Seattle", 
		"stateProvinceCode": "WA", 
		"countryCode": "US", 
		"postalCode": "98004"
		};	
		// "Content-Type": "application/json",
		 $http({
			url:"http://mighty-lowlands-2957.herokuapp.com/agentapp/hotel-reservation/",
			method: "POST",
			data: payload,
			headers:{"Content-Type": "application/json","Authorization":"JWT "+$scope.myToken}
		})
		.success(function(data, status, headers, config) {
			$scope.booking = data;
		})
		.error(function(data, status, headers, config) {
			$scope.booking = data; 
		});
	};
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