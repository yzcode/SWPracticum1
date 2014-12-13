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
workx.config(['$resourceProvider', function ($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);
workx.run(["$rootScope", '$http', function ($rootScope, $http) {
    //slidebox
    var slidebox = $rootScope.slidebox = {
        show_slide: false,
        show_box: function () {
            this.show_slide = true;
        },
        hide_box: function () {
            this.show_slide = false;
        },
        task: {},
        show_task: function (task, project) {
            if (!(task instanceof Object))
                $http.get("/workcross/api/tasks/" + task + "/").success(function (data) {
                    $rootScope.$broadcast("slidebox_load_task", data, project);
                })
            else
                $rootScope.$broadcast("slidebox_load_task", task, project);
            this.show_box();
        }
    };

}]);
workx.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider.
            when('/dashboard/', {
                templateUrl: settings.webroot + 'static/template/dashboard.html',
                controller: 'dashboard'
            }).
            when('/projects/', {
                templateUrl: settings.webroot + 'static/template/projects.html',
                controller: 'projects'
            }).
            when('/project/:projectId/task', {
                templateUrl: settings.webroot + 'static/template/project/project_task.html',
                controller: 'project_taskctr'
            }).
            when('/project/:projectId/', {
                redirectTo: '/project/:projectId/task'
            }).
            when('/teams/:teamId', {
                templateUrl: settings.webroot + 'static/template/team.html',
                controller: 'teamctr'
            }).
            when('/calender/', {
                templateUrl: settings.webroot + 'static/template/calender.html',
                controller: 'calenderctr'
            }).
            when('/discovery/', {
                templateUrl: settings.webroot + 'static/template/discovery.html',
                controller: 'discoveryctr'
            }).
            //when('/teams/:teamId/team_pro', {
            //    action:"team.team_pro"
            //}).
            otherwise({
                redirectTo: '/dashboard'
            });
    }]);

workx.directive("droppable", [function () {
    return {
        restrict: "A",
        link: function (e, t, i) {
            e.$watch(i.droppable, function (e) {
                e == null || t.droppable(e)
            })
        }
    }
}]).directive("draggable", [function () {
    return {
        restrict: "A",
        link: function (e, t, i) {
            e.$watch(i.draggable, function (e) {
                e == null || t.draggable(e)
            })
        }
    }
}]);

var workxfilter = angular.module('workxfilter', []);

workxfilter.filter('longname', function () {
    return function (input) {
        var overlong = 10;
        var strReg = /[^\x00-\xff]/g;
        var _str = input.replace(strReg, '**');
        if (_str.length > overlong + 1) {
            var res = input.substr(0, overlong / 2);
            var i = overlong / 2;
            while (res.replace(strReg, '**').length < overlong) {
                res = res + input[i];
                i++;
            }
            return res + '...';
        }
        else return input;
    };
});

workxfilter.filter('timeformat', function () {
    return function (timestamp) {
        if (timestamp == null) return "";
        var nowt = new Date();
        nowt.setTime(timestamp);
        var day = nowt.getDay() < 10 ? ('0' + nowt.getDay().toString()) : (nowt.getDay().toString());
        var mon = nowt.getMonth() < 10 ? ('0' + nowt.getMonth().toString()) : (nowt.getMonth().toString());
        return nowt.getFullYear() + '年' + mon + '月' + day + '日';
    };
})

workxfilter.filter('timeformatYM', function () {
    return function (timestamp) {
        if (timestamp == null) return "";
        var nowt = new Date();
        nowt.setTime(timestamp);
        var day = nowt.getDay() < 10 ? ('0' + nowt.getDay().toString()) : (nowt.getDay().toString());
        var mon = nowt.getMonth() < 10 ? ('0' + nowt.getMonth().toString()) : (nowt.getMonth().toString());
        return mon + '月' + day + '日';
    };
})
workxfilter.filter('timeformatCOM', function () {
    return function (timestamp) {
        if (timestamp == null) return "";
        var nowt = new Date();
        nowt.setTime(timestamp);
        var day = nowt.getDay()<10?('0'+nowt.getDay().toString()):(nowt.getDay().toString());
        var mon = nowt.getMonth()<10?('0'+nowt.getMonth().toString()):(nowt.getMonth().toString());
        return mon+'-'+day+'  '+ nowt.getHours()+':'+nowt.getMinutes();
    };
})
workxfilter.filter('taskInEntry', function () {
    return function (task, id) {
        var res = [];
        for (var i in task) {
            if (task[i].entryId == id) res.push(task[i]);
        }
        return res;
    };
})

workxfilter.filter('usersign', function () {
    return function (sign) {
        if (sign != null && sign != "") return sign
        return "他很懒 什么也没有留下";
    };
}).filter('taskfiltername', function () {
    return function (name) {
        if (name == 'default') return "团队";
        else return name + '的';
    }
}).filter('taskfilter', function () {
    return function (tasks, arg) {
        if (arg == 'default') return tasks;
        else {
            var res_task = [];
            for (var i = 0; i < tasks.length; i++) {
                var tmp = false;
                for (var j = 0; j < tasks[i].members.length; j++) {
                    if (tasks[i].members[j].username == arg) tmp = true;
                }
                if (tmp) res_task.push(tasks[i]);
            }
            return res_task;
        }
    }
}).filter('taskfilterbyCOM',function(){
    return function(tasks,arg){
        var res_tasks = [];
        var nowdate = new Date();
        for(var i = 0;i<tasks.length;i++){
            if(arg=='completed' && tasks[i].completed) res_tasks.push(tasks[i]);
            else if(arg=='uncompleted'&& tasks[i].completed==false) res_tasks.push(tasks[i]);
            else if(tasks[i].expireDdate!=null && tasks[i].expireDdate < nowdate.valueOf() ) res_tasks.push(tasks[i]);
        }
        return res_tasks;
    }
})