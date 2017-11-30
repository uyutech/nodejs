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

class Circling extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      self.loadEnd = self.props.postList.Size <= take;
      let $window = $(window);
      $window.on('scroll', function() {
        self.checkMore($window);
      });
      self.autoWidth();
      let subCmt = self.ref.subCmt;
      subCmt.on('click', function() {
        location.href = '/circle/post';
      });
    });
  }
  @bind loading
  @bind loadEnd
  @bind circleID
  autoWidth() {
    let $list = $(this.ref.circles.element);
    let $c = $list.find('.c');
    $c.css('width', '9999rem');
    let $elem = $c.children();
    $c.css('width', $elem.width() + 1);
  }
  checkMore($window) {
    let self = this;
    let WIN_HEIGHT = $window.height();
    let HEIGHT = $(document.body).height();
    let bool;
    bool = $window.scrollTop() + WIN_HEIGHT + 30 > HEIGHT;
    if(!self.loading && !self.loadEnd && bool) {
      self.load();
    }
  }
  load() {
    let self = this;
    if(self.loading) {
      return;
    }
    let hotPost = self.ref.hotPost;
    self.loading = true;
    hotPost.message = '正在加载...';
    if(ajax) {
      ajax.abort();
    }
    ajax = net.postJSON(self.circleID ? '/api/circle/list' : '/api/circling/list', { skip, take, circleID: self.circleID }, function(res) {
      if(res.success) {
        let data = res.data;
        skip += take;
        hotPost.appendData(data.data);
        if(!data.data.length || data.data.length < take) {
          self.loadEnd = true;
          hotPost.message = '已经到底了';
        }
        else {
          hotPost.message = '';
        }
      }
      else {
        alert(res.message || util.ERROR_MESSAGE);
      }
      self.loading = false;
    }, function(res) {
      alert(res.message || util.ERROR_MESSAGE);
      self.loading = false;
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
      self.loading = true;
      if(ajax) {
        ajax.abort();
      }
      ajax = net.postJSON(self.circleID ? '/api/circle/list' : '/api/circling/list', { skip, take, circleID: self.circleID }, function(res) {
        if(res.success) {
          let data = res.data;
          skip += take;
          hotPost.setData(data.data);
          if(data.Size <= take) {
            self.loadEnd = true;
            hotPost.message = '已经到底了';
          }
          else {
            self.loadEnd = false;
            hotPost.message = '';
          }
        }
        else {
          hotPost.setData();
          alert(res.message || util.ERROR_MESSAGE);
        }
        self.loading = false;
      }, function(res) {
        alert(res.message || util.ERROR_MESSAGE);
        self.loading = false;
      });
    }
  }
  render() {
    return <div class="circling">
      <div class="circles" ref="circles">
        <div class="c">
          <ul onClick={ { li: this.clickTag } }>
            <li class="cur">全部</li>
            {
              (this.props.hotCircle.data || []).map(function(item, i) {
                return <li rel={ item.TagID }>{ item.TagName }</li>;
              }.bind(this))
            }
          </ul>
        </div>
      </div>
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
