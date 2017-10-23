/**
 * Created by army8735 on 2017/9/20.
 */

import './index.less';

import TopNav from '../component/topnav/TopNav.jsx';
import CIframe from '../component/ciframe/CIframe.jsx';
import QuanNiang from './QuanNiang.jsx';

let topNav = migi.preExist(<TopNav userInfo={ $CONFIG.userInfo }/>);

let cIframe;

let quanNiang = migi.render(
  <QuanNiang/>,
  document.body
);

migi.render(
  <div class="info"/>,
  document.body
);

window.setHash = function(hash) {
  location.hash = hash;
};
window.goto = function(url) {
  location.href = url;
};
window.setWidth = function(width) {
  let diff = document.documentElement.clientWidth - width;
  if(diff > 0) {
    topNav.setMarginRight(diff);
  }
};
window.upZIndex = function() {
  $(cIframe.element).addClass('up');
};
window.downZIndex = function() {
  $(cIframe.element).removeClass('up');
};
let commentType = {};
window.comment = function(type) {
  commentType[type] = commentType[type] || [];
  let list = commentType[type];
  let now = Date.now();
  if(list.length) {
    let last = list[list.length - 1];
    if(now - last < 1000 * 60) {
      quanNiang.message = '为了方便其他小伙伴和大大们阅读，请尽量将每次想说的话在一条留言中发布哦~\n将一句留言在短时间内拆成多条发送，所获得的积分并没有作为一条完整留言发送所获得的积分多哦˵ •́ o •̀ ˵';
      quanNiang.show();
    }
  }
  list.push(now);
};

function iframeGoto(hash) {
  hash = hash || '';
  hash = hash.replace(/^#/, '');
  if(!hash || hash === '/') {
    hash = '/find';
  }
  if(cIframe) {
    cIframe.clean();
  }
  cIframe = migi.render(
    <CIframe/>,
    document.body
  );
  cIframe.element.contentWindow.location.href = hash;
}

window.addEventListener('hashchange', function() {
  iframeGoto(location.hash);
});

iframeGoto(location.hash);

topNav.on('search', function(kw) {
  location.hash = '/search/' + kw;
});
