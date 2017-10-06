/**
 * Created by army on 2017/6/18.
 */
 
class Banner extends migi.Component {
  constructor(...data) {
    super(...data);
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
        url: '//rhymesland.com/',
        pic: '//zhuanquan.xin/pic/7dc30aca98d4975fd6c3a5b23d1abf8d.jpg'
      }
    ];
    let n = Math.floor(Math.random() * 3);
    this.data = datas[n];
  }
  render() {
    return <div class="banner">
      <a href={ this.data.url } target="_blank"><img src={ this.data.pic }/></a>
    </div>;
  }
}

export default Banner;
