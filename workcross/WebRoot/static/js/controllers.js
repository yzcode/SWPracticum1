'use strict';

var module = angular.module("globel", []);

module.service('globel_settings', ['$rootScope', '$http', function ($rootScope, $http) {
    var service = {
        curpage: 'dashboard',
        chgpage: function (page) {
            service.curpage = page;
            $rootScope.$broadcast('curpage.update');
        }
    };
    $rootScope.updateTask = function (task) {
        var post = {};
        var p_list = ["id", "lastModified", "dateCreated", "projectId", "entryId", "taskName", "completed", "archived", "expireDdate", "description", "pos"];
        for (var i in p_list)
            post[p_list[i]] = task[p_list[i]];
        $http.post("/workcross/api/tasks/" + task.id + "/", post);
    };
    $rootScope.finishtask = function (task) {
        $rootScope.updateTask(task);
    };
    $rootScope.addUserToTask = function (task, user) {
        $.post("/workcross/api/tasks/" + task.id + "/members/", {username: user.username});
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
        $http.get("/workcross/api/feeds/").success(
            function (data) {
                $rootScope.feeds = data.feeds;
                $rootScope.$apply();
            }
        )
        $scope.feed_unread_num = function () {
            var unread = 0;
            for (var i in $scope.feeds)
                unread += ($scope.feeds[i].read == false);
            console.log(unread);
            return unread;
        };
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
                        $scope.js_close();
                    }
                    $scope.js_add_prj = function (add_prj_form, team_id, prjName, desc) {
                        desc = desc || "";
                        $.post('/workcross/api/projects/', {
                            name: prjName,
                            team: team_id,
                            desc: desc
                        });
                        $scope.js_close();
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
                if ($(teams[index]).attr("id") == tmp.attr("id")) {
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

workxControllers.controller('teamctr', ['$scope', 'globel_settings', '$routeParams', 'Teams', '$rootScope', '$route', '$popbox', '$http',
    function ($scope, globel_settings, $routeParams, Teams, $rootScope, $route, $popbox, $http) {
        $scope.team = Teams.get({teamId: $routeParams.teamId}, function (Teams) {
            console.log('loading page teams');
            $http.get('/workcross/api/teams/' + $scope.team.team.id + '/tasks/').success(function (data) {
                $scope.team.tasks = data;
                $scope.taskfilterarg = 'default';
            })
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
        $scope.set_taskfilterarg = function (arg) {
            if ($scope.taskfilterarg != arg) $scope.taskfilterarg = arg;
            else  $scope.taskfilterarg = 'default';
        }
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
        $scope.taskcomplete = function (task) {
            if (settings.debug) console.log(task);
            if (task.completed) task.completed = false;
            else task.completed = true;
            $rootScope.finishtask(task);
        }
        $scope.isCreator = function () {
            var cuser = $scope.team.teamcrate;
            if (cuser == undefined) cuser = 'administrator';
            if (settings.debug) console.log($rootScope.user.username + '  ' + cuser);
            return cuser == $rootScope.user.username;
        }
        $scope.userpopup = function ($event, user) {
            $popbox.popbox({
                target: $event,
                placement: "right",
                templateUrl: "/workcross/static/template/user/userpopup.html",
                controller: ['$scope', 'popbox', '$http', 'pop_data', function ($scope, popbox, $http, pop_data) {
                    $scope.userpop = pop_data.userpop;
                }],
                resolve: {
                    pop_data: function () {
                        return {
                            $scope: $scope,
                            userpop: user
                            //parameters: i,
                            //team: t.current_team
                        }
                    }
                }
            }).open();
        };
        $scope.newuserpopup = function ($event) {
            $popbox.popbox({
                target: $event,
                placement: "right",
                templateUrl: "/workcross/static/template/user/newuserpopup.html",
                controller: ['$scope', 'popbox', '$http', 'pop_data', function ($scope, popbox, $http, pop_data) {
                    $scope.team = pop_data.$scope.team;
                    $scope.js_close = function () {
                        popbox.close();
                    }
                    $scope.js_add = function (e, newuser) {
                        var url = '/workcross/api/teams/' + $scope.team.team.id + '/members/';
                        $.post(url, {
                            username: newuser
                        }, function (data, status) {
                            $scope.team.users.push(data.user);
                            $scope.$apply();
                        })
                        $scope.js_close();
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

workxControllers.controller('project_taskctr', ['$scope', 'projectRes', 'globel_settings', '$routeParams', 'Teams', '$rootScope', '$popbox',
    function ($scope, projectRes, globel_settings, $routeParams, Teams, $rootScope, $popbox) {
        $scope.project = projectRes.get({projectId: $routeParams.projectId}, function () {
            globel_settings.chgpage('project');
            $scope.project_curpage = 'project_task';
            $scope.teaminfo = Teams.get({teamId: $scope.project.project.teamId}, function (Teams) {
            });
            for (var i = 0; i < $scope.project.entries.length; i++) {
                $scope.project.entries[i].newtask = false;
            }
            $scope.newentry = false;
            $scope.newentry_text = "";
        })
        $scope.taskcomplete = function (task) {
            if (settings.debug) console.log(task);
            if (task.completed) task.completed = false;
            else task.completed = true;
            $rootScope.finishtask(task);
        }
        $scope.newtask_setup = function (entry) {
            entry.newtask = true;
        }
        $scope.newtask_cancel = function (entry) {
            entry.newtask = false;
        }
        $scope.newtask_post = function (entry) {
            entry.newtask = false;
            var new_pos = -1;
            for (var i = 0; i < $scope.project.tasks.length; i++) {
                if ($scope.project.tasks[i].entryId == entry.id) {
                    if ($scope.project.tasks[i].pos > new_pos) new_pos = $scope.project.tasks[i].pos;
                }
            }
            if (new_pos == -1) new_pos = 65535;
            $.post("/workcross/api/tasks/",
                {
                    projectId: $scope.project.project.id,
                    entryId: entry.id,
                    name: entry.newtask_text,
                    description: "",
                    pos: new_pos
                },
                function (data, status) {
                    var a = data;
                    $scope.project.tasks.push(a);
                    $scope.$apply();
                });
            console.log(entry.newtask_text);
        }
        $scope.newentry_setup = function () {
            $scope.newentry = true;
        }
        $scope.newentry_cancel = function () {
            $scope.newentry = false;
        }
        $scope.newentry_post = function (arg_text) {
            $scope.newentry = false;
            var new_pos = -1;
            for (var i = 0; i < $scope.project.entries.length; i++) {
                if ($scope.project.entries[i].pos > new_pos) new_pos = $scope.project.entries[i].pos;
            }
            if (new_pos == -1) new_pos = 65535;
            $.post("/workcross/api/entries/",
                {
                    projectId: $scope.project.project.id,
                    name: arg_text,
                    description: "",
                    pos: new_pos
                },
                function (data, status) {
                    var a = data;
                    $scope.project.entries.push(a);
                    $scope.$apply();
                });
            console.log(arg_text);
        }
        $scope.getMember = function (memid) {
            var t_mems = $scope.teaminfo.users;
            for (var i = 0; i < t_mems.length; i++) {
                if (t_mems[i].username == memid) {
                    return t_mems[i];
                }
            }
        }
        $scope.memintask = function (mem, task) {
            if (task == null) return false;
            for (var i = 0; i < task.members.length; i++) {
                if (task.members[i].id == mem.id)return true;
            }
            return false;
        }
        $scope.js_open_task_detail = function ($event, task) {
            if (event.target.tagName == "DIV")
            //$rootScope.slidebox.show_slide = !$rootScope.slidebox.show_slide;
                $rootScope.slidebox.show_task(task);
        }
        $scope.member_drop_options = {
            accept: ".avatar",
            over: function () {
            },
            out: function () {
            },
            hoverClass: "task-state-member-over",
            drop: function (event, n) {
                console.log(n.helper.context.title);
                var task_id = $(event.target).attr("task-id");
                var t_tasks = $scope.project.tasks;
                $scope.$apply(function () {
                    for (var i = 0; i < t_tasks.length; i++) {
                        if (task_id == t_tasks[i].id) {
                            var t_tar = $scope.getMember(n.helper.context.title);
                            console.log(t_tar);
                            if (!$scope.memintask(t_tar, t_tasks[i])) {
                                t_tasks[i].members.push(t_tar);
                                $rootScope.addUserToTask(t_tasks[i], t_tar);
                            }
                        }
                    }
                })
                if (settings.debug) console.log("drop events toggle!");
            }
        }
        $scope.draggable_options = {
            cursor: "move",
            helper: "clone",
            revert: "vaild",
            zIndex: 2e3,
            delay: 300,
            start: function (e, t) {
                t.helper.addClass("member-state-on-drag");
                console.log("drag events toggle!")
            },
            stop: function () {
            },
            drag: function () {
            }
        }
        $scope.userpopup = function ($event, user) {
            $popbox.popbox({
                target: $event,
                placement: "left",
                templateUrl: "/workcross/static/template/user/userpopup.html",
                controller: ['$scope', 'popbox', '$http', 'pop_data', function ($scope, popbox, $http, pop_data) {
                    $scope.userpop = pop_data.userpop;
                }],
                resolve: {
                    pop_data: function () {
                        return {
                            $scope: $scope,
                            userpop: user
                            //parameters: i,
                            //team: t.current_team
                        }
                    }
                }
            }).open();
        };
        $scope.delpopup = function ($event, arg_task, arg_mem) {
            $popbox.popbox({
                target: $event,
                placement: "top",
                templateUrl: "/workcross/static/template/user/deluserpopup.html",
                controller: ['$scope', 'popbox', '$http', 'pop_data', function ($scope, popbox, $http, pop_data) {
                    $scope.task = pop_data.task;
                    $scope.userpop = pop_data.member;
                    $scope.deluser = function (e) {
                        var url = "";
                        $.post(url, {
                            username: $scope.userpop.username
                        }, function (data, status) {
                            popbox.close();
                        })
                    }
                }],
                resolve: {
                    pop_data: function () {
                        return {
                            $scope: $scope,
                            task: arg_task,
                            member: arg_mem
                            //parameters: i,
                            //team: t.current_team
                        }
                    }
                }
            }).open();
        };
    }]);
workxControllers.controller('dashboard-main', ['$scope', 'globel_settings', '$routeParams', 'Teams', '$rootScope', '$route', '$popbox', '$http',
    function ($scope, globel_settings, $routeParams, Teams, $rootScope, $route, $popbox, $http) {
        console.log("in");
        $scope.task = {name: "Task"};
        $scope.$on("slidebox_load_task", function ($event, task, project) {
            $scope.task = task;
            $scope.project = project;
            $scope.task.is_edit = false;
            $scope.task.is_todo_edit = false;
            $scope.task_editing = {name: task.name, description: task.description};
            //functions
            $scope.js_close = function ($event) {
                $rootScope.slidebox.hide_box();
            }
            $scope.js_show_editor = function () {
                $scope.task_editing = {taskName: task.taskName, description: task.description};
                $scope.task.is_edit = true;
            }
            $scope.js_update_task = function () {
                $scope.task.taskName = $scope.task_editing.taskName;
                $scope.task.description = $scope.task_editing.description;
                $scope.task.is_edit = false;
                $rootScope.updateTask($scope.task);
            }
            $scope.js_cancel_editor = function () {
                $scope.task.is_edit = false;
            }
            $scope.taskcomplete = function (task) {
                task.completed = !task.completed;
                $rootScope.updateTask(task);
            }

            if (!$scope.project)
                $http.get("/workcross/api/projects/" + task.projectId + "/").success(function (data) {
                    $scope.project = data;

                });
            $scope.comments = [];
            $http.get("/workcross/api/tasks/" + task.id + "/comments/").success(function (data) {
                    $scope.comments = data;
                }
            )
        });
    }]);
workxControllers.controller('dashboard-main', ['$scope', 'globel_settings', '$routeParams', 'Teams', '$rootScope', '$route', '$popbox', '$http',
    function ($scope, globel_settings, $routeParams, Teams, $rootScope, $route, $popbox, $http) {
        $scope.js_set_feede_read = function ($event, feed) {
            $.post("/workcross/api/feeds/" + feed.id + "/", {read: feed.read}, function (data, state) {
                feed.read = data.read;
                $scope.$apply();
            });
        }
    }]);
