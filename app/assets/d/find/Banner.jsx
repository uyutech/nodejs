/**
 * Created by army on 2017/6/18.
 */

let interval;
let datas = [
  {
    url: '/works/2015000000001582',
    pic: '//zhuanquan.xin/pic/3fc9dc8f4aa54ccfae45294dd689e820.jpg'
  },
  {
    url: '/works/2015000000001368',
    pic: '//zhuanquan.xin/pic/379af10b78315ded5948e813d2e64a69.jpg'
  },
  {
    url: '/works/2015000000000001',
    pic: '//zhuanquan.xin/pic/e34cc1fb3102e63b507293f6e5a20515.jpg'
  },
  {
    url: '/works/2015000000000002',
    pic: '//zhuanquan.xin/pic/b1284084f38e8cac0c35eddd60948af1.jpg'
  }
];

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
    this.setOffset(Math.floor(this.index * 1000));
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
    interval = setInterval(function() {
      self.index++;
      if(self.index >= datas.length) {
        self.index = datas.length - 1;
      }
      self.setOffset(self.index * 1000);
    }, 5000);
  }
  render() {
    return <div class="banner">
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
