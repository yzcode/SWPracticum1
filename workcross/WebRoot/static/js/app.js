/**
 * Created by yangz on 2014/12/5.
 */
'use strict';
var workx = angular.module('workx', [
    'ngRoute',
    'workxControllers',
    'globel',
    'serverRes'
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
            when('/teams/:teamId', {
                templateUrl: settings.webroot+'static/template/teams.html',
                controller: 'teamctr'
            }).
            otherwise({
                redirectTo: '/dashboard'
            });
    }]);