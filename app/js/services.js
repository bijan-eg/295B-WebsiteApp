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
  .value('version', '0.1');
