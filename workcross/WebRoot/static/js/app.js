/**
 * Created by yangz on 2014/12/5.
 */
'use strict';
var workx = angular.module('workx', [
    'ngRoute',
    'workxControllers'
]);

workx.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/dashboard', {
                templateUrl: 'partials/dashboard.html',
                controller: 'dashboard'
            }).
            otherwise({
                redirectTo: '/dashboard'
            });
    }]);