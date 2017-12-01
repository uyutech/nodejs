/**
 * Created by army8735 on 2017/12/1.
 */

'use strict';

import util from '../../../../d/common/util';
import net from '../../../../d/common/net';
import HotPic from '../../../component/hotpic/HotPic.jsx';

let take = 10;
let skip = take;
let loading;
let loadEnd;

class FavorPic extends migi.Component{
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      let hotPic = self.ref.hotPic;
      hotPic.appendData(self.props.dataList.data);
      hotPic.on('poolEnd', function() {
        if(self.props.dataList.Size > 2) {
          hotPic.message = skip >= self.props.dataList.Size ? '已经到底了' : '';
        }
        else {
          hotPic.message = '';
        }
      });
      let $window = $(window);
      if(!loadEnd) {
        $window.on('scroll', function() {
          self.checkMore($window);
        });
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
    if(loading || loadEnd) {
      return;
    }
    let hotPic = self.ref.hotPic;
    loading = true;
    hotPic.message = '正在加载...';
    net.postJSON('/api/my/favorPic', { skip, take }, function(res) {
      if(res.success) {
        let data = res.data;
        skip += take;
        hotPic.appendData(data.data);
        if(skip >= data.Size) {
          loadEnd = true;
          hotPic.message = '已经到底了';
        }
        else {
          hotPic.message = '正在渲染图片';
        }
      }
      else {
        alert(res.message || util.ERROR_MESSAGE);
      }
    }, function(res) {
      alert(res.message || util.ERROR_MESSAGE);
    });
  }
  render() {
    return <div class="favor-pic">
      <ul class="type">
        <li><a href="favor">我收藏的音乐</a></li>
        <li><span>我收藏的图片</span></li>
        <li><a href="favorPost">我收藏的帖子</a></li>
      </ul>
      <HotPic ref="hotPic" message={ this.props.dataList.Size ? '正在渲染图片' : '暂无数据' }/>
    </div>;
  }
}

export default FavorPic;
