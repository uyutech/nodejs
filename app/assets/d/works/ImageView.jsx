/**
 * Created by army8735 on 2017/10/19.
 */

'use strict';

import util from '../common/util';

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
        let data = list[index];
        self.url = data.FileUrl;
        self.width = data.Width;
      });
    });
  }
  @bind top = 0
  @bind url
  @bind width = 1
  show() {
    $(this.element).removeClass('fn-hide');
  }
  hide() {
    $(this.element).addClass('fn-hide');
  }
  clickPrev() {
    if(index) {
      let self = this;
      self.url = list[--index].FileUrl;
    }
  }
  clickNext() {
    if(index < list.length - 1) {
      let self = this;
      self.url = list[++index].FileUrl;
    }
  }
  clickClose() {
    this.hide();
  }
  render() {
    return <div class="image-view fn-hide">
      <div class="c" style={ 'top:' + this.top + 'px' }>
        <img src={ this.url || '//zhuanquan.xin/img/blank.png' } style={ 'width:' + this.width + 'px' }/>
      </div>
      <b class="prev" onClick={ this.clickPrev }/>
      <b class="next" onClick={ this.clickNext }/>
      <b class="close" onClick={ this.clickClose }/>
    </div>;
  }
}

export default ImageView;
