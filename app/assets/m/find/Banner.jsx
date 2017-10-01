/**
 * Created by army on 2017/6/18.
 */
 
class Banner extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  render() {
    return <div class="banner" style="background-image:url(http://zhuanquan.xin/pic/e34cc1fb3102e63b507293f6e5a20515.jpg-750_)">
      <a href="/works/2015000000000001"><img src="http://zhuanquan.xin/pic/e34cc1fb3102e63b507293f6e5a20515.jpg-750_"/></a>
    </div>;
  }
}

export default Banner;
