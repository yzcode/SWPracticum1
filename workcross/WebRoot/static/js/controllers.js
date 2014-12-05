'use strict';

var module = angular.module( "globel", [] );

module.service( 'globel_settings', [ '$rootScope',function( $rootScope ) {
    var service = {
        curpage: 'dashboard',
        chgpage: function ( page ) {
            service.curpage=page;
            $rootScope.$broadcast( 'curpage.update' );
        }
    }
    return service;
}]);
/* Controllers */

var workxControllers = angular.module('workxControllers', []);

workxControllers.controller('userMain', ['$scope', '$http','globel_settings',
    function($scope, $http,globel_settings) {
        var url = '';
        if (settings.j2ee) url='/workcross/api/user/currentuser';
        else url = '../static/json/testjson/user.json';
        $http.get(url).success(
            function(data){
                $scope.user= data;
            }
        )
    }]);

workxControllers.controller('left-panel', ['$scope', '$http','globel_settings',
    function($scope, $http,globel_settings) {
        var url = '';
        if (settings.j2ee) url='/workcross/api/teams/';
        else url = '../static/json/testjson/teams.json';
        $http.get(url).success(
            function(data){
                $scope.teams= data;
                $scope.curpage= globel_settings.curpage;;
            }
        )
        $scope.$on('curpage.update',function(event){
            $scope.curpage= globel_settings.curpage;
        })
    }]);

workxControllers.controller('projects', ['$scope', '$http','globel_settings',
    function($scope, $http,globel_settings) {
        $http.get(settings.webroot+'static/json/testjson/project.json').success(
            function(data){
               globel_settings.chgpage('projects');
                $scope.projects= data;
            }
        )
    }]);

workxControllers.controller('dashboard', ['$scope', '$http','globel_settings',
    function($scope, $http,globel_settings) {
        var url = '';
        if (settings.j2ee) url='/workcross/api/user/currentuser';
        else url = '../static/json/testjson/user.json';
        $http.get(url).success(
            function(data){
                globel_settings.chgpage('dashboard');
                $scope.projects= data;
            }
        )
    }]);


workxControllers.controller('teamctr', ['$scope','globel_settings','$routeParams','Teams',
    function($scope,globel_settings,$routeParams,Teams) {
        $scope.teams=Teams.get({teamId: $routeParams.teamId}, function(Teams) {
            globel_settings.chgpage('projects');
        });
    }]);