/**
 * 作者：yeshengqiang
 * 时间：2018-05-14
 * 描述：geoConv.js
 */

function ajax (opt) {
    return new Promise((resolve, reject) => {
        opt = opt || {};
        opt.method = opt.method.toUpperCase() || 'POST';
        opt.url = opt.url || '';
        opt.async = opt.async || true;
        opt.data = opt.data || null;
        opt.success = opt.success || function () {};
        var xmlHttp = null;
        if (XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
        } else {
            xmlHttp = new window.ActiveXObject('Microsoft.XMLHTTP');
        }
        let params = [];
        for (let key in opt.data) {
            params.push(key + '=' + opt.data[key]);
        }
        var postData = params.join('&');
        if (opt.method.toUpperCase() === 'POST') {
            xmlHttp.open(opt.method, opt.url, opt.async);
            xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            xmlHttp.send(postData);
        } else if (opt.method.toUpperCase() === 'GET') {
            xmlHttp.open(opt.method, opt.url + '?' + encodeURI(postData), opt.async);
            xmlHttp.send(null);
        }
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                resolve(JSON.parse(xmlHttp.responseText));
            }
        };
    });
}

export const geoConv = (opt) => ajax({
                                    method: 'get',
                                    url: 'http://restapi.amap.com/v3/assistant/coordinate/convert',
                                    data: opt});
