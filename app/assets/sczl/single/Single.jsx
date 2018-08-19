/**
 * Created by army8735 on 2018/8/18.
 */

'use strict';

import $util from "../../d/common/util";
import $net from "../../d/common/net";

class Single extends migi.Component {
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
    $net.postJSON('/sczl/vote', { id, type: 1, }, function(res) {
      if(res.success) {
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
    let item = this.props.item;
    let pic = item.user.headUrl;
    item.collection.forEach((item) => {
      if(item.kind === 3) {
        pic = item.url;
      }
    });
    return <div class="item">
      <a class="pic"
         href={ '/works/' + item.works.id }
         target="_blank">
        <img src={ $util.img(pic, 480, 480, 80) }/>
        <span>No.{ item.id }</span>
      </a>
      <div class="txt">
        <a class="ti"
           href={ '/works/' + item.works.id }
           target="_blank">{ item.works.title }</a>
        <p class="er">参赛者：<span>{ item.user.nickname }</span></p>
        <p class="desc">{ item.works.describe }</p>
        <p class="count"><strong>{ item.voteCount }</strong>票</p>
        <div class="btn">
          <span class="vote"
                onClick={ this.clickVote }
                rel={ item.id }>投票</span>
          <a class="share"
             href={ 'http://service.weibo.com/share/share.php?url='
             + encodeURIComponent('https://circling.cc/sczl/single/' + item.id)
             + '&type=button&language=zh_cn&appkey=2345825162&title='
             + encodeURIComponent(`#新起点，新奇点##2018 西安曲漫# 我参与了丝绸之路古风歌曲翻唱活动 @水墨映像CINK 投票地址：https://circling.cc/sczl/single/${item.id} 参赛地址：https://circling.cc/sczl`)
             + '&searchPic=false&style=number' }
             target="_blank">分享</a>
        </div>
      </div>
    </div>;
  }
}

export default Single;
