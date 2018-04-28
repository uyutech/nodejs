/**
 * Created by army on 2017/6/2.
 */

import $ from 'anima-yocto-ajax';

window.ROOT_DOMAIN = 'https://circling.cc';

// 开发环境在线浏览的时候，因不存在preRender的过程，所以将preExist替换为render，此时就降级为没有预渲染直接即时渲染
if(location.hostname === 'army8735.circling.cc') {
  window.ROOT_DOMAIN = 'http://dev.circling.cc2';
}
else if(location.hostname === 'm.dev.circling.cc2') {
  window.ROOT_DOMAIN = 'http://dev.circling.cc2';
}

export default {
  ajax: function(url, data, success, error, type, timeout) {
    // 兼容无host
    if (!/^http(s)?:\/\//.test(url)) {
      url = window.ROOT_DOMAIN + '/' + url.replace(/^\//, '');
    }
    data && Object.keys(data).forEach(function(k) {
      if(data[k] === undefined || data[k] === null) {
        delete data[k];
      }
    });
    if(url.indexOf('?') === -1) {
      url += '?_=' + Date.now();
    }
    else {
      url += '&_=' + Date.now();
    }
    function load() {
      return $.ajax({
        url: url,
        data: data,
        dataType: 'json',
        crossDomain: true,
        timeout: timeout || 30000,
        type: type || 'get',
        // ajax 跨域设置必须加上
        beforeSend: function (xhr) {
          xhr.withCredentials = true;
        },
        success: function (data, state, xhr) {
          success(data, state, xhr);
        },
        error: function (data) {
          if(!error.__hasExec) {
            error.__hasExec = true;
            error(data || {});
          }
        }
      });
    }
    return load();
  },
};
