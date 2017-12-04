/**
 * Created by army8735 on 2017/10/1.
 */

'use strict';

const R8232 = new RegExp(String.fromCharCode(8232), 'g');

let helper = {
  getAssetUrl(url) {
    if(url.indexOf('//') > -1) {
      return url;
    }
    return '/public' + url + '?123';
  },
  okJSON(data) {
    return {
      success: true,
      data,
    };
  },
  errorJSON(data) {
    return {
      success: false,
      code: data.code,
      message: data.message,
      data: data.data,
    };
  },
  * postServiceJSON(url, data) {
    if(url.indexOf('//') === -1) {
      url = 'http://172.19.118.93/' + url.replace(/^\//, '');
    }
    url += url.indexOf('?') > -1 ? '&' : '?';
    url += 'traceID=' + this.ctx.traceID || '';
    let uid = this.ctx.session ? this.ctx.session.uid || '-' : '-';
    let ip = this.ctx.request.header['x-real-ip'];
    let start = Date.now();
    let res;
    try {
      res = yield this.ctx.curl(url, {
        method: 'POST',
        data,
        dataType: 'json',
        gzip: true,
      });
    }
    catch(e) {
      let end = Date.now();
      this.ctx.getLogger('serviceLogger').error('[%s/%s/%s/%sms POST %s]', uid, ip, this.ctx.traceID, end - start, url);
      throw new Error(e);
    }
    let end = Date.now();
    this.ctx.getLogger('serviceLogger').info('[%s/%s/%s/%sms POST %s]', uid, ip, this.ctx.traceID, end - start, url);
    return res;
  },
  autoSsl: function(url) {
    return (url || '').replace(/^https?:\/\//i, '//');
  },
  getDHead: function(data) {
    data = data || {};
    let title = data.title ? ('转圈-' + data.title) : '转圈';
    return `<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
      <meta charset="UTF-8"/>
      <title>${title}</title>
      <script>if(parent && parent !== window && parent.setTitle) { parent.setTitle("${title}") }</script>
      <link rel="icon" href="//zhuanquan.xin/img/526ac77cd8f453867cb378b4d22cffda.png" type="image/x-icon">
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
      <meta name="renderer" content="webkit"/>
      <meta name="apple-mobile-web-app-capable" content="yes"/>
      <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
      <meta name="format-detection" content="telephone=no"/>
      <meta name="format-detection" content="email=no"/>
      <meta name="wap-font-scale" content="no"/>
      <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no">`;
  },
  getDBotNav: function() {
    return `<div class="cp-botnav">
      <div class="c">
        <p>Copyright © 2017 Uyutech. All Rights Reserved.<br/>呦悠科技 版权所有 浙ICP备17029501号-2</p>
        <ul class="link fn-clear">
          <li class="weibo"><a href="http://weibo.com/u/6259241863" target="_blank">新浪微博</a></li>
        </ul>
      </div>
    </div>`;
  },
  getMHead: function(data) {
    data = data || {};
    let title = data.title ? ('转圈-' + data.title) : '转圈';
    return `<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
      <meta charset="UTF-8"/>
      <title>${title}</title>
      <link rel="icon" href="//zhuanquan.xyz/img/526ac77cd8f453867cb378b4d22cffda.png" type="image/x-icon">
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
      <meta name="renderer" content="webkit"/>
      <meta name="apple-mobile-web-app-capable" content="yes"/>
      <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
      <meta name="format-detection" content="telephone=no"/>
      <meta name="format-detection" content="email=no"/>
      <meta name="wap-font-scale" content="no"/>
      <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no">`;
  },
  getMTopNav: function(data) {
    data = data || {}
    let session = this.ctx.session || {};
    let head = session.head || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png';
    if(head && /\/\/zhuanquan\./i.test(head)) {
      head += '-64_64_80';
    }
    if(session.uid) {
      let num = session.messageNum || 0;
      if(num > 99) {
        num = '99+';
      }
      if(session.authorID) {
        let isPublic = session.isPublic;
        return `<div class="top-nav" id="topNav">
          <a href="/" class="logo"></a>
          <a class="message" href="/my/message">
            <span>${ num || '' }</span>
          </a>
          <span class="public">[${ isPublic ? '切换到马甲' : '切换到作者身份' }]</span>
          <a href="/my" class="user">
            <span class="${'name' + (isPublic ? ' public' : '')}">${helper.encode(isPublic ? session.authorName : session.uname)}</span>
            <img src=${head}>
          </a>
        </div>`;
      }
      return `<div class="top-nav" id="topNav">
      <a href="/" class="logo"></a>
      <a class="message" href="/my/message">
        <span>${ num || '' }</span>
      </a>
      <a href="/my" class="user">
        <span class="name">${helper.encode(session.uname)}</span>
        <img src=${head}>
      </a>
    </div>`;
    }
    return `<div class="top-nav" id="topNav">
      <a href="/" class="logo"></a>
      <span class="user">
        <span class="name">登录/注册</span>
        <img src="//zhuanquan.xin/head/35e21cf59874d33e48c1bee7678d4d95.png">
      </a>
    </div>`;
  },
  getMTopMenu: function(index) {
    return `<ul class="top-menu" id="topMenu">
      <li class="${index === 0 ? 'cur' : ''}"><a href="/">发现</a></li>
      <li class="${index === 1 ? 'cur' : ''}"><a href="/circling">转圈</a></li>
      <li class="${index === 2 ? 'cur' : ''}"><a href="/follow">关注</a></li>
      <li class="app"><span>加班赶制app中~(๑•̀ᄇ•́)و ✧ </span></li>
    </ul>`;
  },
  getMBotNav: function() {
    return `<div class="cp-botnav">All Rights Reserved 转圈circling 浙ICP备17029501号-2</div>`;
  },
  getStat() {
    return '<div style="display:none">' +
      '<script>var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id=\'cnzz_stat_icon_1265566429\'%3E%3C/span%3E%3Cscript src=\'" + cnzz_protocol + "s13.cnzz.com/z_stat.php%3Fid%3D1265566429\' type=\'text/javascript\'%3E%3C/script%3E"));\n' +
      'var _hmt = _hmt || [];\n' +
      '(function() {\n' +
      '  var hm = document.createElement("script");\n' +
      '  hm.src = "https://hm.baidu.com/hm.js?6078345f51179032abb21c56b72d9f5c";\n' +
      '  var s = document.getElementsByTagName("script")[0]; \n' +
      '  s.parentNode.insertBefore(hm, s);\n' +
      '})();\n' +
      '</script></div>';
  },
  stringify: function(data) {
    if(data === undefined) {
      return 'undefined';
    }
    if(data === null) {
      return 'null';
    }
    return helper.encode(JSON.stringify(data));
  },
  encode: function(str) {
    if(!str) {
      return '';
    }
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(R8232, '&#8232;');
  },
  weiboAppKey: '2345825162',
  weiboAppSecret: '262e0bd1f13a614636ad5c748db20f15',
  weiboRedirect: 'https://circling.cc/oauth/login',
  $CONFIG: 'var $CONFIG = {};',
  rhymeAppKey: '4139489763',
  rhymeAppSecret: '1152af67bb15530c50d91728f86c43df',
  rhymeRedirect: 'http://rhymesland.com/oauth/rhymeLogin',
};

module.exports = helper;
