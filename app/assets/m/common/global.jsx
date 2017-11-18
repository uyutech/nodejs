/**
 * Created by army8735 on 2017/9/18.
 */

import net from '../../d/common/net';
import util from '../../d/common/util';
import MLogin from '../component/mlogin/MLogin.jsx';
import Share from '../../d/component/share/Share.jsx';

let mlogin;
migi.eventBus.on('NEED_LOGIN', function() {
  if(!mlogin) {
    mlogin = migi.render(
      <MLogin/>,
      document.body
    );
  }
  mlogin.show();
});

let share;
migi.eventBus.on('SHARE', function(url) {
  if(!share) {
    share = migi.render(
      <Share/>,
      document.body
    );
  }
  share.url = url;
  share.show();
});

document.addEventListener('DOMContentLoaded', function() {
  let $name = $('#topNav .name');
  $name.on('click', function() {
    if(!$CONFIG.isLogin) {
      migi.eventBus.emit('NEED_LOGIN');
    }
  });
  let $head = $('#topNav img');
  $head.on('click', function() {
    if(!$CONFIG.isLogin) {
      migi.eventBus.emit('NEED_LOGIN');
    }
  });
  let loading;
  let $public = $('#topNav .public').eq(0);
  $public.on('click', function() {
    if(loading) {
      return;
    }
    loading = true;
    let isPublic = $CONFIG.isPublic;
    net.postJSON('/api/user/altSettle', { public: !isPublic }, function(res) {
      if(res.success) {
        $CONFIG.isPublic = !isPublic;
        if(!isPublic) {
          $name.addClass('public');
          $name.text($CONFIG.authorName);
          $public.text('[切换到马甲]');
        }
        else {
          $name.removeClass('public');
          $name.text($CONFIG.uname);
          $public.text('[切换到作者]');
        }
      }
      else {
        alert(res.message || util.ERROR_MESSAGE);
      }
      loading = false;
    }, function(res) {
      alert(res.message || util.ERROR_MESSAGE);
      loading = false;
    });
  });
  let $message = $('#topNav .message');
  migi.eventBus.on('READ_MESSAGE_NUM', function(i) {
    let n = $CONFIG.messageNum;
    if(n) {
      n = Math.max(0, n - i);
      $CONFIG.messageNum = n;
      $message.find('span').text(n > 99 ? '99+' : n);
      if(n === 0) {
        $message.find('span').addClass('fn-hide');
      }
    }
  });
});
