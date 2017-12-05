/**
 * Created by army8735 on 2017/12/1.
 */

'use strict';

import util from '../../../d/common/util';
import net from '../../../d/common/net';
import HotPlayList from '../../../d/component/hotplaylist/HotPlayList.jsx';

let take = 30;
let skip = take;
let loading;
let loadEnd;

class Favor extends migi.Component {
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
    let hotPlayList = self.ref.hotPlayList;
    loading = true;
    hotPlayList.message = '正在加载...';
    net.postJSON('/api/my/favor', { skip, take }, function(res) {
      if(res.success) {
        let data = res.data;
        skip += take;
        hotPlayList.appendData(data.data);
        if(skip >= data.Size) {
          loadEnd = true;
          hotPlayList.message = '已经到底了';
        }
        else {
          hotPlayList.message = '';
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
    return <div class="favor">
      <ul class="type">
        <li><span>我收藏的音乐</span></li>
        <li><a href="favorPic">我收藏的图片</a></li>
        <li><a href="favorPost">我收藏的画圈</a></li>
      </ul>
      <HotPlayList ref="hotPlayList"
                   message={ this.props.dataList.Size ? '' : '暂无数据' }
                   dataList={ this.props.dataList.data }/>
    </div>;
  }
}

export default Favor;
