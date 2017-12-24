/**
 * Created by army8735 on 2017/11/5.
 */

'use strict';

import net from '../../d/common/net';
import util from '../../d/common/util';
import Title from './Title.jsx';
import SubCmt from '../../d/component/subcmt/SubCmt.jsx';
import HotPost from '../component/hotpost/HotPost.jsx';
import ImageView from '../post/ImageView.jsx';

let take = 10;
let skip = take;
let loading;
let loadEnd;

class Circle extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      let subCmt = self.ref.subCmt;
      subCmt.on('click', function() {
        location.href = '/circle/post?circleID=' + $CONFIG.circleID;
      });
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
    net.postJSON('/api/circle/list', { skip, take, circleID: $CONFIG.circleID }, function(res) {
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
    return <div class="circle fn-clear">
      <Title circleDetail={ this.props.circleDetail }/>
      {
        this.props.stick && this.props.stick.Size
          ? <HotPost ref="hotPost" data={ this.props.stick.data }/>
          : ''
      }
      <HotPost ref="hotPost" data={ this.props.postList.data }/>
      <SubCmt ref="subCmt"
              tipText="-${n}"
              subText="发送"
              readOnly={ true }
              placeholder={ '在' + this.props.circleDetail.TagName +'圈画个圈吧。小小的提示：现在可以把一个圈画在好几个圈子里哦！' }/>
      <ImageView ref="imageView"/>
    </div>;
  }
}

export default Circle;
