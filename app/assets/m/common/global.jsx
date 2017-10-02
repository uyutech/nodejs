/**
 * Created by army8735 on 2017/9/18.
 */

import util from './util';
import TopNav from '../component/topnav/TopNav.jsx';
import BotNav from '../component/botnav/BotNav.jsx';
import MLogin from '../component/mlogin/MLogin.jsx';

document.addEventListener('DOMContentLoaded', function() {
  let topNav = migi.preExist(<TopNav/>);
  topNav.on('search', function(kw) {
    util.goto('/search/' + kw);
  });
  migi.preExist(<BotNav/>);

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
});
