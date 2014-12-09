/**
 * Created by yangz on 2014/12/5.
 */

var settings = new Object();

settings.j2ee = true;
if (window.location.href.indexOf(".html")!=-1)
	settings.j2ee = false;
if(!settings.j2ee) settings.webroot = '/workcross/WebRoot/';
else settings.webroot = '/workcross/';