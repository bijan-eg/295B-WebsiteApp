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
  
  .controller('AssignedPackagesController', ['$scope', 'packages', function($scope, packages) {
		packages.list(function(packages) {
		  $scope.packages = packages;
	  });
  }])
  
  .controller('EditPackageController', ['$scope', '$routeParams', 'packages', function($scope, $routeParams, packages) {
	packages.find($routeParams.pidd, function(singlepackage) {
		$scope.singlepackagee = singlepackage;
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
				alert('Package has been deleted. Refresh your browser to get updated list of packages');
			})
			.error(function(data, status, headers, config) {
				$scope[removingpackage] = status; 
			});
			$window.alert('Package Deleted!');
		}
	}
	$scope.editPackage = function(editResult){
		$http({ url:'http://mighty-lowlands-2957.herokuapp.com/agentapp/packages/'+$routeParams.pid+'/',
			method: "PUT",
			headers:{"Authorization":"JWT "+$scope.myTokenD}
			})
			.success(function(data, status, headers, config) {
				$scope[editResult] = data;
				alert('Package has been edited. Refresh your browser to get updated list of packages');
			})
			.error(function(data, status, headers, config) {
				$scope[editResult] = status; 
			});
	}
  }])
  
  .controller('ReservePackageController', ['$scope', function($scope) {  
  }])
  
  .controller('SearchHotelsController', ['$scope', 'packages', '$routeParams', 'hotels', 'JWTtoken', '$http', function($scope, packages, $routeParams, hotels, JWTtoken, $http){
	
	/*$scope.names = ['Larry', 'Curly', 'Moe'];
	$scope.addName = function() {
          $scope.names.push($scope.enteredName);
          $scope.enteredName = '';
        };*/
		
	
	//$scope.formElements = ['Larry', 'Curly', 'Moe'];
	//$scope.hotelCity = 'fresno';
	
	//$scope.hotelSearchCity = {hotelCity: "fresno"};
	//$scope.hotelSearchCities = [{"hotelCity":"fresno"}];
	//$rootScope.test = $scope.hotelSearchCity.hotelCity;
	//$scope.hotelState = "";
	
	packages.find($routeParams.pid, function(singlepackage) {
		$scope.singlepackage = singlepackage;
	});	
	//$scope.temp = $scope.hotelCity;
	//$scope.setSearch = function(){
	
	//$routeParams.srtartDate = encode($scope.startDate);
		hotels.search($routeParams.hotelCity, $routeParams.hotelState, $routeParams.startMonth+"/"+$routeParams.startDay+"/"+$routeParams.startYear, $routeParams.endMonth+"/"+$routeParams.endDay+"/"+$routeParams.endYear, function(hotelResults){		
		//$routeParams.startMonth+"/"+$routeParams.startDay+"/"+$routeParams.startYear
			$scope.hotelResults = hotelResults;
	//		console.log($scope.hotelResults);
		});
	//}
/*	$scope.setSearch = function(){
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
			//$scope.bookrateCode = hotelResults.HotelListResponse.HotelList.HotelSummary[0].RoomRateDetailsList.RoomRateDetails.rateCode;	
		}
	};*/
	//$scope.hotelResultsGlobal = $rootScope.hotelResultsGlobalroot
	//$scope.bookrateCode2 = "test2";
	JWTtoken.getToken(function(JWTtoken) {
		$scope.myTokenH = JWTtoken["token"];	
	});
	
		var payload = {
		"hotelId": "211150",//$routeParams.hotelId,// $scope.hotelResults.HotelListResponse.HotelList.HotelSummary[0].hotelId, //$scope.hotelResults.HotelListResponse.HotelList.HotelSummary[0].hotelId,
		"arrivalDate": "09/10/2014", //or $scope.hotelSearchStart.hotelStartDate
		"departureDate": "09/12/2014", //or $scope.hotelSearchStart.hotelDateDate
		"supplierType": "E", //$scope.hotelResults.HotelListResponse.HotelList.HotelSummary[0].supplierType,
		"roomTypeCode": "286780",//$routeParams.roomType,//$scope.hotelResults.HotelListResponse.HotelList.HotelSummary[0].RoomRateDetailsList.RoomRateDetails.roomTypeCode,
		"rateCode": "844454",//$routeParams.rateCode,//$scope.hotelResults.HotelListResponse.HotelList.HotelSummary[0].RoomRateDetailsList.RoomRateDetails.rateCode,
		"chargeableRate": "228.97",//$routeParams.chargeRate,//$scope.hotelResults.HotelListResponse.HotelList.HotelSummary[0].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo['@total'],
		"room1": "2",
		"room1FirstName": "test", //$scope.bookroom1FirstName,
		"room1LastName": "tester", //$scope.bookroom1LastName,
		"room1BedTypeId": "23",
		"room1SmokingPreferece": "NS",
		"email": "bijan.eghtesadi@gmail.com", //$scope.bookemail,
		"firstName": "test", //$scope.bookfirstName,
		"lastName": "tester", //$scope.booklastName,
		"city": "Seattle", //$scope.bookcity,
		"stateProvineCode": "WA", //$scope.bookstateProvinceCode,
		"countryCode": "US", //$scope.bookcountryCode,
		"postalCode": "98004", //$scope.bookpostalCode,
		"packageId": "1" //$scope.singlepackage.id
		};
		
	/*	hotels.book(payload, function(result){
			$scope.bookResult = result;
		});*/
		
	$scope.bookSelectedHotel = function(bookHotel) {
		 $http({
			url:"http://mighty-lowlands-2957.herokuapp.com/agentapp/hotel-reservation/",
			method: "POST",
			data: payload,
			headers:{"Authorization":"JWT "+$scope.myTokenH}
		})
		.success(function(data, status, headers, config) {
			$scope[bookHotel] = data;
		})
		.error(function(data, status, headers, config) {
			$scope[bookHotel] = status;
		});
	}
  }])
  
  //.controller('HotelSearchResultsController', ['$scope', 'packages', 'JWTtoken', '$routeParams', '$http', function($scope, packages, JWTtoken, $routeParams, $http){

//  }])
  
  .controller('BookHotelsController', ['$scope', 'packages', 'JWTtoken', '$routeParams', '$http', function($scope, packages, JWTtoken, $routeParams, $http){

  }])