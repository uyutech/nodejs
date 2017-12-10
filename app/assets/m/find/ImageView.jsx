/**
 * Created by army8735 on 2017/11/28.
 */

'use strict';

import util from '../../d/common/util';

class ImageView extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.dataList = self.props.dataList || [];
    self.isLike = self.props.isLike;
    self.on(migi.Event.DOM, function() {
      let $window = $(window);
      migi.eventBus.on('choosePic', function(dataList, i, isLike, sid) {
        self.dataList = dataList;
        self.idx = i;
        self.isLike = isLike;
        self.sid = sid;
        self.show();
        self.tops = $window.scrollTop();
      });
    });
  }
  @bind dataList = []
  @bind idx = 0
  @bind tops = 0
  @bind isLike
  @bind sid
  show() {
    $(this.element).removeClass('fn-hide');
  }
  hide() {
    $(this.element).addClass('fn-hide');
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
        <img src={ this.dataList && this.dataList[this.idx]
          ? util.autoSsl(util.img720__80(this.dataList[this.idx].FileUrl)) || '//zhuanquan.xin/img/blank.png'
          : '//zhuanquan.xin/img/blank.png' }/>
        <ul class="btn">
          <li class="download">
            <a href={ this.dataList && this.dataList[this.idx]
              ? this.dataList[this.idx].FileUrl
              : ''}
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
