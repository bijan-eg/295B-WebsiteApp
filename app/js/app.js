'use strict';


// Declare app level module which depends on filters, and services
angular.module('travelApp', [
  'ngRoute',
  'travelApp.filters',
  'travelApp.services',
  'travelApp.directives',
  'travelApp.controllers'
]).
config(['$routeProvider', function($routeProvider) { 
$routeProvider.when('/new-package', {templateUrl: 'partials/new-package.html', controller: 'NewPackageController'});
  $routeProvider.when('/created-packages', {templateUrl: 'partials/created-packages.html', controller: 'CreatedPackagesController'});  
  $routeProvider.when('/reserved-packages', {templateUrl: 'partials/reserved-packages.html', controller: 'ReservedPackagesController'});
  $routeProvider.when('/published-packages', {templateUrl: 'partials/published-packages.html', controller: 'PublishedPackagesController'});
  $routeProvider.when('/assigned-packages', {templateUrl: 'partials/assigned-packages.html', controller: 'AssignedPackagesController'});
  http://mighty-lowlands-2957.herokuapp.com/agentapp/assigned-packages/
  $routeProvider.when('/created-packages/:pid', {templateUrl: 'partials/package-detail.html', controller: 'PackageDetailController'});
<<<<<<< HEAD
  $routeProvider.when('/created-packages/:pidd/edit', {templateUrl: 'partials/edit-package.html', controller: 'EditPackageController'});
  $routeProvider.when('/created-packages/:pid/reserve', {templateUrl: 'partials/reserve-package.html', controller: 'PackageDetailController'});  
  $routeProvider.when('/created-packages/:pid/reserve/hotelSearch', {templateUrl: 'partials/hotel-search.html', controller: 'SearchHotelsController'});
  $routeProvider.when('/created-packages/:pid/reserve/hotelSearch/:hotelCity/:hotelState/:startMonth/:startDay/:startYear/:endMonth/:endDay/:endYear/searchResults', {templateUrl: 'partials/hotel-searchResults.html', controller: 'SearchHotelsController'});  
  $routeProvider.when('/created-packages/:pid/reserve/hotelSearch/:hotelId/:roomType/:rateCode/:chargeRate/hotelBook', {templateUrl: 'partials/hotel-book.html', controller: 'SearchHotelsController'});
  $routeProvider.when('/created-packages/:pid/reserve/hotelSearch/booked', {templateUrl: 'partials/hotel-book-confirm.html', controller: 'SearchHotelsController'});
=======
  $routeProvider.when('/created-packages/pkg-info/reserve', {templateUrl: 'partials/reserve-package.html', controller: 'CreatedPackagesController'});  
>>>>>>> parent of 2bf1df7... new package and reserve package ui
  $routeProvider.otherwise({redirectTo: '/created-packages'});
}]);
//:startMonth/:startDay/:startYear
