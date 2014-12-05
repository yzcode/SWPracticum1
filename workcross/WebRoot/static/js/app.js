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
                templateUrl: settings.webroot+'/static/template/dashboard.html',
                controller: 'dashboard'
            }).
            when('/projects', {
                templateUrl: settings.webroot+'static/template/project.html',
                controller: 'projects'
            }).
            otherwise({
                redirectTo: '/dashboard'
            });
    }]);