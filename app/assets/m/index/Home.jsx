/**
 * Created by army8735 on 2018/3/10.
 */

'use strict';

class Home extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  render() {
    return <div class="home">
      <div class="c1">
        <b class="logo"/>
        <div class="qr">
          <img src="//zhuanquan.xin/img/9b9cf29c6971b05194fa5b335343d24c.png"/>
          <a href="https://itunes.apple.com/cn/app/id1331367220" class="ios" target="_blank">IPhone版</a>
          <a href="https://circling.net.cn/android/circling-0.7.2.apk" class="android" target="_blank">Android版</a>
        </div>
        <img src="//zhuanquan.xin/img/cf6b823932862acac0c05fdca15b24c8.png" class="i1"/>
      </div>
      <div class="c2">
        <h3>超全内容</h3>
        <p>只需一个APP<br/>网罗音乐、视频、绘画等超多类型二次元作品</p>
        <img src="//zhuanquan.xin/img/f55f48a74eb7a894bbbefa99ea6533a1.png" class="i2"/>
      </div>
      <div class="c2">
        <h3>精准推送</h3>
        <p>只需一点时间<br/>呈现给你最喜欢的内容</p>
        <img src="//zhuanquan.xin/img/8cfaa3f16b3592b4d01529ab43ca3283.png" class="i2"/>
      </div>
      <div class="c2">
        <h3>最新动态</h3>
        <p>不需各处蹲点<br/>自动通知你最最关注的动态</p>
        <img src="//zhuanquan.xin/img/09e0b1cbdd80bc98ee72b92b6d6191a0.png" class="i2"/>
      </div>
      <div class="c2">
        <h3>智能关联</h3>
        <p>不需繁琐搜索<br/>让你方便地跳转到各种感兴趣的相关内容</p>
        <img src="//zhuanquan.xin/img/76874e76f3caa41060f0432a0126779c.png" class="i2"/>
      </div>
    </div>;
  }
}

export default Home;
