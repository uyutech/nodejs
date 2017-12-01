/**
 * Created by army on 2017/6/18.
 */

'use strict';

let interval;

class Banner extends migi.Component {
  constructor(...data) {
    super(...data);
    this.on(migi.Event.DOM, function() {
      this.addInterval();
    });
  }
  @bind index = 0;
  clickTag(e, vd, tvd) {
    this.index = tvd.props.rel;
    this.setOffset(Math.floor(this.index * $(window).width()));
    this.addInterval();
  }
  setOffset(x) {
    let $list = $(this.ref.list.element);
    $list.css('-moz-transform', 'translateX(-' + x + 'px)');
    $list.css('-webkit-transform', 'translateX(-' + x + 'px)');
    $list.css('transform', 'translateX(-' + x + 'px)');
  }
  addInterval() {
    if(interval) {
      clearInterval(interval);
    }
    let self = this;
    let datas = self.props.dataList;
    interval = setInterval(function() {
      self.index++;
      if(self.index >= datas.length) {
        self.index = datas.length - 1;
      }
      self.setOffset(self.index * $(window).width());
    }, 5000);
  }
  left() {
    let self = this;
    let datas = self.props.dataList;
    self.index++;
    if(self.index >= datas.length) {
      self.index = datas.length - 1;
    }
    self.setOffset(Math.floor(this.index * $(window).width()));
    self.addInterval();
  }
  right() {
    this.index--;
    if(this.index < 0) {
      this.index = 0;
    }
    this.setOffset(Math.floor(this.index * $(window).width()));
    this.addInterval();
  }
  render() {
    let datas = this.props.dataList;
    return <div class="banner" onSwipeLeft={ this.left } onSwipeRight={ this.right }>
      <ul class="list fn-clear" ref="list" style={ 'width:' + datas.length * 100 + '%' }>
        {
          datas.map(function(item) {
            return <li><a href={ item.url } target="_blank"><img src={ item.pic }/></a></li>;
          })
        }
      </ul>
      <ul class="tags" ref="tags" onClick={ { li: this.clickTag } }>
        {
          (this.index, datas).map(function(item, index) {
            return <li class={ index === this.index ? 'cur' : '' } rel={ index }>{ index + 1 }</li>;
          }.bind(this))
        }
      </ul>
    </div>;
  }
}

export default Banner;
