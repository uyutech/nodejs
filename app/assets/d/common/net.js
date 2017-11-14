/**
 * Created by army8735 on 2017/10/6.
 */

'use strict';

let net = {
  ajax: function(url, data, success, error, type, timeout) {
    let csrfToken = $.cookie('csrfToken');
    Object.keys(data).forEach(function(k) {
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
  getJSON: function(url, data, success, error, timeout) {
    if(typeof data === 'function') {
      timeout = error;
      error = success;
      success = data;
      data = {};
    }
    if(typeof success !== 'function') {
      success = function() {};
      timeout = error;
      error = success;
    }
    if(typeof error !== 'function') {
      timeout = error;
      error = function() {};
    }
    return net.ajax(url, data, success, error, 'GET', timeout);
  },
  postJSON: function(url, data, success, error, timeout) {
    if(typeof data === 'function') {
      timeout = error;
      error = success;
      success = data;
      data = {};
    }
    if(typeof success !== 'function') {
      success = function() {};
      timeout = error;
      error = success;
    }
    if(typeof error !== 'function') {
      timeout = error;
      error = function() {};
    }
    return net.ajax(url, data, success, error, 'POST', timeout);
  },
};

export default net;
