/**
 * Created by army8735 on 2017/8/25.
 */

import './index.less';

import TopNav from './TopNav.jsx';
import BotNav from './BotNav.jsx';
import Share from './Share.jsx';
import NeedLogin from './NeedLogin.jsx';

import Luck from './weibo/Luck.jsx';
import Index from './index/Index.jsx';
import Geography from './geography/Geography.jsx';
import History from './history/History.jsx';
import Legend from './legend/Legend.jsx';
import Character from './character/Character.jsx';
import Rhyme from './rhyme/Rhyme.jsx';
import Work from './work/Work.jsx';
import About from './history/About.jsx';
import SComment from './scomment/SComment.jsx';
import Grid from './grid/Grid.jsx';

import qs from 'anima-querystring';
let search = qs.parse(location.search.replace(/^\?/, ''));
let cid = window.cid = search.cid;

let $page = $('#page');
migi.eventBus.on('changeBgi', function(name) {
  if(/^https?:/.test(name)) {
    $page.css('background-image', `url(${name})`);
    return;
  }
  $page.removeAttr('style');
  $page[0].className = 'page';
  $page.addClass(name);
});

let last;

let topNav = migi.render(
  <TopNav/>,
  document.body
);

let audio = migi.render(
  <audio autoplay="autoplay" loop="loop">
    <source src="//zhuanquan.xyz/rhymesland/bgm.mp3" type="audio/mpeg"/>
  </audio>,
  document.body
);

topNav.on('music', function(bool) {
  if(bool) {
    audio.element.play();
  }
  else {
    audio.element.pause();
  }
});

let luck;
let index;
let geography;
let history;
let legend;
let character;
let rhyme;
let work;
let about;
let scomment;
let grid;

let botNav = migi.render(
  <BotNav/>,
  document.body
);

let share = migi.render(
  <Share/>,
  document.body
);
migi.eventBus.on('share', function(url) {
  share.url = url;
  share.show();
});

let needLogin = migi.render(
  <NeedLogin/>,
  document.body
);
migi.eventBus.on('NEED_LOGIN', function(message) {
  needLogin.message = message;
  needLogin.show();
});

if(window.IS_MOBILE) {
  topNav.on('clickLogo', function() {
    botNav.clickLogo();
  });
}

function hashchange(hash) {
  hash = hash || '';
  botNav.hl(hash.slice(1));
  if(last) {
    last.hide();
  }
  //是否展示返回按钮
  if(window.history.length) {
    topNav.showBack();
  }
  else {
    topNav.hideBack();
  }
  $page.scrollTop(0);
  // 移动除了个别页，其它均默认隐藏botNav的子导航
  if(window.IS_MOBILE) {
    botNav.hideMenu();
    botNav.showBall();
  }
  topNav.show();
  botNav.show();
  //work特殊处理id
  if(hash.indexOf('#work') === 0) {
    if(!work) {
      work = migi.render(
        <Work/>,
        '#page'
      );
    }
    last = work;
    let id = hash.slice('#work'.length);
    work.setId(id);
    migi.eventBus.emit('changeBgi', 'work' + id);
    botNav.hideMenu();
    topNav.stop();
    if(window.IS_MOBILE) {
      botNav.hideBall();
    }
  }
  //单独评论特殊处理id
  else if(hash.indexOf('#comment') === 0) {
    if(!scomment) {
      scomment = migi.render(
        <SComment/>,
        '#page'
      );
    }
    last = scomment;
    migi.eventBus.emit('changeBgi', 'scomment');
    topNav.name = '留言';
    topNav.play();
  }
  //单独人物特殊处理
  else if(hash.indexOf('#character') === 0) {
    if(!character) {
      character = migi.render(
        <Character/>,
        '#page'
      );
    }
    last = character;
    migi.eventBus.emit('changeBgi', 'character');
    let name = hash.slice('#character'.length);
    switch (name) {
      case 'muhan':
        topNav.name = '慕寒';
        break;
      case 'hetu':
        topNav.name = '河图';
        break;
      case 'mi':
        topNav.name = '弥';
        break;
      case 'sixia':
        topNav.name = '司夏';
        break;
      case 'jiemeng':
        topNav.name = '结梦';
        break;
    }
    character.user(name);
    topNav.play();
  }
  //其它
  else {
    switch (hash) {
      case '#luck':
        if(!luck) {
          luck = migi.render(
            <Luck/>,
            '#page'
          );
          luck.on('ok', function () {
            hashchange()
          });
        }
        last = luck;
        migi.eventBus.emit('changeBgi', 'luck');
        topNav.name = '提示';
        botNav.showMenu();
        break;
      case '#geography':
        if(!geography) {
          geography = migi.render(
            <Geography/>,
            '#page'
          );
        }
        last = geography;
        migi.eventBus.emit('changeBgi', 'geography');
        topNav.name = '地理';
        break;
      case '#rhyme':
        if(!rhyme) {
          rhyme = migi.render(
            <Rhyme/>,
            '#page'
          );
        }
        last = rhyme;
        migi.eventBus.emit('changeBgi', 'rhyme');
        topNav.name = '歌谣';
        break;
      case '#legend':
        if(!legend) {
          legend = migi.render(
            <Legend/>,
            '#page'
          );
        }
        last = legend;
        migi.eventBus.emit('changeBgi', 'legend');
        topNav.name = '传记';
        break;
      case 'rhyme':
        if(!rhyme) {
          rhyme = migi.render(
            <Rhyme/>,
            '#page'
          );
        }
        last = rhyme;
        migi.eventBus.emit('changeBgi', 'rhyme');
        topNav.name = '歌谣';
        break;
      case '#history':
        if(!history) {
          history = migi.render(
            <History/>,
            '#page'
          );
        }
        last = history;
        migi.eventBus.emit('changeBgi', 'history');
        topNav.name = '历史';
        break;
      case '#about':
        if(!about) {
          about = migi.render(
            <About/>,
            '#page'
          );
        }
        last = about;
        migi.eventBus.emit('changeBgi', 'history');
        topNav.name = '关于';
        break;
      case '#grid':
        if(!grid) {
          grid = migi.render(
            <Grid/>,
            '#page'
          );
        }
        last = grid;
        migi.eventBus.emit('changeBgi', 'grid');
        topNav.name = '皎然浮生';
        break;
      default:
        if(!index) {
          index = migi.render(
            <Index/>,
            '#page'
          );
        }
        last = index;
        migi.eventBus.emit('changeBgi', 'index');
        topNav.name = '首页';
        botNav.showMenu();
        break;
    }
    topNav.play();
  }
  if(last) {
    last.show();
  }
}

let cookieHash = $.cookie('hash');
if(cookieHash) {
  location.hash = cookieHash;
  $.removeCookie('hash');
}
else if(cid) {
  hashchange('#comment' + cid);
}
else {
  hashchange(location.hash);
}

topNav.on('back', function() {
  window.history.back();
});

$(window).on('hashchange', function() {
  hashchange(location.hash);
});
