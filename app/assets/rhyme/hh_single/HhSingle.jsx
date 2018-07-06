/**
 * Created by army8735 on 2018/7/5.
 */

'use strict';

import $util from "../../d/common/util";
import $net from "../../d/common/net";

class HhSingle extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  clickVote(e, vd) {
    let el = vd.element;
    if(el.classList.contains('loading')) {
      return;
    }
    if(el.classList.contains('voted')) {
      return;
    }
    let id = vd.props.rel;
    $net.postJSON('/ysjxy/vote', { id, type: 2, }, function(res) {
      if(res.success) {
        // el.classList.add('voted');
        // el.classList.remove('vote');
        // el.textContent = '已投';
        vd.parent.parent.find('.count strong').element.textContent = res.data.count;
      }
      else if(res.code === 1000) {
        location.href = '/oauth/weibo?goto=' + encodeURIComponent(location.href);
      }
      else {
        alert(res.message || $util.ERROR_MESSAGE);
      }
      el.classList.remove('loading');
    }, function(res) {
      alert(res.message || $util.ERROR_MESSAGE);
      el.classList.remove('loading');
    });
  }
  render() {
    let single = this.props.single;
    let pic = single.works.cover;
    single.collection.forEach((item) => {
      if(item.kind === 3) {
        pic = item.url;
      }
    });
    return <div class="hh-single">
      <div class="con fn-clear">
        <a href="/ysjxy" class="index">首页</a>
        <div class="single">
          <a class="pic"
             href={ pic }
             target="_blank">
            <img src={ $util.img(single.user.headUrl, 480, 480, 80) }/>
            <span>No.{ single.id }</span>
          </a>
          <div class="txt">
            <p>上传者：{ single.user.nickname }</p>
            <p class="count"><strong>{ single.voteCount }</strong>票</p>
            <div class="btn">
              <span class="vote"
                    onClick={ this.clickVote }
                    rel={ single.id }>投票</span>
              <a class="share"
                 href={ 'http://service.weibo.com/share/share.php?url='
                 + encodeURIComponent('https://circling.cc/ysjxy/hh/' + single.id)
                 + '&type=button&language=zh_cn&appkey=2345825162&title=' + encodeURIComponent('#异世谣# #异世交响月# 绘画大赛好热闹，我也来凑个热闹！小伙伴们快来给我投票吧~ @异世谣  @结梦谷 ')
                 + '&searchPic=false&style=number' }
                 target="_blank">分享</a>
            </div>
          </div>
        </div>
        <div class="desc">{ single.works.describe }</div>
        <a class="hh" href={ pic } target="_blank">
          <img src={ $util.img(pic, 0, 0, 60) }/>
        </a>
      </div>
      <img class="logo" src="//zhuanquan.xin/rhymesland/ysjxy/logo.png"/>
    </div>;
  }
}

export default HhSingle;
