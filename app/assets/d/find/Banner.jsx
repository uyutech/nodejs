/**
 * Created by army on 2017/6/18.
 */

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
      if(self.index >= 3) {
        self.index = 0;
      }
      self.setOffset(self.index * 1000);
    }, 5000);
  }
  render() {
    let datas = [
      {
        url: '/works/2015000000000001',
        pic: '//zhuanquan.xin/pic/e34cc1fb3102e63b507293f6e5a20515.jpg'
      },
      {
        url: '/works/2015000000000002',
        pic: '//zhuanquan.xin/pic/b1284084f38e8cac0c35eddd60948af1.jpg'
      },
      {
        url: 'http://weibo.com/6284548625/FrrsUbDyo',
        pic: '//zhuanquan.xin/pic/7dc30aca98d4975fd6c3a5b23d1abf8d.jpg'
      }
    ];
    return <div class="banner">
      <ul class="list fn-clear" ref="list">
        {
          datas.map(function(item) {
            return <li><a href={ item.url } target="_blank"><img src={ item.pic }/></a></li>;
          })
        }
      </ul>
      <ul class="tags" ref="tags" onClick={ this.clickTag }>
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
