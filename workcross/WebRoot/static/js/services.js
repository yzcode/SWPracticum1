/**
 * Created by yangz on 2014/12/6.
 */

var serverRes = angular.module('serverRes', ['ngResource']);

serverRes.factory('Teams', ['$resource',
    function($resource){
        var url="";
        if(settings.j2ee) url = "/workcross/api/teams/:teamId/";
        else url = '/workcross/static/json/testjson/team:teamId.json';
        return $resource(url, {}, {
            query: {method:'GET', params:{teamId:'-1'}, isArray:true}
        });
    }]);

serverRes.factory('projectRes', ['$resource',
    function($resource){
        var url="";
        if(settings.j2ee) url = "/workcross/api/project/:projectId/";
        else url = '/workcross/static/json/testjson/project1.json';
        return $resource(url, {}, {
            query: {method:'GET', params:{projectId:'-1'}, isArray:true}
        });
    }]);