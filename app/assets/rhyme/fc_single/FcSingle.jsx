/**
 * Created by army8735 on 2018/7/4.
 */

'use strict';

import $util from "../../d/common/util";
import $net from "../../d/common/net";

class FcSingle extends migi.Component {
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
    $net.postJSON('/ysjxy/vote', { id, type: 1, }, function(res) {
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
    let pic = single.user.headUrl;
    single.collection.forEach((item) => {
      if(item.kind === 3) {
        pic = item.url;
      }
    });
    return <div class="fc-single">
      <div class="con">
        <a href="/ysjxy" class="index">首页</a>
        <div class="single">
          <a class="pic"
             href={ '/works/' + single.works.id }
             target="_blank">
            <img src={ $util.img(pic, 480, 480, 80) }/>
            <span>No.{ single.id }</span>
          </a>
          <div class="txt">
            <a class="ti"
               href={ '/works/' + single.works.id }
               target="_blank">{ single.works.title }</a>
            <p>上传者：{ single.user.nickname }</p>
            <p class="desc">{ single.works.describe }</p>
            <p class="count"><strong>{ single.voteCount }</strong>票</p>
            <div class="btn">
              <span class="vote"
                    onClick={ this.clickVote }
                    rel={ single.id }>投票</span>
              <a class="share"
                 href={ 'http://service.weibo.com/share/share.php?url='
                 + encodeURIComponent('https://circling.cc/ysjxy/fc/' + single.id)
                 + '&type=button&language=zh_cn&appkey=2345825162&title=' + encodeURIComponent('#异世谣# #异世交响月# 翻唱大赛好热闹，我也来凑个热闹！小伙伴们快来给我投票吧~ @异世谣  @结梦谷 ')
                 + '&searchPic=false&style=number' }
                 target="_blank">分享</a>
            </div>
          </div>
        </div>
      </div>
      <img class="logo" src="//zhuanquan.xin/rhymesland/ysjxy/logo.png"/>
    </div>;
  }
}

export default FcSingle;
