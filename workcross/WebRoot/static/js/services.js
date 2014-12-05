/**
 * Created by yangz on 2014/12/6.
 */

var serverRes = angular.module('serverRes', ['ngResource']);

serverRes.factory('Teams', ['$resource',
    function($resource){
        var url="";
        if(settings.j2ee) url = "/workcross/api/teams/:teamId/";
        else url = '../static/json/testjson/team1.json';
        return $resource(url, {}, {
            query: {method:'GET', params:{teamId:'-1'}, isArray:true}
        });
    }]);