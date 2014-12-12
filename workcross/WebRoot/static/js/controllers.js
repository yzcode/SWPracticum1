'use strict';

var module = angular.module("globel", []);

module.service('globel_settings', ['$rootScope', function ($rootScope) {
    var service = {
        curpage: 'dashboard',
        chgpage: function (page) {
            service.curpage = page;
            $rootScope.$broadcast('curpage.update');
        }
    };
    return service;
}]);
/* Controllers */

var workxControllers = angular.module('workxControllers', ['ui.bootstrap.popbox']);

workxControllers.controller('userMain', ['$scope', '$http', 'globel_settings', '$rootScope', '$popbox',
    function ($scope, $http, globel_settings, $rootScope, $popbox) {
        var url = '';
        if (settings.j2ee) url = '/workcross/api/user/currentuser';
        else url = '/workcross/static/json/testjson/user.json';
        $http.get(url).success(
            function (data) {
                $scope.user = data;
                $rootScope.user = data;
            }
        )
        $scope.master_new_menu = function ($event) {
            $popbox.popbox({
                target: $event,
                templateUrl: "/workcross/static/template/master_new.html",
                controller: ['$scope', 'popbox', '$http', function ($scope, popbox, $http) {
                    $scope.popbox = popbox;
                    $scope.currentStep = 'master_new';
                    $scope.data = {};
                    $scope.data.stepHistory = [];
                    $scope.data.current_team = {teamname: "新建团队"};
                    if ($scope.user.managed_teams.length > 0)
                        $scope.data.current_team = $scope.user.managed_teams[0];
                    $scope.show_new_project_dialog = function ($event) {
                        $scope.data.stepHistory.push($scope.currentStep);
                        $scope.currentStep = 'new_project';
                    }
                    $scope.show_new_team_dialog = function ($event) {
                        $scope.data.stepHistory.push($scope.currentStep);
                        $scope.currentStep = 'new_team';
                    }
                    $scope.show_select_team_dialog = function ($event) {
                        $scope.data.stepHistory.push($scope.currentStep);
                        $scope.currentStep = 'select_team';
                    }
                    $scope.select_team = function ($event, team) {
                        $scope.data.current_team = team;
                        $scope.back($event);
                    }
                    $scope.back = function ($event) {
                        $scope.currentStep = $scope.data.stepHistory.pop();
                    }
                    $scope.js_close = function () {
                        popbox.close();
                    }
                    $scope.js_add_team = function (add_team_form, name, desc) {
                        $.post('/workcross/api/teams/', {
                            name: name,
                            desc: desc
                        });
                        js_close();
                    }
                    $scope.js_add_prj = function (add_prj_form, team_id, prjName, desc) {
                        $.post('/workcross/api/projects/', {
                            name: prjName,
                            team: team_id
                        });
                        js_close();
                    }
                }],
                resolve: {
                    pop_data: function () {
                        return {
                            $scope: $scope
                            //parameters: i,
                            //team: t.current_team
                        }
                    }
                }
            }).open();
        };
    }]);

workxControllers.controller('left-panel', ['$scope', '$http', 'globel_settings', 'Teams',
    function ($scope, $http, globel_settings, Teams) {
        var url = '';
        if (settings.j2ee) url = '/workcross/api/teams/';
        else url = '/workcross/static/json/testjson/teams.json';
        $http.get(url).success(
            function (data) {
                $scope.teams = data;
                var index;
                for (index in $scope.teams) {
                    $scope.teams[index].expand = false;
                    var fun = function (Teams) {
                        //console.log(index);
                    }
                    $scope.teams[index].projects = Teams.get({teamId: $scope.teams[index].id}, fun);
                }
                $scope.curpage = globel_settings.curpage;
                ;
            }
        )
        $scope.$on('curpage.update', function (event) {
            $scope.curpage = globel_settings.curpage;
        })
        $scope.getindex = function (ids) {
            for (var i = 0; i < this.teams.length; i++) {
                if (this.teams[i].id == ids) {
                    return i;
                }
            }
        }
        $scope.show_project = function ($event, name) {
            var et = $event;
            var tmp = $('#team' + name + '-project');
            var teams = $('.left-panel-ul-2');
            for (var index = 0; index < teams.length; index++) {
                var id = this.getindex(name);
                if ($(teams[index]).html() == tmp.html()) {
                    if (tmp.css("display") == "none") {
                        tmp.parent().css("background-color", "#282823");
                        this.teams[id].expand = true;
                        for (var i = 0; i < this.teams.length; i++) {
                            if (i == id) continue;
                            else this.teams[i].expand = false;
                        }
                    }
                    else {
                        tmp.parent().css("background-color", "#393939");
                        this.teams[id].expand = false;
                    }
                    tmp.slideToggle();
                    continue;
                }
                $(teams[index]).parent().css("background-color", "#393939");
                $(teams[index]).slideUp();
                //$(teams[index]).animate({
                //    height:'hide'
                //});
            }
        }
    }]);


