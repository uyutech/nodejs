/**
 * Created by army8735 on 2017/9/20.
 */

let parent = window.parent;

if(parent !== window) {
  let hostname = parent.location.hostname;
  if(hostname.indexOf('circling.cc') === -1) {
    location.href = '//404.html';
  }
  else {
    function findA(node) {
      if(node && node !== document.body && node.nodeName === 'A') {
        let href = node.getAttribute('href') || '';
        if(href && href.charAt(0) !== '#') {
          // 外链
          if(/^https?:\/\//.test(href)) {
            parent.goto && parent.goto(href);
            return true;
          }
          // 相对/根路径或相对路径
          else if(href.charAt(0) !== '/' || href.indexOf('//') !== 0) {
            parent.setHash && parent.setHash(href);
            return true;
          }
        }
      }
      else if(node.parentNode) {
        return findA(node.parentNode);
      }
    }
    document.body.addEventListener('click', function(e) {
      if(findA(e.target)) {
        e.preventDefault();
      }
    });
    document.addEventListener('DOMContentLoaded', function() {
      parent.setWidth(document.documentElement.clientWidth);
    });
  }
}
else if(location.pathname !== '/' && !/__unembed/.test(location.search)) {
  location.href = '/#' + location.pathname;
}
