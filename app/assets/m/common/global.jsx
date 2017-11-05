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
  let helloMessage = localStorage['helloMessage'];
  if(!helloMessage) {
    let quaniang = migi.render(
      <div class="quaniang">
        <div class="c">
          <h5>圈儿：</h5>
          <pre>{ '感谢大家对积分活动的支持！近期我们感受到了大家满满的热情！~\n' +
          '\n' +
          '其实原本这个活动是要到App正式上线之后才开放哒！但看到大家等待得很焦急，所以提前开放了这次活动，也是希望小伙伴们能一起见证圈儿的成长。\n' +
          '\n' +
          '转圈平台鼓励的是有意义的分享和交流，并不鼓励大家每天花费过多的时间进行灌水哦！\n' +
          '虽然我们的平台积分显示功能还没做好，但圈儿在这里针对这次的活动规则特地做以下补充和提示：\n' +
          '（1）全站每8小时内的留言超过10条后就只能积累极少积分了——也就是说不鼓励大家全天盯着转圈不停的发言哦！比较合理的做法是，早、中、晚随便转一圈，和小伙伴们交流就好啦。\n' +
          '（2）同一时段同一页面连续留言时，积分会不断递减——也就是说不鼓励大家在同一页面不停留言，而是鼓励大家四处逛逛，多发现新的内容哦！\n' +
          '（3）同一时段在多个页面出现同质留言（例如“早安”、“打卡”）也会递减——也就是说不鼓励大家在不同的地方刷同样的话，而是把问候留给自己最心爱的人哦！\n' +
          '（4）由于现在功能还在持续增加中，大家能做的只有评论留言。不过很快我们会上线在圈子中发状态和讨论的功能，大家可以分享自己的生活点滴，或是发布摄影、绘画、练字作品等等，也可以分享站内音乐、给喜爱的作品写长评等等。届时这类有意义的作品将获得更多的积分。\n' +
          '（5）本次活动的积分会换算成站内货币，未来的福利都是通过用虚拟货币购买的形式获得的。所以本次活动没有直接获得福利的小伙伴依然可以积累虚拟币，在未来可以兑换福利。\n' +
          '（6）我们目前提供的任何一种福利都不会绝版，并且会不断增加新的类别，只要大家未来不断交流探索，都可以获得这些福利的。所以没时间的学生党也不用担心，希望大家安心学习，不要为了一时的活动花费过多的时间。\n' +
          '（7）给他人留言互动与直接留言获得的积分一样（目前还没有做好消息提醒的功能，我们会尽快添加），此外和他人互动可以积累用户间的亲密值，未来会有圈友和圈密的功能上线。圈友多多的话，未来获得的积分也会得到加成哦！\n' +
          '（8）很快会有各种类型作品的上传功能，欢迎有才华的小伙伴们一起分享你们的作品！优秀作品会额外获得圈儿赠送的虚拟币！\n' +
          '\n' +
          '所以综合来看，这次活动、以及未来转圈最效率的方法是，每天空闲的休息的时候，在喜欢的一两位作者或圈子和大家打个招呼、或是催催坑，浏览浏览各处，发现新的讨论、作品和优秀作者，看看其他小伙伴的作品，并进行交流，或者与大家分享的自己的作品和每天的生活！\n' +
          '\n' +
          '希望大家合理利用时间！~不断交流，共同进步~每天都成为比昨天更优秀的人~' }</pre>
          <p>欢迎点击右侧给我们留言！<a href="http://weibo.com/u/6259241863" target="_blank">@转圈circling</a></p>
          <a class="close" href="#" onClick={ clickClose }>好的</a>
        </div>
      </div>,
      document.body
    );
    $(document.body).addClass('g-hm');
    function clickClose(e) {
      e.preventDefault();
      quaniang.clean();
      $(document.body).removeClass('g-hm');
      localStorage['helloMessage'] = 1;
    }
  }
});
