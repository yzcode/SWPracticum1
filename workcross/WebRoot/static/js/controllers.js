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

workxControllers.controller('left-panel', ['$scope', '$http','globel_settings','Teams',
    function($scope, $http,globel_settings,Teams) {
        var url = '';
        if (settings.j2ee) url='/workcross/api/teams/';
        else url = '../static/json/testjson/teams.json';
        $http.get(url).success(
            function(data){
                $scope.teams= data;
                var index;
                for(index in $scope.teams){
                    $scope.teams[index].expand=false;
                    var fun = function(Teams) {
                        //console.log(index);
                    }
                    $scope.teams[index].projects=Teams.get({teamId: $scope.teams[index].id},fun );
                }
                $scope.curpage= globel_settings.curpage;;
            }
        )
        $scope.$on('curpage.update',function(event){
            $scope.curpage= globel_settings.curpage;
        })
        $scope.getindex=function(ids){
            for(var i=0;i<this.teams.length;i++){
                if(this.teams[i].id==ids) {
                    return i;
                }
            }
        }
        $scope.show_project = function($event,name){
            var et = $event;
            var tmp  = $('#team'+name+'-project');
            var teams = $('.left-panel-ul-2');
            for(var index = 0 ;index<teams.length;index++){
                var id = this.getindex(name);
                if($(teams[index]).html() == tmp.html()){
                    if(tmp.css("display")=="none") {
                        tmp.parent().css("background-color", "#282823");
                        this.teams[id].expand=true;
                        for(var i=0;i<this.teams.length;i++){
                            if(i == id) continue;
                            else this.teams[i].expand=false;
                        }
                    }
                    else {
                        tmp.parent().css("background-color", "#393939");
                        this.teams[id].expand=false;
                    }
                    tmp.slideToggle();
                    continue;
                }
                $(teams[index]).parent().css("background-color","#393939");
                $(teams[index]).slideUp();
                //$(teams[index]).animate({
                //    height:'hide'
                //});
            }

        }
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

workxControllers.controller('project', ['$scope', 'projectRes','globel_settings','$routeParams',
    function($scope, projectRes,globel_settings,$routeParams) {
        $scope.project = projectRes.get({projectId:$routeParams.projectId},function(){
            globel_settings.chgpage('project');
        })
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
            globel_settings.chgpage('teams');
        });
    }]);