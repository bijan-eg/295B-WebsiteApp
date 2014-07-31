'use strict';

/* Services */
// http://mighty-lowlands-2957.herokuapp.com
// http://127.0.0.1:9000/agentapp/packages/
angular.module('travelApp.services', [])
  .factory('packages', function($http){
    return {
		list: function (callback) {
			$http({
				method: 'GET',
				url: 'http://mighty-lowlands-2957.herokuapp.com/agentapp/packages/',
				cache: true
			}).success(callback);
		},
		find: function (id, callback){
			$http({
				method: 'GET',
				url: 'http://mighty-lowlands-2957.herokuapp.com/agentapp/packages/'+id,
				cache: true
			}).success(callback);
		},
		create: function (name, desc, SDate, EDate, Type, token, callback){
			var payload = {
				"package_name": name, 
				"description": desc, 
				"start_date": SDate, 
				"end_date": EDate, 
				"package_type": Type, 
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
				headers:{"Authorization":"JWT "+token}
			}).success(callback);
		}
	};
  })
  
  .factory('JWTtoken', function($http){
   return {
		getToken: function (callback) {
			$http({
				method: 'POST',
				url: 'http://mighty-lowlands-2957.herokuapp.com/api-token-auth/',
				data: {"username":"bipul", "password":"cmpe295"}
			}).success(callback);
		}
   };
  })
  
  .factory('hotels', function($http, JWTtoken){
	return{
		search: function(city, state, startDate, endDate, callback){
			$http({
				method: 'GET',
				url: 'http://mighty-lowlands-2957.herokuapp.com/agentapp/hotels/?city='+city+'&state='+state+'&startDate='+startDate+'&endDate='+endDate,
				cache: true
			}).success(callback);
		},
		book: function(hotelId, roomTypeCode, rateCode, chargeableRate, callback){
			var payload = {
			"hotelId": hotelId,//$scope.hotelResults.HotelListResponse.HotelList.HotelSummary[0].hotelId,
			"arrivalDate": "09/23/2014",//$scope.startDate,
			"departureDate": "09/25/2014",//$scope.endDate,
			"supplierType": "E",//$routeParams.supplierType,//$scope.hotelResults.HotelListResponse.HotelList.HotelSummary[0].supplierType,
			"roomTypeCode": roomTypeCode, //$scope.hotelResults.HotelListResponse.HotelList.HotelSummary[0].RoomRateDetailsList.RoomRateDetails.roomTypeCode,
			"rateCode": rateCode,//$scope.hotelResults.HotelListResponse.HotelList.HotelSummary[0].RoomRateDetailsList.RoomRateDetails.rateCode,
			"chargeableRate": chargeableRate,//$scope.hotelResults.HotelListResponse.HotelList.HotelSummary[0].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo['@total'],
			"room1": "2",
			"room1FirstName": "test", 
			"room1LastName": "tester", 
			"room1BedTypeId": "23",
			"room1SmokingPreferece": "NS",
			"email": "bijan.eghtesadi@gmail.com",//$scope.bookemail,
			"firstName": "test", 
			"lastName": "tester",
			"city": "Seattle", 
			"stateProvinceCode": "WA", 
			"countryCode": "US", 
			"postalCode": "98004"
			};
			var token = JWTtoken.getToken(function(Atoken){
				return Atoken["token"];
			});
			$http({
				url:"http://mighty-lowlands-2957.herokuapp.com/agentapp/hotel-reservation/",
				method: "POST",
				data: payload,
				headers:{"Authorization":"JWT "+token}
			}).error(callback);
		}
	};
  })
  
  .factory('sharedProperties', function(){
	//var property = {};
	var hotelId = '';
	var roomTypeCode = '';
	var rateCode = '';
	var chargeableRate = '';
	var token = '';
        return {
            gethotelId: function () {
                return hotelId;
            },
			getroomTypeCode: function () {
                return roomTypeCode;
            },
			getrateCode: function () {
                return rateCode;
            },
			getchargeableRate: function () {
                return chargeableRate;
            },
			getToken: function(){
				return token;
			},
			sethotelId: function(value) {
                hotelId = value;
            },
			setroomTypeCode: function(value) {
                roomTypeCode = value;
            },
			setrateCode: function(value) {
                rateCode = value;
            },
            setchargeableRate: function(value) {
                chargeableRate = value;
            },
			setToken: function(value){
				token = value;
			}
        };
  })
  
//  .factory('searchResultsService', function(){
	//return{
		//show: funtion(callback){
		
  .value('version', '0.1');