workxControllers.controller('dashboard', ['$scope', '$http', 'globel_settings', '$rootScope',
    function ($scope, $http, globel_settings, $rootScope) {
        $scope.user = $rootScope.user;
        var url = '';
        if (settings.j2ee) url = '/workcross/api/user/currentuser';
        else url = '/workcross/static/json/testjson/user.json';
        $http.get(url).success(
            function (data) {
                globel_settings.chgpage('dashboard');

                $scope.dashboard_curpage = 'dashboard_new'
            }
        )
        $scope.setcurpage = function (linkto) {
            if (linkto == 'dashboard_task') {
                $scope.dashboard_curpage = 'dashboard_task';
            }
            else $scope.dashboard_curpage = 'dashboard_new';
            //var stateObject = {};
            //var title = 'workx team '+$scope.team_curpage;
            //var newUrl = "/teams/"+$routeParams.teamId+"?path="+$scope.team_curpage;
            //if(settings.debug) console.log(newUrl);
            //$location.url(newUrl);
        };
    }]);

workxControllers.controller('calenderctr', ['$scope', '$http', 'globel_settings',
    function ($scope, $http, globel_settings) {
        var url = '';
        if (settings.j2ee) url = '/workcross/api/user/currentuser';
        else url = '/workcross/static/json/testjson/user.json';
        globel_settings.chgpage('calender');
    }]);

workxControllers.controller('discoveryctr', ['$scope', '$http', 'globel_settings',
    function ($scope, $http, globel_settings) {
        var url = '';
        if (settings.j2ee) url = '/workcross/api/user/currentuser';
        else url = '/workcross/static/json/testjson/user.json';
        globel_settings.chgpage('discovery');
    }]);

workxControllers.controller('projects', ['$scope', '$http', 'globel_settings', 'Teams',
    function ($scope, $http, globel_settings, Teams) {
        var url = '';
        if (settings.j2ee) url = '/workcross/api/teams/';
        else url = '/workcross/static/json/testjson/teams.json';
        $http.get(url).success(
            function (data) {
                $scope.projects_curpage = 'projects_partin';
                globel_settings.chgpage('projects');
                $scope.teams = data;
                $scope.teams[$scope.teams.length - 1].isLast = true;
                var index;
                for (index in $scope.teams) {
                    $scope.teams[index].projects = Teams.get({teamId: $scope.teams[index].id});
                }
            }
        )
    }]);

workxControllers.controller('teamctr', ['$scope', 'globel_settings', '$routeParams', 'Teams', '$rootScope', '$route',
    function ($scope, globel_settings, $routeParams, Teams, $rootScope, $route) {
        $scope.team = Teams.get({teamId: $routeParams.teamId}, function (Teams) {
            console.log('loading page teams');
            globel_settings.chgpage('teams');
            var linkto = $routeParams.path;
            if (linkto == 'team_pro') {
                $scope.team_curpage = 'team_pro';
            } else if (linkto == 'team_tas') {
                $scope.team_curpage = 'team_tas';
            } else if (linkto == 'team_set') {
                $scope.team_curpage = 'team_set';
            }
            else $scope.team_curpage = 'team_mem';
        });
        $scope.setcurpage = function (linkto) {
            if (linkto == 'team_pro') {
                $scope.team_curpage = 'team_pro';
            } else if (linkto == 'team_tas') {
                $scope.team_curpage = 'team_tas';
            } else if (linkto == 'team_set') {
                $scope.team_curpage = 'team_set';
            }
            else $scope.team_curpage = 'team_mem';
            var stateObject = {};
            var title = 'workx team ' + $scope.team_curpage;
            var newUrl = "/teams/" + $routeParams.teamId + "?path=" + $scope.team_curpage;
            if (settings.debug) console.log(newUrl);
            //$location.url(newUrl);
        };

        $scope.isCreator = function () {
            var cuser = $scope.team.teamcrate;
            if (cuser == undefined) cuser = 'administrator';
            if (settings.debug) console.log($rootScope.user.username + '  ' + cuser);
            return cuser == $rootScope.user.username;
        }

    }]);


workxControllers.controller('project_taskctr', ['$scope', 'projectRes', 'globel_settings', '$routeParams', 'Teams',
    function ($scope, projectRes, globel_settings, $routeParams, Teams) {
        $scope.project = projectRes.get({projectId: $routeParams.projectId}, function () {
            globel_settings.chgpage('project');
            $scope.project_curpage = 'project_task';
            $scope.teaminfo = Teams.get({teamId: $scope.project.project.teamId}, function (Teams) {
            });
            for (var i = 0; i < $scope.project.entries.length; i++) {
                $scope.project.entries[i].newtask = false;
            }
            $scope.newentry = false;
        })
        $scope.taskcomplete = function (task) {
            if (settings.debug) console.log(task);
            if (task.completed) task.completed = false;
            else task.completed = true;
        }
        $scope.newtask_setup = function (entry) {
            entry.newtask = true;
        }
        $scope.newtask_cancel = function (entry) {
            entry.newtask = false;
        }
        $scope.newtask_post = function (entry) {
            entry.newtask = false;
            console.log(entry.newtask_text);
        }
        $scope.newentry_setup = function () {
            $scope.newentry = true;
        }
        $scope.newentry_cancel = function () {
            $scope.newentry = false;
        }
        $scope.newentry_post = function () {
            $scope.newentry = false;
            console.log($scope.newentry_text);
        }
    }]);