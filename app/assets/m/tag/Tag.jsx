/**
 * Created by army8735 on 2017/12/24.
 */

'use strict';

import net from '../../d/common/net';
import util from '../../d/common/util';
import HotPost from '../component/hotpost/HotPost.jsx';
import ImageView from '../post/ImageView.jsx';

let take = 10;
let skip = take;
let loading;
let loadEnd;

class Tag extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      if(self.props.postList.Size > take) {
        let $window = $(window);
        $window.on('scroll', function() {
          self.checkMore($window);
        });
        let hotPost = self.ref.hotPost;
        let imageView = self.ref.imageView;
        imageView.on('clickLike', function(sid) {
          hotPost.like(sid, function(res) {
            imageView.isLike = res.ISLike || res.State === 'likeWordsUser';
          });
        });
      }
    });
  }
  checkMore($window) {
    let self = this;
    let WIN_HEIGHT = $window.height();
    let HEIGHT = $(document.body).height();
    let bool;
    bool = $window.scrollTop() + WIN_HEIGHT + 30 > HEIGHT;
    if(!loading && !loadEnd && bool) {
      self.load();
    }
  }
  load() {
    let self = this;
    let hotPost = self.ref.hotPost;
    loading = true;
    hotPost.message = '正在加载...';
    net.postJSON('/api/tag/list', { skip, take, tag: $CONFIG.tag }, function(res) {
      if(res.success) {
        let data = res.data;
        skip += take;
        hotPost.appendData(data.data);
        if(!data.data.length || data.data.length < take) {
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
    return <div class="tag">
      <h3>#{ this.props.tag }#</h3>
      <HotPost ref="hotPost" data={ this.props.postList.data }/>
      <ImageView ref="imageView"/>
    </div>;
  }
}

export default Tag;
