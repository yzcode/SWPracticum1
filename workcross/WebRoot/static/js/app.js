/**
 * Created by yangz on 2014/12/5.
 */
'use strict';
var workx = angular.module('workx', [
    'ngRoute',
    'workxControllers',
    'globel',
    'serverRes',
    'workxfilter'
]);

workx.config(['$routeProvider','$locationProvider',
    function($routeProvider,$locationProvider) {
        $routeProvider.
            when('/dashboard', {
                templateUrl: settings.webroot+'static/template/dashboard.html',
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
            //when('/teams/:teamId/team_pro', {
            //    action:"team.team_pro"
            //}).
            otherwise({
                redirectTo: '/dashboard'
            });
    }]);

var workxfilter = angular.module('workxfilter', []);

workxfilter.filter('longname', function() {
    return function(input) {
        var overlong = 10;
        var strReg=/[^\x00-\xff]/g;
        var _str = input.replace(strReg,'**');
        if(_str.length>overlong+1){
            var res=input.substr(0,overlong/2);
            var i = overlong/2;
            while(res.replace(strReg,'**').length<overlong){
                res = res + input[i];
                i++;
            }
            return res+'...';
        }
        else return input;
    };
});

workxfilter.filter('timeformat',function(){
    return function(timestamp){
        var nowt = new Date();
        nowt.setTime(timestamp);
        return nowt.getFullYear()+'年'+nowt.getMonth()+'月'+nowt.getDay()+'日' ;
    };
})