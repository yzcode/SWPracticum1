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

workx.config(['$routeProvider','$locationProvider',
    function($routeProvider,$locationProvider) {
        $routeProvider.
            when('/dashboard', {
                templateUrl: settings.webroot+'/static/template/dashboard.html',
                controller: 'dashboard'
            }).
            when('/projects', {
                templateUrl: settings.webroot+'static/template/projects.html',
                controller: 'projects'
            }).
            when('/project/:projectId', {
                templateUrl: settings.webroot+'static/template/project.html',
                controller: 'project'
            }).
            when('/teams/:teamId', {
                templateUrl: settings.webroot+'static/template/team.html',
                controller: 'teamctr'
            }).
            otherwise({
                redirectTo: '/dashboard'
            });
    }]);
