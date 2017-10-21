/**
 * Created by army8735 on 2017/10/19.
 */

'use strict';

import util from '../common/util';
import net from '../common/net';

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
        let data = self.data = list[index];
        self.url = data.FileUrl;
        self.width = data.Width;
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
      <div class="c" style={ 'top:' + this.top + 'px' }>
        <b class="bg" style={ 'height:' + this.data.Height + 'px;background-image:url("' + util.autoSsl(util.img__60(this.data.FileUrl)) + '");background-size:' + this.data.Width + 'px auto;' }/>
        <img src={ util.autoSsl(this.data.FileUrl) || '//zhuanquan.xin/img/blank.png' } style={ 'width:' + this.data.Width + 'px' }/>
      </div>
      <h3>{ this.data.ItemName }<small>{ this.data.Tips }</small></h3>
      <b class="prev" onClick={ this.clickPrev }/>
      <b class="next" onClick={ this.clickNext }/>
      <b class="close" onClick={ this.clickClose }/>
    </div>;
  }
}

export default ImageView;
