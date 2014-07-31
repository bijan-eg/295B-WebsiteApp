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
  
  .factory('hotels', function($http){
	return{
		search: function(city, state, startDate, endDate, callback){
			$http({
				method: 'GET',
				url: 'http://mighty-lowlands-2957.herokuapp.com/agentapp/hotels/?city='+city+'&state='+state+'&startDate='+startDate+'&endDate='+endDate,
				cache: true
			}).success(callback);
		}/**,
		book: function(payload,token, callback){
			$http({
				url:"http://mighty-lowlands-2957.herokuapp.com/agentapp/hotel-reservation/",
				method: "POST",
				data: payload,
				headers:{"Authorization":"JWT "+token}
			}).success(callback);
		}**/
	};
  })
  
.factory('sharedProperties', function(){
	//var property = {};
	var hotelCity = '';
	var hotelState = '';
	var startDate = '';
	var endDate = '';
	var pid = '';
        return {
            getHotelCity: function () {
                return hotelCity;
            },
			getHotelState: function () {
                return hotelState;
            },
			getStartDate: function () {
                return startDate;
            },
			getEndDate: function(){
				return endDate;
			},
			getPid: function(){
				return pid;
			},
			setPid: function(value) {
                pid = value;
            },
			setHotelCity: function(value) {
                hotelCity = value;
            },
			setHotelState: function(value) {
                hotelState = value;
            },
			setStartDate: function(value) {
                startDate = value;
            },
			setEndDate: function(value){
				endDate = value;
			}
        };
  })
  
		
  .value('version', '0.1');
