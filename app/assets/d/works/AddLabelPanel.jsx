/**
 * Created by army8735 on 2017/10/18.
 */

'use strict';

import net from '../common/net';
import util from '../common/util';

let first = true;

class AddLabelPanel extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      let $list = $(self.ref.list.element);
      let $has = $(self.ref.has.element);
      $list.on('click', 'li', function() {
        let $li = $(this);
        let id = $li.attr('rel');
        let name = $li.text();
        if($li.hasClass('cur')) {
          $li.removeClass('cur');
          $has.find(`li[rel="${id}"]`).remove();
        }
        else {
          $li.addClass('cur');
          $has.append(`<li rel="${id}">${name}</li>`);
        }
      });
      $has.on('click', 'li', function() {
        let $li = $(this);
        let id = $li.attr('rel');
        $li.remove();
        $list.find(`li[rel="${id}"]`).removeClass('cur');
      });
    });
  }
  @bind list
  @bind dis
  show() {
    let self = this;
    $(self.element).removeClass('fn-hide');
    if(first) {
      first = false;
      net.postJSON('/api/user/labelList', { worksID: self.props.worksID }, function(res) {
        if(res.success) {
          let data = res.data;
          self.list = data.AllLabel;
          let $list = $(self.ref.list.element);
          let $has = $(self.ref.has.element);
          (data.ChangeLabel || []).forEach(function(item) {
            let id = item.ID;
            let name = item.Tag_Name;
            $list.find(`li[rel="${id}"]`).addClass('cur');
            $has.append(`<li rel="${id}">${name}</li>`);
          });
        }
        else {
          alert(res.message || util.ERROR_MESSAGE);
        }
      }, function(res) {
        alert(res.message || util.ERROR_MESSAGE);
      });
    }
    let parent = window.parent;
    if(parent !== window && parent.upZIndex) {
      parent.upZIndex();
    }
  }
  hide() {
    $(this.element).addClass('fn-hide');
    let parent = window.parent;
    if(parent !== window && parent.downZIndex) {
      parent.downZIndex();
    }
  }
  clickOK() {
    let self = this;
    if(!self.dis) {
      let $has = $(self.ref.has.element);
      let ids = [];
      $has.find('li').each(function(i, li) {
        ids.push($(li).attr('rel'));
      });
      self.dis = true;
      net.postJSON('/api/user/addLabel', { labelID: ids.join(','), worksID: self.props.worksID }, function(res) {
        if(res.success) {}
        else {
          alert(res.message || util.ERROR_MESSAGE);
        }
        self.hide();
        self.dis = false;
      }, function(res) {
        alert(res.message || util.ERROR_MESSAGE);
        self.hide();
        self.dis = false;
      });
    }
  }
  render() {
    return <div class="add-label fn-hide">
      <div class="c">
        <label class="l1">添加标签</label>
        <ul class="list fn-clear" ref="list">
          {
            (this.list || []).map(function(item) {
              return <li rel={ item.ID }>{ item.Tag_Name }</li>;
            })
          }
        </ul>
        <b class="line"/>
        <label class="l2">已选标签</label>
        <ul class="has fn-clear" ref="has"/>
        <button class={ this.dis ? 'dis' : '' } onClick={ this.clickOK }>选好啦！</button>
        <b class="close" onClick={ this.hide }/>
      </div>
    </div>;
  }
}

export default AddLabelPanel;
