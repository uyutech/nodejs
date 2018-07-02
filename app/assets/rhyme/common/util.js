/**
 * Created by army on 2017/5/20.
 */

import sort from './sort';
// import $ from 'anima-yocto-ajax';

let util = {
  isIPhone: function(){
    return navigator.appVersion.match(/iphone/gi);
  },
  ajax: function(url, data, success, error, type) {
    let csrfToken = $.cookie('csrfToken');
    function load() {
      return $.ajax({
        url: url,
        data: data,
        dataType: 'json',
        cache: false,
        crossDomain: true,
        timeout: 6000,
        type: type || 'get',
        headers: {
          'x-csrf-token': csrfToken,
        },
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
  getJSON: function(url, data, success, error) {
    if(typeof data === 'function') {
      error = success;
      success = data;
      data = {};
    }
    error = error || function() {};
    return util.ajax(url, data, success, error);
  },
  postJSON: function(url, data, success, error) {
    if(typeof data === 'function') {
      error = success;
      success = data;
      data = {};
    }
    error = error || function() {};
    return util.ajax(url, data, success, error, 'post');
  },
  autoSsl: function(url) {
    if(!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return (url || '').replace(/^https?:\/\//i, '//');
  },
  img: function(url, w, h, q) {
    url = url || '';
    url = url.trim();
    if(!/\/\/zhuanquan\./i.test(url)) {
      return util.autoSsl(url);
    }
    url = url.replace(/\.(\w+)-\d*_\d*_\d*/, '.$1');
    if(w === undefined && h === undefined && q === undefined) {
      return url;
    }
    url += '-' + (w ? w : '') + '_' + (h ? h : '') + '_' + (q ? q : '');
    return util.autoSsl(url);
  },
  sort,
  ERROR_MESSAGE: '人气大爆发，请稍后再试。'
};

export default util;
