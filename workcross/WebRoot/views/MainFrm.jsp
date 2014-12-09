    <%@ page language="java" import="java.util.*,workcross.model.*"  pageEncoding="UTF-8"%>
            <%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
        <!DOCTYPE html>
        <html ng-app="workx">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!--For IE-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>WorkCross</title>
        <link rel="stylesheet" href="/workcross/static/css/bootstrap.min.css">
        <script src="/workcross/static/js/settings.js"></script>

        <script src="/workcross/static/js/jquery-1.11.0.js"></script>
        <!--<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>-->
        <script src="/workcross/static/js/bootstrap.min.js"></script>
        <script src="/workcross/static/js/angular.js"></script>
        <script src="/workcross/static/js/angular-route.js"></script>
        <script src="/workcross/static/js/angular-resource.js"></script>
        <script src="/workcross/static/js/app.js"></script>
        <script src="/workcross/static/js/controllers.js"></script>
        <script src="/workcross/static/js/services.js"></script>
        <script src="/workcross/static/js/sscr.js"></script>

        <link rel="stylesheet/less" href="/workcross/static/css/main.less">
        <script src="/workcross/static/js/less-1.3.1.min.js" type="text/javascript"></script>

        <style>

        #nav-right{
        margin-right: 30px;
        }
        #nav-header{
        margin-left: 30px;
        }
        #main-nav-left{
        width: 220px;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #393939;
        border-color: #393939;
        border-right: 1px;
        overflow: hidden;
        }
        #main-server{
        height: 100%;
        position: relative;
        margin-left: 220px;
        margin-right: 0;
        display: block;
        overflow: hidden;
        }
        #waperall{
        position: absolute;
        top:58px;
        left: 0;
        bottom: 0;
        right: 0;
        }
        #left-panel-nav,#left-panel-teams{
        margin-top: 0px;
        margin-bottom: 0px;
        padding-left: 0px;
        padding-bottom: 0px;
        }
        #mainnav{
        border: hidden;
        background-color:#393939 ;
        }
        #main-server{
        background-color: #F9F9F7;
        }
        .container-fluid{
        height: 58px;
        }
        #nav-icon{
        padding-top: 19px;
        }
        </style>
        </head>
        <body>
        <div class="main-container" >
        <nav class="navbar navbar-inverse navbar-fixed-top mainnav"  role="navigation" id="mainnav" >
        <div class="container-fluid">
        <div class="navbar-header" id="nav-header">
        <a class="navbar-brand" href="#" id="nav-icon"><span class="glyphicon glyphicon-send"></span>&nbsp;&nbsp;WorkX</a>
        </div>
        <div class="collapse navbar-collapse" >
        <!--<form class="navbar-form navbar-left" role="search">-->
        <!--<div class="form-group">-->
        <!--<input type="text" class="form-control" placeholder="Search">-->
        <!--</div>-->
        <!--<button type="submit" class="btn btn-default">Submit</button>-->
        <!--</form>-->
        <ul class="nav navs navbar-nav navbar-right" id="nav-right" ng-controller="userMain">
        <li class="divider-v"></li>
        <li class="dropdown">
        <a  href="javascript:;" class="dropdown-toggle font-set-fm" data-toggle="dropdown">新建<span class="caret"></span></a>
        <ul class="dropdown-menu" role="menu">
        <li><a href="#" class="font-set-fm">新建项目</a></li>
        <li class="divider"></li>
        <li><a href="#" class="font-set-fm">新建团队</a></li>
        </ul>
        </li>
        <li class="divider-v"></li>
        <li><a href="#"><span class="glyphicon glyphicon-bell" style="font-size: 16px"></span> <span class="badge">3</span></a></li>
        <li class="divider-v"></li>
        <li class="dropdown" >
        <a href="javascript:;" class="avatar avatar-30" class="dropdown-toggle" data-toggle="dropdown" style="padding-top: 15px">
        <span class="avatar-face">
        <span class="avatar-text">杨政</span>
        </span>
        <span>{{user.username}} <span class="caret"></span></span>
        </a>
        <ul class="dropdown-menu" role="menu">
        <li><a>{{user.email}}</a></li>
        <li><a>{{user.nickname}}</a></li>
        <li class="divider"></li>
        <li><a href="/workcross/logout">logout</a></li>
        </ul>
        </li>
        <li class="divider-v"></li>
        </ul>
        </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
        </nav>
        <div id="waperall">
        <div class="maindiv">
        <div id="main-nav-left"  ng-controller="left-panel">
        <ul id="left-panel-nav" class="left-panel-ul">
        <li><a class="listitem" ng-class="{'active':curpage == 'dashboard'}" href="#/dashboard"><span class="left-panel-icon glyphicon glyphicon-dashboard"></span>工作台</a></li>
        <li><a class="listitem" ng-class="{'active':curpage == 'calender'}" href="#"><span class="left-panel-icon glyphicon glyphicon-calendar"></span>日历</a></li>
        <li><a class="listitem" ng-class="{'active':curpage == 'discover'}" href="#"><span class="left-panel-icon glyphicon glyphicon-eye-open"></span>发现</a></li>
        <li><a class="listitem" ng-class="{'active':curpage == 'projects'}" href="#/projects"><span class=" left-panel-icon glyphicon glyphicon-hdd"></span>项目</a></li>
        </ul>
        <div class="divider"></div>
        <div>
        <ul id="left-panel-teams" class="left-panel-ul" ng-repeat="team in teams">
        <li style="position: relative;">
        <a href="#/teams/{{team.id}}" class="listitem" ng-click="show_project($event,team.id)">
        <span class="glyphicon glyphicon-th-list left-panel-icon"></span>
        {{team.teamname}}
        <span class="left-panel-icon-sw glyphicon glyphicon-chevron-right" ng-class="{true:'glyphicon-chevron-down',false:'glyphicon-chevron-right'}[team.expand == true]"></span>
        </a>
        <ul class="left-panel-ul left-panel-ul-2" id="team{{team.id}}-project" style="display: none">
        <li ng-repeat="project in team.projects.projects">
        <a href="#/project/{{project.id}}" class="listitem">
        <span class="glyphicon glyphicon-tasks left-panel-icon"></span>
        {{project.name}}
        </a>
        </li>
        </ul>
        </li>
        </ul>
        </div>
        </div>
        <div id="main-server">
        <div ng-view="worksx"></div>
        </div>
        </div>
        </div>
        </div>
        <script></script>
        </body>

        </html>
