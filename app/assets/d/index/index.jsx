/**
 * Created by army8735 on 2017/9/20.
 */

import './index.less';

import TopNav from '../component/topnav/TopNav.jsx';
import CIframe from '../component/ciframe/CIframe.jsx';
import QuanNiang from './QuanNiang.jsx';

let topNav = migi.preExist(<TopNav/>);

let cIframe;

window.setTop = function(top) {
  // topNav.setTop(top);
};
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

migi.render(
  <QuanNiang/>,
  document.body
);

migi.render(
  <div class="info"/>,
  document.body
);
