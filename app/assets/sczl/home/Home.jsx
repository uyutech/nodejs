/**
 * Created by army8735 on 2018/8/15.
 */

'use strict';

import $util from "../../d/common/util";

class Home extends migi.Component {
  constructor(...data) {
    super(...data);
    this.index = 0;
  }
  @bind index
  clickTab(e, vd, tvd) {
    if(this.index === tvd.props.rel) {
      return;
    }
    this.index = tvd.props.rel;
  }
  render() {
    let originWorks = this.props.originWorks;
    return <div class="home">
      <div class="c">
        <ul class="tab"
            onClick={ { li: this.clickTab } }>
          <li class={ this.index === 0 ? ' cur' : '' }
              rel={ 0 }>活动介绍</li>
          <li class={ this.index === 1 ? ' cur' : '' }
              rel={ 1 }>作品展示</li>
        </ul>
        <div class={ this.index === 0 ? '' : 'fn-hide' }>
          <h3>活动介绍</h3>
          <p>本次活动是由陕西省文化厅主办、西安曲江新区管理委员会承办，西安曲江国际会展（集团）有限公司负责运营，西安西部文化产业博览会有限公司负责执行，西安墨在文化传媒有限公司协办的古风歌曲翻唱比赛。</p>
          <p>活动以“传唱古风，弘扬丝绸之路文化”为主题，以线上、线下活动相结合的形式，让观众感受到丝绸之路文化的丰富多彩，以及优秀歌曲的审美体验。</p>
          <p>与此同时，也希望能够借此契机发现优秀的本地歌手人才，予以各种歌曲制作补贴和推广渠道，培养出优秀的西安本地古风歌手，表现优秀者更有机会参与各种线下演出，商业合作项目。</p>
          <h3>参赛方式</h3>
          <p>作品征集期间（9月1日至9月31日），登录活动官网→ 选择点击“我要参赛” → 上传作品并填写相关参赛信息→发布微博同时@水墨映像 CINK，带上#新起点，新奇点##2018 西安曲漫#的话题→将伴奏和干音发送至邮箱 17664681@qq.com→参赛成功！</p>
          <h3>奖品设置</h3>
          <p>由评委组筛选出一、二、三等奖、最佳人气奖各一名。</p>
          <p>一等奖 ：1500元歌曲定制</p>
          <p>二等奖 ：800元歌曲定制</p>
          <p>三等奖 ：300元精品后期</p>
          <p>最佳人气奖 ：1000元歌曲定制</p>
          <h3>参赛要求</h3>
          <p>♦ 翻唱歌曲需为下方列出歌曲，请使用官方提供的歌曲伴奏，自由选择歌曲翻唱。</p>
          <p>♦ 参赛选手需按照原词曲进行翻唱，不得擅自修改唱词和曲调。</p>
          <p>♦ 参赛者可根据自身需求对伴奏进行适当的升降调处理。</p>
          <p>♦ 参赛者需为参与翻唱的歌手本人。</p>
          <p>♦ 为避免不必要的误会或纠纷，请参赛选手保留一份参赛作品的未处理干声。</p>
          <ul class="origin fn-clear">
            {
              originWorks.map((item) => {
                if(!item) {
                  return;
                }
                return <li class="fn-clear">
                  <a href={ 'https://circling.cc/works/' + item.id }
                     class="pic"
                     target="_blank">
                    <img src={ $util.img(item.cover, 100, 100, 80) || '//zhuanquan.xin/img/blank.png' }/>
                  </a>
                  <div class="txt">
                    <h5>{ item.title }</h5>
                    <div>{ item.subTitle }</div>
                  </div>
                  <div class="download">
                    <a href={ item.originUrl }
                       target="_blank">♫原曲</a>
                    <a href={ item.accompanyUrl }
                       target="_blank">♫伴奏</a>
                  </div>
                </li>;
              })
            }
          </ul>
          <a href="/sczl/upload" class="upload" target="_blank">我要参赛</a>
        </div>
        <div class={ this.index === 1 ? '' : 'fn-hide' }>
        </div>
      </div>
      <div class="bot">
        <p>主办单位：陕西省文化厅</p>
        <p>承办单位：西安曲江新区管理委员会</p>
        <p>执行单位：西安西部文化产业博览会有限公司</p>
        <p>协办单位：<img class="i1" src="//zhuanquan.xin/img/556656772227caf61a83d42fdfa0c944.png"/></p>
        <p>技术支持：<img class="i2" src="//zhuanquan.xin/img/4bf6a518b9f3ce5efedb1a9c20d546c8.png"/></p>
      </div>
    </div>;
  }
}

export default Home;
