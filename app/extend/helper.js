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
    return '/public' + url + '?246';
  },
  okJSON(data) {
    return {
      success: true,
      data,
    };
  },
  errorJSON(data) {
    if(typeof data === 'string') {
      data = {
        message: data,
      };
    }
    data = data || {};
    return {
      success: false,
      code: data.code,
      message: data.message,
      data: data.data,
    };
  },
  loginJSON() {
    return {
      success: false,
      code: 1000,
      message: '请先登录',
    };
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
  getDTopNav: function(data) {
    data = data || {};
    let pageId = data.pageId;
    let session = this.ctx.session || {};
    return `<div class="g-top" id="gTop">
      <div class="c">
        <a href="/" class="logo">转圈，一个有爱的智能社区~</a>
        <ul>
          <li><a href="/"
                 class="${pageId === 0 ? 'cur' : ''}">首页</a></li>
          ${session.uid
      ? '<li><a href="/ysjxy">异世交响月</a></li>'
      : ''}
          <li>
          ${session.uid
      ? (session.nickname)
      : '<a href="/login" class="login">登录</a>'}
          </li>
          ${session.uid ? '<li class="out">退出</li>' : ''}
        </ul>
      </div>
    </div>`;
    // return `<div class="g-top" id="gTop">
    //   <div class="c">
    //     <a href="/" class="logo">转圈，一个有爱的智能社区~</a>
    //     <ul>
    //       <li><a href="/"
    //              class="${pageId === 0 ? 'cur' : ''}">首页</a></li>
    //       ${session.uid
    //         ? '<li><a href="http://ugc.circling.cc">上传作品</a></li>'
    //         : ''}
    //       <li>
    //       ${session.uid
    //         ? (session.nickname)
    //         : '<a href="/login" class="login">登录</a>'}
    //       </li>
    //       ${session.uid ? '<li class="out">退出</li>' : ''}
    //     </ul>
    //   </div>
    // </div>`;
  },
  getDBotNav: function() {
    return `<div class="g-bot" id="gBot">
      <ul>
        <li><a href="https://weibo.com/u/6259241863">转圈官博</a></li>
      </ul>
      <p>© Uyutech all rights reserved © 杭州呦悠网络科技有限公司 保留所有权利</p>
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
  getMTopNav: function() {
    let ua = this.ctx.request.header['user-agent'];
    let url = 'https://circling.net.cn/android/circling-0.7.1.apk';
    if(/(iPhone|iPod|ios)/i.test(ua)) {
      url = 'https://itunes.apple.com/cn/app/id1331367220';
    }
    return `<div class="g-top" id="gTop">
      <span class="logo">一个有爱的智能社区~</span>
      <b></b>
      <ul class="fn-hide">
        <li><a href="/" class="index">首页</a></li>
        <li><a href="${url}" class="download">下载app</a></li>
      </ul>
    </div>`;
  },
  getMTopMenu: function(index) {
    return `<ul class="top-menu" id="topMenu">
      <li class="${index === 0 ? 'cur' : ''}"><a href="/">发现</a></li>
      <li class="${index === 1 ? 'cur' : ''}"><a href="/circling">转圈</a></li>
      <li class="${index === 2 ? 'cur' : ''}"><a href="/follow">关注</a></li>
      <li class="app"><a href="http://m.circling.cc/post/2020000000056611" target="_blank">下载安卓App</a></li>
    </ul>`;
  },
  getMBotNav: function() {
    let ua = this.ctx.request.header['user-agent'];
    let url = 'https://circling.net.cn/android/circling-0.7.1.apk';
    if(/(iPhone|iPod|ios)/i.test(ua)) {
      url = 'https://itunes.apple.com/cn/app/id1331367220';
    }
    return `<div class="g-bot" id="gBot">
      <ul>
        <li><a href="https://weibo.com/u/6259241863">转圈官博</a></li>
      </ul>
      <p>© Uyutech all rights reserved © 杭州呦悠网络科技有限公司 保留所有权利</p>
    </div>
    <div class="g-app" id="gApp">
      <div class="txt">
        <div>
          <h4>每天转个圈 玩转每个圈</h4>
          <p>一个充满正能量的作品展示、创作平台~</p>
        </div>
        <a href="${url}" target="_blank">下载</a>
      </div>
    </div>
    <div class="g-tip fn-hide" id="gTip">
      <span>ios下载如果没有反应，请点击右上角，选择在safari浏览器中打开</span>
    </div>`;
  },
  getStat() {
    return '<div style="display:none"><script defer="defer">var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id=\'cnzz_stat_icon_1265566429\'%3E%3C/span%3E%3Cscript src=\'" + cnzz_protocol + "s13.cnzz.com/z_stat.php%3Fid%3D1265566429\' type=\'text/javascript\'%3E%3C/script%3E"))</script></div>';
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
  $CONFIG: 'var $CONFIG = {};',
};

module.exports = helper;
