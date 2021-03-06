/**
 * Created by army8735 on 2017/11/28.
 */

'use strict';

import util from '../common/util';

class ImageView extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.dataList = self.props.dataList || [];
    self.isLike = self.props.isLike;
    self.on(migi.Event.DOM, function() {
      let $window = $(window);
      migi.eventBus.on('choosePic', function(dataList, i) {
        self.dataList = dataList;
        self.idx = i;
        self.show();
        self.tops = $window.scrollTop();
      });
    });
  }
  @bind dataList = []
  @bind idx = 0
  @bind tops = 0
  @bind isLike
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
    let self = this;
    if(self.idx) {
      self.idx--;
    }
  }
  clickNext() {
    let self = this;
    if(self.idx < self.dataList.length - 1) {
      self.idx++;
    }
  }
  clickClose() {
    this.hide();
  }
  clickDownload(e) {
    if(!$CONFIG.isLogin) {
      e.preventDefault();
      migi.eventBus.emit('NEED_LOGIN');
    }
  }
  render() {
    return <div class="mod-iv fn-hide">
      <div class="c" style={ 'top:' + this.tops + 'px' }>
        <img src={ this.dataList[this.idx] || '//zhuanquan.xin/img/blank.png' }/>
        <ul class="btn">
          <li class="download">
            <a href={ util.img(this.dataList[this.idx] || '#') }
               target="_blank"
               onClick={ this.clickDownload }/>
          </li>
        </ul>
      </div>
      <b class="prev" onClick={ this.clickPrev }/>
      <b class="next" onClick={ this.clickNext }/>
      <b class="close" onClick={ this.clickClose }/>
    </div>;
  }
}

export default ImageView;
