/**
 * Created by army8735 on 2017/11/29.
 */

'use strict';

import net from '../../d/common/net';
import util from '../../d/common/util';
import HotPost from '../component/hotpost/HotPost.jsx';
import SubCmt from '../../d/component/subcmt/SubCmt.jsx';

let take = 10;
let skip = take;
let ajax;
let loading;
let loadEnd;

class Circling extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      loadEnd = self.props.postList.Size <= take;
      let $window = $(window);
      $window.on('scroll', function() {
        self.checkMore($window);
      });
      let subCmt = self.ref.subCmt;
      subCmt.on('click', function() {
        location.href = '/circle/post';
      });
    });
  }
  @bind circleID
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
    let hotPost = self.ref.hotPost;
    loading = true;
    hotPost.message = '正在加载...';
    if(ajax) {
      ajax.abort();
    }
    ajax = net.postJSON(self.circleID ? '/api/circle/list' : '/api/circling/list', { skip, take, circleID: self.circleID }, function(res) {
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
  clickTag(e, vd, tvd) {
    let $li = $(tvd.element);
    if(!$li.hasClass('cur')) {
      $(vd.element).find('.cur').removeClass('cur');
      $li.addClass('cur');
      let self = this;
      let hotPost = self.ref.hotPost;
      self.circleID = tvd.props.rel;
      skip = 0;
      loading = true;
      if(ajax) {
        ajax.abort();
      }
      ajax = net.postJSON(self.circleID ? '/api/circle/list' : '/api/circling/list', { skip, take, circleID: self.circleID }, function(res) {
        if(res.success) {
          let data = res.data;
          skip += take;
          hotPost.setData(data.data);
          if(skip >= data.Size) {
            loadEnd = true;
            hotPost.message = '已经到底了';
          }
          else {
            hotPost.message = '';
          }
        }
        else {
          hotPost.setData();
          alert(res.message || util.ERROR_MESSAGE);
        }
        loading = false;
      }, function(res) {
        alert(res.message || util.ERROR_MESSAGE);
        loading = false;
      });
    }
  }
  render() {
    return <div class="circling">
      <ul class="circles" onClick={ { li: this.clickTag } }>
        <li class="cur">全部</li>
        {
          (this.props.hotCircle.data || []).map(function(item, i) {
            return <li rel={ item.TagID }>{ item.TagName }</li>;
          }.bind(this))
        }
      </ul>
      <p class="cinfo">↑未来，这里将可以复选多个圈子一起逛哦↑</p>
      <HotPost ref="hotPost" data={ this.props.postList.data }/>
      <SubCmt ref="subCmt"
              tipText="-${n}"
              subText="发送"
              readOnly={ true }
              placeholder={ '小小的提示：现在可以把一个圈画在好几个圈子里哦！' }/>
    </div>;
  }
}

export default Circling;
