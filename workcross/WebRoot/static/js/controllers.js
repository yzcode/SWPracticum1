'use strict';

/* Controllers */

var workxControllers = angular.module('workxControllers', []);

workxControllers.controller('userMain', ['$scope', '$http',
    function($scope, $http) {
        $http.get('../static/json/testjson/user.json').success(
            function(data){
                $scope.user= data;
            }
        )
    }]);
