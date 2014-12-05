'use strict';

/* Controllers */

var workxControllers = angular.module('workxControllers', []);

workxControllers.controller('userMain', ['$scope', '$http',
    function($scope, $http) {
        $http.get('../static/json/testjson/user.json').success(
            function(data){
                $scope.user= data;
                $scope.nowpage = 'dashboard';
            }
        )
    }]);

workxControllers.controller('projects', ['$scope', '$http','userMain',
    function($scope, $http,userMain) {
        $http.get(settings.webroot+'static/json/testjson/project.json').success(
            function(data){
                userMain.nowpage = 'projects';
                $scope.projects= data;
            }
        )
    }]);