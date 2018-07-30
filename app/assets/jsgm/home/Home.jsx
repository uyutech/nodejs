/**
 * Created by army8735 on 2018/7/9.
 */

'use strict';

import $util from '../../d/common/util';
import Nav from '../common/Nav.jsx';

class Home extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  @bind isPlaying
  play() {
    this.isPlaying = true;
    this.ref.video.element.play();
  }
  toggle() {
    let video = this.ref.video.element;
    if(this.isPlaying) {
      video.pause();
    }
    else {
      video.play();
    }
    this.isPlaying = !this.isPlaying;
  }
  render() {
    return <div class="home">
      <a name="head"/>
      <Nav index={ 0 }/>
      <div class="ad fn-clear">
        <div class="video">
          <video ref="video"
                 preload="meta"
                 poster={ $util.img('//zhuanquan.xin/img/f6fb046cb383fbc76f81d7444b658791.jpg', 0, 0, 60) }
                 autoplay={ this.isPlaying ? true : false }
                 controls="controls"
                 playsinline="true"
                 webkit-playsinline="true"
                 onClick={ this.toggle }
                 src="//zhuanquan.net.cn/video/2619d2bcfa10fa236f14886c8e9bbb58.mp4"/>
        </div>
        <div class="ma">
          <div class="ewm">
            <p>扫一扫<br/>关注《今时古梦》</p>
            <img src="//zhuanquan.xin/img/9e1bfdea360d2bbb56b2fdff99390eb0.png"/>
          </div>
          <a href="/jsgm/join" class="join">点击参赛</a>
        </div>
      </div>
      <h3 class="ti">企划介绍</h3>
      <p class="txt">《今时古梦》是转圈社区出品的大型开放式历史文化创作企划，展现形式包括音乐、配音、视频、绘画、文学、科普等。<br/>
        企划将以“前朝浅记”、“今城新谈”双维度同步进行，沿着中华文明的历史变迁、朝代更迭的轨迹，从前朝历史、风流人物、古代文学艺术、民俗传说以及城市风貌、旅游文化等多方面为你呈现一个多元化的中华文明发展历程。<br/>
        企划将携手诸多人气歌手，知名配音演员以及优秀音乐制作人、词作人、画师、视频制作师，共同创作多元化的网络作品。</p>
      <h3 class="ti">活动介绍</h3>
      <p class="txt">今时起长歌，古梦旧千秋。<br/>
        《今时古梦》企划“词作招募令”现在发出！<br/>
        诚邀热爱历史文化的各位词作加入我们，探索华夏千年文化、寻根中华古旧城池。<br/>
        不仅准备了千元现金大奖、丰厚礼包等你拿，更有机会与《今时古梦》创作组亲密合作！</p>
      <h3 class="ti">参赛方式</h3>
      <p class="txt">◆ 准备参赛作品→登录活动官网→点击“点击参赛”→上传作品并填写相关信息→参赛成功。<br/>
        ◆ 作品需为一篇完整词作，主题需与朝代历史或城市文化相关，叙事、抒情、截取历史故事缩影、概述城市风土人情等皆可，风格不限。与主题不符的作品将视为无效作品。<br/>
        ◆ 为避免比赛中产生不必要的质疑和纠纷，请所有参赛选手保留作品初稿。</p>
      <a href="/jsgm/join" class="join">点击参赛</a>
      <div class="qr">
        <img src="//zhuanquan.xin/img/205481d2a8cdc3479c6d50856cf639a7.png"/>
        <a href="https://circling.cc/post/494119" target="_blank"/>
      </div>
    </div>;
  }
}

export default Home;
