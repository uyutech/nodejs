/**
 * Created by army8735 on 2017/11/29.
 */

'use strict';

import util from "../../d/common/util";
import net from "../../d/common/net";
import HotUser from '../component/hotuser/HotUser.jsx';
import HotAuthor from '../component/hotauthor/HotAuthor.jsx';
import HotPost from '../component/hotpost/HotPost.jsx';

let take = 10;
let skip = take;
let loading;
let loadEnd;

class Follow extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      loadEnd = self.props.postList.Size <= take;
      let $window = $(window);
      $window.on('scroll', function() {
        self.checkMore($window);
      });
    });
  }
  checkMore($window) {
    let self = this;
    if(loading || loadEnd) {
      return;
    }
    let WIN_HEIGHT = $window.height();
    let HEIGHT = $(document.body).height();
    let bool;
    bool = $window.scrollTop() + WIN_HEIGHT + 30 > HEIGHT;
    if(bool) {
      self.load();
    }
  }
  load() {
    let self = this;
    if(loading) {
      return;
    }
    let hotPost = self.ref.hotPost;
    loading = true;
    hotPost.message = '正在加载...';
    net.postJSON('/api/follow/postList', { skip, take }, function(res) {
      if(res.success) {
        let data = res.data;
        skip += take;
        hotPost.appendData(data.data);
        if(skip >= data.Size) {
          loadEnd = true;
          hotPost.message = '已经到底了';
        }
        else {
          hotPost.message = '';
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
  }
  render() {
    return <div class="follow">
      {/*<h4>关注话题</h4>*/}
      {/*<div class="circles" ref="circles">*/}
        {/*<div class="c">*/}
          {/*<ul>*/}
            {/*{*/}
              {/*(this.props.hotCircle || []).map(function(item) {*/}
                {/*return <li rel={ item.Cid }><a href={ '/circle/' + item.Cid }>{ item.CirclingName }</a></li>;*/}
              {/*}.bind(this))*/}
            {/*}*/}
          {/*</ul>*/}
        {/*</div>*/}
      {/*</div>*/}
      <h4>关注作者</h4>
      <HotAuthor ref="hotAuthor" empty={ '你还没有关注作者哦，快去发现页看看有没有喜欢的作者吧！' } dataList={ this.props.follows }/>
      <h4>关注圈er</h4>
      <HotUser ref="hotuser" empty={ '你还没有关注的圈er哦，快去转圈页看看有没有有趣的小伙伴吧~' } dataList={ this.props.userFollows }/>
      <h4>关注我的</h4>
      <HotUser ref="hotuser" empty={ '还没有人关注你哦，快去转圈页看看有没有有趣的小伙伴吧~' } dataList={ this.props.userFans }/>
      <h4>Ta们画的圈</h4>
      <HotPost ref="hotPost" data={ this.props.postList.data }/>
    </div>;
  }
}

export default Follow;
