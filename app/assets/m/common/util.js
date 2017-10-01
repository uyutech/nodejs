/**
 * Created by army on 2017/5/20.
 */

import sort from './sort';
import $ from 'anima-yocto-ajax';

let util = {
  isIPhone: function(){
    return navigator.appVersion.match(/iphone/gi);
  },
  ajax: function(url, data, success, error, type) {
    function load() {
      return $.ajax({
        url: url,
        data: data,
        dataType: 'json',
        cache: false,
        crossDomain: true,
        timeout: 6000,
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
  getJSON: function(url, data, success, error) {
    if (typeof data === 'function') {
      error = success;
      success = data;
      data = {};
    }
    error = error || function() {};
    return util.ajax(url, data, success, error);
  },
  postJSON: function(url, data, success, error) {
    if (typeof data === 'function') {
      error = success;
      success = data;
      data = {};
    }
    error = error || function() {};
    return util.ajax(url, data, success, error, 'post');
  },
  goto: function(url) {
    location.href = url;
  },
  img150_150: function(url) {
    return url ? url + '-150_150' : url;
  },
  img100_100: function(url) {
    return url ? url + '-100_100' : url;
  },
  img90_90: function(url) {
    return url ? url + '-90_90' : url;
  },
  sort,
  ERROR_MESSAGE: '人气大爆发，请稍后再试。'
};

export default util;
