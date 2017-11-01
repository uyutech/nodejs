/**
 * Created by army8735 on 2017/11/1.
 */

'use strict';

import util from '../../d/common/util';
import net from '../../d/common/net';

let list = [];
let index = 0;

class ImageView extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      let $window = $(window);
      migi.eventBus.on('choosePic', function(l, i) {
        self.show();
        self.top = $window.scrollTop();
        list = l;
        index = i;
        self.data = list[index];
      });
    });
  }
  @bind data = {}
  @bind top = 0
  show() {
    $(this.element).removeClass('fn-hide');
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
  right() {
    if(index) {
      let self = this;
      self.data = list[--index];
    }
  }
  left() {
    if(index < list.length - 1) {
      let self = this;
      self.data = list[++index];
    }
  }
  clickPrev() {
    if(index) {
      let self = this;
      self.data = list[--index];
    }
  }
  clickNext() {
    if(index < list.length - 1) {
      let self = this;
      self.data = list[++index];
    }
  }
  clickClose() {
    this.hide();
  }
  render() {
    return <div class="image-view fn-hide">
      <div class="c" style={ 'top:' + this.top + 'px' } onSwipeLeft={ this.left } onSwipeRight={ this.right }>
        <img src={ util.autoSsl(this.data.FileUrl) || '//zhuanquan.xin/img/blank.png' } style={ 'width:' + this.data.Width + 'px;background-image:url("' + util.autoSsl(util.img__60(this.data.FileUrl)) + '")' }/>
      </div>
      <h3>{ this.data.ItemName }<small>{ this.data.Tips }</small></h3>
      <b class="prev" onClick={ this.clickPrev }/>
      <b class="next" onClick={ this.clickNext }/>
      <b class="close" onClick={ this.clickClose }/>
    </div>;
  }
}

export default ImageView;
