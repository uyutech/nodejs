/**
 * Created by army on 2017/5/20.
 */

import BigNumber from 'bignumber.js';

let util = {
  isLogin: function() {
    return $.cookie('isLogin') === 'true';
  },
  autoSsl: function(url) {
    if(!/\/\/zhuanquan\./i.test(url) && !/\.sinaimg\.cn\//i.test(url)) {
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
  decode: function(str) {
    return str.replace(/&lt;/g, '<').replace(/&amp;/g, '&');
  },
  formatTime: function(time) {
    if(!time) {
      return '00:00';
    }
    let res = '';
    if(time >= 60 * 60) {
      let hour = Math.floor(time / (60 * 60));
      time -= 60 * 60 * hour;
      res += hour + ':';
    }
    if(time >= 60) {
      let minute = Math.floor(time / 60);
      time -= 60 * minute;
      if(minute < 10) {
        minute = '0' + minute;
      }
      res += minute + ':';
    }
    else {
      res += '00:';
    }
    let second = Math.floor(time);
    if(second < 10) {
      second = '0' + second;
    }
    res += second;
    return res;
  },
  formatDate: function(time) {
    time = new Date(time);
    let now = Date.now();
    let diff = now - time;
    if(diff >= 1000 * 60 * 60 * 24 * 365) {
      return Math.floor(diff / (1000 * 60 * 60 * 24 * 365)) + '年前';
    }
    if(diff >= 1000 * 60 * 60 * 24 * 30) {
      return Math.floor(diff / (1000 * 60 * 60 * 24 * 30)) + '月前';
    }
    if(diff >= 1000 * 60 * 60 * 24) {
      return Math.floor(diff / (1000 * 60 * 60 * 24)) + '天前';
    }
    if(diff >= 1000 * 60 * 60) {
      return Math.floor(diff / (1000 * 60 * 60)) + '小时前';
    }
    if(diff >= 1000 * 60) {
      return Math.floor(diff / (1000 * 60)) + '分钟前';
    }
    return '刚刚';
  },
  abbrNum: function(n, fix) {
    if(!n) {
      return 0;
    }
    if(n >= 10000) {
      n = new BigNumber(n).div(10000).toFixed(fix || 1);
      n = n.replace(/(\.[1-9]+)0+$/, '$1');
      n = n.replace(/\.0+$/, '');
      n += 'w';
    }
    if(n >= 1000) {
      n = new BigNumber(n).div(1000).toFixed(fix || 1);
      n = n.replace(/(\.[1-9]+)0+$/, '$1');
      n = n.replace(/\.0+$/, '');
      n += 'k';
    }
    return n;
  },
  ERROR_MESSAGE: '人气大爆发，请稍后再试。',
  uniqueList: function(list) {
    list = list || [];
    let hash = {};
    let res = [];
    list.forEach(function(item) {
      if(hash[item]) {
        return;
      }
      hash[item] = true;
      res.push(item);
    });
    return res;
  },
  setClipboard: function(s) {
    let input = document.createElement('input');
    input.setAttribute('style', 'position:fixed;left:-9999rem;top:-9999rem;');
    input.value = s;
    document.body.appendChild(input);
    input.focus();
    input.setSelectionRange(0, 9999);
    document.execCommand('copy');
    document.body.removeChild(input);
    jsBridge.toast('复制成功');
  },
  isBottom: function(offset) {
    offset = offset || 30;
    let y = this.scrollY();
    let WIN_HEIGHT = document.documentElement.clientHeight;
    let HEIGHT = document.body.clientHeight;
    return y + WIN_HEIGHT + offset > HEIGHT;
  },
  scrollY: function(v) {
    if(v !== undefined) {
      window.scroll(0, v);
    }
    return document.documentElement.scrollTop || window.pageYOffset || window.scrollY || 0;
  },
};

export default util;
