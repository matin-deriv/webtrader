define(["module"],function(e){"use strict";var c,o,a,s,u,t=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],r=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,i=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,l="undefined"!=typeof location&&location.href,f=l&&location.protocol&&location.protocol.replace(/\:/,""),p=l&&location.hostname,d=l&&(location.port||void 0),m={},v=e.config&&e.config()||{};function g(e,n){return void 0===e||""===e?n:e}return c={version:"2.0.16",strip:function(e){if(e){var n=(e=e.replace(r,"")).match(i);n&&(e=n[1])}else e="";return e},jsEscape:function(e){return e.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:v.createXhr||function(){var e,n,r;if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;if("undefined"!=typeof ActiveXObject)for(n=0;n<3;n+=1){r=t[n];try{e=new ActiveXObject(r)}catch(e){}if(e){t=[r];break}}return e},parseName:function(e){var n,r,t,o=!1,i=e.lastIndexOf("."),a=0===e.indexOf("./")||0===e.indexOf("../");return-1!==i&&(!a||1<i)?(n=e.substring(0,i),r=e.substring(i+1)):n=e,-1!==(i=(t=r||n).indexOf("!"))&&(o="strip"===t.substring(i+1),t=t.substring(0,i),r?r=t:n=t),{moduleName:n,ext:r,strip:o}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(e,n,r,t){var o,i,a,s=c.xdRegExp.exec(e);return!s||(o=s[2],a=(i=(i=s[3]).split(":"))[1],i=i[0],(!o||o===n)&&(!i||i.toLowerCase()===r.toLowerCase())&&(!a&&!i||function(e,n,r,t){if(n===t)return!0;if(e===r){if("http"===e)return g(n,"80")===g(t,"80");if("https"===e)return g(n,"443")===g(t,"443")}return!1}(o,a,n,t)))},finishLoad:function(e,n,r,t){r=n?c.strip(r):r,v.isBuild&&(m[e]=r),t(r)},load:function(n,e,r,t){if(t&&t.isBuild&&!t.inlineText)r();else{v.isBuild=t&&t.isBuild;var o=c.parseName(n),i=o.moduleName+(o.ext?"."+o.ext:""),a=e.toUrl(i),s=v.useXhr||c.useXhr;0!==a.indexOf("empty:")?!l||s(a,f,p,d)?c.get(a,function(e){c.finishLoad(n,o.strip,e,r)},function(e){r.error&&r.error(e)}):e([i],function(e){c.finishLoad(o.moduleName+"."+o.ext,o.strip,e,r)},function(e){r.error&&r.error(e)}):r()}},write:function(e,n,r,t){if(m.hasOwnProperty(n)){var o=c.jsEscape(m[n]);r.asModule(e+"!"+n,"define(function () { return '"+o+"';});\n")}},writeFile:function(r,e,n,t,o){var i=c.parseName(e),a=i.ext?"."+i.ext:"",s=i.moduleName+a,u=n.toUrl(i.moduleName+a)+".js";c.load(s,n,function(e){function n(e){return t(u,e)}n.asModule=function(e,n){return t.asModule(e,u,n)},c.write(r,s,n,o)},o)}},"node"===v.env||!v.env&&"undefined"!=typeof process&&process.versions&&process.versions.node&&!process.versions["node-webkit"]&&!process.versions["atom-shell"]?(o=require.nodeRequire("fs"),c.get=function(e,n,r){try{var t=o.readFileSync(e,"utf8");"\ufeff"===t[0]&&(t=t.substring(1)),n(t)}catch(e){r&&r(e)}}):"xhr"===v.env||!v.env&&c.createXhr()?c.get=function(t,o,i,e){var n,a=c.createXhr();if(a.open("GET",t,!0),e)for(n in e)e.hasOwnProperty(n)&&a.setRequestHeader(n.toLowerCase(),e[n]);v.onXhr&&v.onXhr(a,t),a.onreadystatechange=function(e){var n,r;4===a.readyState&&(399<(n=a.status||0)&&n<600?((r=new Error(t+" HTTP status: "+n)).xhr=a,i&&i(r)):o(a.responseText),v.onXhrComplete&&v.onXhrComplete(a,t))},a.send(null)}:"rhino"===v.env||!v.env&&"undefined"!=typeof Packages&&"undefined"!=typeof java?c.get=function(e,n){var r,t,o=new java.io.File(e),i=java.lang.System.getProperty("line.separator"),a=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(o),"utf-8")),s="";try{for(r=new java.lang.StringBuffer,(t=a.readLine())&&t.length()&&65279===t.charAt(0)&&(t=t.substring(1)),null!==t&&r.append(t);null!==(t=a.readLine());)r.append(i),r.append(t);s=String(r.toString())}finally{a.close()}n(s)}:("xpconnect"===v.env||!v.env&&"undefined"!=typeof Components&&Components.classes&&Components.interfaces)&&(a=Components.classes,s=Components.interfaces,Components.utils.import("resource://gre/modules/FileUtils.jsm"),u="@mozilla.org/windows-registry-key;1"in a,c.get=function(e,n){var r,t,o,i={};u&&(e=e.replace(/\//g,"\\")),o=new FileUtils.File(e);try{(r=a["@mozilla.org/network/file-input-stream;1"].createInstance(s.nsIFileInputStream)).init(o,1,0,!1),(t=a["@mozilla.org/intl/converter-input-stream;1"].createInstance(s.nsIConverterInputStream)).init(r,"utf-8",r.available(),s.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),t.readString(r.available(),i),t.close(),r.close(),n(i.value)}catch(e){throw new Error((o&&o.path||"")+": "+e)}}),c});