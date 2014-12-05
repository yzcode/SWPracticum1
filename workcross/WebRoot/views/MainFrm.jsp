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
    <link rel="stylesheet" href="../static/css/bootstrap.min.css">
    <link rel="stylesheet/less" href="../static/css/main.less">
    <script src="../static/js/settings.js"></script>
    <script src="../static/js/less-1.3.1.min.js" type="text/javascript"></script>

    <script src="../static/js/jquery-1.11.0.js"></script>
    <!--<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>-->
    <script src="../static/js/bootstrap.min.js"></script>
    <script src="../static/js/angular.js"></script>
    <script src="../static/js/angular-route.js"></script>
    <script src="../static/js/angular-resource.js"></script>
    <script src="../static/js/app.js"></script>
    <script src="../static/js/controllers.js"></script>
    <script src="../static/js/sscr.js"></script>

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
            border: 1px solid transparent;
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
        #left-panel-nav{
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
<div class="main-container">
    <nav class="navbar navbar-inverse navbar-fixed-top mainnav"  role="navigation" id="mainnav">
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
                <ul class="nav navs navbar-nav navbar-right" id="nav-right">
                    <li class="dropdown">
                        <a  class="dropdown-toggle font-set-fm" data-toggle="dropdown">新建<span class="caret"></span></a>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="#" class="font-set-fm">新建项目</a></li>
                            <li class="divider"></li>
                            <li><a href="#" class="font-set-fm">新建团队</a></li>
                        </ul>
                    </li>
                    <li><a href="#"><span class="glyphicon glyphicon-bell" style="font-size: 16px"></span> <span class="badge">3</span></a></li>
                    <li class="dropdown" ng-controller="userMain">
                        <a  class="dropdown-toggle" data-toggle="dropdown">{{user.username}} <span class="caret"></span></a>
                        <ul class="dropdown-menu" role="menu">
                            <li>{{user.email}}</li>
                            <li>{{user.nickname}}</li>
                            <li><a href="#">{{nowpage}}</a></li>
                            <li class="divider"></li>
                            <li><a href="#">Separated link</a></li>
                        </ul>
                    </li>
                </ul>
            </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
    </nav>
    <div id="waperall">
        <div class="maindiv">
            <div id="main-nav-left" >
                <ul id="left-panel-nav" class="left-panel-ul">
                    <li><a class="listitem" ng-class="" href="#"><span class="left-panel-icon glyphicon glyphicon-dashboard"></span>工作台</a></li>
                    <li><a class="listitem" href="#"><span class="left-panel-icon glyphicon glyphicon-calendar"></span>日历</a></li>
                    <li><a class="listitem" href="#"><span class="left-panel-icon glyphicon glyphicon-eye-open"></span>发现</a></li>
                    <li><a class="listitem" href="#/projects"><span class=" left-panel-icon glyphicon glyphicon-hdd"></span>项目</a></li>
                </ul>
                <div class="divider"></div>
            </div>
            <div id="main-server">
                <div ng-view></div>
            </div>
        </div>
    </div>
</div>
<script></script>
</body>

</html>