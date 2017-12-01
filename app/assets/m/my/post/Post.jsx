/**
 * Created by army8735 on 2017/12/1.
 */

'use strict';

import net from '../../../d/common/net';
import util from '../../../d/common/util';
import HotPost from '../../component/hotpost/HotPost.jsx';

let take = 10;
let skip = take;
let loading;
let loadEnd;

class Post extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    loadEnd = self.props.postList.Size <= take;
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
    net.postJSON('/api/my/postList', { skip, take }, function(res) {
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
    return <div class="post">
      <h4>我画的圈</h4>
      <HotPost ref="hotPost"
               message={ this.props.postList.Size <= take && this.props.postList.Size > 3 ? '已经到底了' : '' }
               data={ this.props.postList.data }/>
    </div>;
  }
}

export default Post;
