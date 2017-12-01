/**
 * Created by army8735 on 2017/12/1.
 */

'use strict';

import net from '../../../../d/common/net';
import util from '../../../../d/common/util';
import HotPost from '../../../component/hotpost/HotPost.jsx';

let take = 10;
let skip = take;
let loading;
let loadEnd;

class FavorPost extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    loadEnd = self.props.dataList.Size <= take;
    self.on(migi.Event.DOM, function() {
      let $window = $(window);
      if(!loadEnd) {
        $window.on('scroll', function() {
          self.checkMore($window);
        });
        self.checkMore($window);
      }
    });
  }
  checkMore($window) {
    if(loading || loadEnd) {
      return;
    }
    let self = this;
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
    loading = true;
    let hotPost = self.ref.hotPost;
    hotPost.message = '正在加载...';
    net.postJSON('/api/my/favorPost', { skip, take }, function(res) {
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
    let message;
    if(this.props.dataList.Size <= take && this.props.dataList.Size > 3) {
      message = '已经到底了';
    }
    return <div class="favor-post">
      <ul class="type">
        <li><a href="favor">我收藏的音乐</a></li>
        <li><a href="favorPic">我收藏的图片</a></li>
        <li><span>我收藏的帖子</span></li>
      </ul>
      <HotPost ref="hotPost"
               message={ message }
               data={ this.props.dataList.data }/>
    </div>;
  }
}

export default FavorPost;
