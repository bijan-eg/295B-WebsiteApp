'use strict';

/* Services */

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
<<<<<<< HEAD
  
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
		}/*,
		book: function(payload, callback){
			$http({
				url:"http://mighty-lowlands-2957.herokuapp.com/agentapp/hotel-reservation/",
				method: "POST",
				data: payload,
				headers:{"Authorization":"JWT "+$scope.myTokenH}
			}).success(callback);
		}*/
	};
  })
  
//  .factory('searchResultsService', function(){
	//return{
		//show: funtion(callback){
		
  .value('version', '0.1');
=======
  .value('version', '0.1');
>>>>>>> parent of 2bf1df7... new package and reserve package ui
