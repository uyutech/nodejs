/**
 * Created by army8735 on 2017/12/23.
 */

'use strict';

import HotPic from '../component/hotpic/HotPic.jsx';
import util from "../../d/common/util";
import net from "../../d/common/net";

let take = 10;
let skip = take;
let loading;
let loadEnd;
let hidden;
let first = true;

class PicList extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    if(!self.props.hidden) {
      first = false;
      let dataList = self.props.dataList;
      loading = true;
      loadEnd = dataList.Size <= take;
      self.on(migi.Event.DOM, function() {
        let hotPic = self.ref.hotPic;
        hotPic.appendData(dataList.data);
        hotPic.on('poolEnd', function() {
          loading = false;
          hotPic.message = loadEnd ? '已经到底了' : '';
        });
        if(!loadEnd) {
          let $window = $(window);
          $window.on('scroll', function() {
            self.checkMore($window);
          });
        }
      });
    }
  }
  checkMore($window) {
    if(hidden || loading || loadEnd) {
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
    let hotPic = self.ref.hotPic;
    loading = true;
    hotPic.message = '正在加载...';
    net.postJSON('/api/author/picList', { authorID: self.props.authorID, skip, take }, function(res) {
      if(res.success) {
        let data = res.data;
        skip += take;
        if(data.data.length) {
          hotPic.appendData(data.data);
          hotPic.message = '正在渲染图片';
        }
        else {
          hotPic.message = skip >= data.Size ? '已经到底了' : '';
        }
        if(skip >= data.Size) {
          loadEnd = true;
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
  show() {
    let self = this;
    $(self.element).removeClass('fn-hide');
    hidden = false;
    if(first) {
      first = false;
      let hotPic = self.ref.hotPic;
      hotPic.appendData(self.props.dataList.data);
      hotPic.on('poolEnd', function() {
        loading = false;
        hotPic.message = loadEnd ? '已经到底了' : '';
      });
      if(!loadEnd) {
        let $window = $(window);
        $window.on('scroll', function() {
          self.checkMore($window);
        });
      }
    }
  }
  hide() {
    let self = this;
    $(self.element).addClass('fn-hide');
    hidden = true;
  }
  render() {
    return <div class={ 'pic-list' + (this.props.hidden ? ' fn-hide' : '') }>
      <HotPic ref="hotPic"
              message="正在渲染图片..."/>
    </div>;
  }
}

export default PicList;
