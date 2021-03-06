/**
 * Created by army8735 on 2018/8/15.
 */

'use strict';

import $net from '../../d/common/net';
import $util from '../../d/common/util';
import Page from '../../d/component/page/Page.jsx';

class Home extends migi.Component {
  constructor(...data) {
    super(...data);
    this.index = 0;
    this.sort = 0;
    this.worksList = this.props.worksList.data;
    this.count = this.props.worksList.count;
  }
  @bind index
  @bind sort
  @bind worksList
  @bind count
  clickIndex(e, vd, tvd) {
    if(this.index === tvd.props.rel) {
      return;
    }
    this.index = tvd.props.rel;
  }
  clickSort(e, vd, tvd) {
    if(this.sort === tvd.props.rel) {
      return;
    }
    this.sort = tvd.props.rel;
  }
  clickVote(e, vd) {
    let el = vd.element;
    if(el.classList.contains('loading')) {
      return;
    }
    if(el.classList.contains('voted')) {
      return;
    }
    let id = vd.props.rel;
    $net.postJSON('/sczl/vote', { id, type: 1, }, function(res) {
      if(res.success) {
        vd.parent.parent.find('.count strong').element.textContent = res.data.count;
      }
      else if(res.code === 1000) {
        location.href = '/oauth/weibo?goto=' + encodeURIComponent(location.href);
      }
      else {
        alert(res.message || $util.ERROR_MESSAGE);
      }
      el.classList.remove('loading');
    }, function(res) {
      alert(res.message || $util.ERROR_MESSAGE);
      el.classList.remove('loading');
    });
  }
  closeQr() {
    this.ref.qr.element.classList.add('fn-hide');
  }
  render() {
    let originWorks = this.props.originWorks;
    return <div class="home">
      <div class="c">
        <ul class="tab"
            onClick={ { li: this.clickIndex } }>
          <li class={ this.index === 0 ? ' cur' : '' }
              rel={ 0 }>活动介绍</li>
          <li class={ this.index === 1 ? ' cur' : '' }
              rel={ 1 }>作品展示</li>
        </ul>
        <div class={ this.index === 0 ? '' : 'fn-hide' }>
          <h3>大赛介绍</h3>
          <p>本次活动是由陕西省文化厅主办、西安曲江新区管理委员会承办，西安曲江国际会展（集团）有限公司负责运营，西安西部文化产业博览会有限公司负责执行，西安墨在文化传媒有限公司协办的古风歌曲翻唱比赛。</p>
          <p>活动以“传唱古风，弘扬丝绸之路文化”为主题，以线上、线下活动相结合的形式，让观众感受到丝绸之路文化的丰富多彩，以及优秀歌曲的审美体验。</p>
          <p>与此同时，也希望能够借此契机发现优秀的本地歌手人才，予以各种歌曲制作补贴和推广渠道，培养出优秀的西安本地古风歌手，表现优秀者更有机会参与各种线下演出，商业合作项目。</p>
          <h3>参赛方式</h3>
          <p>参赛方式的文本修改为：作品征集期间（9月1日至9月31日），登录活动官网→ 选择点击“我要参赛” → 上传作品并填写相关参赛信息→发布微博同时@水墨映像 CINK，带上#新起点，新奇点##2018 西安曲漫#的话题→参赛成功！</p>
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
          <h3>参赛须知</h3>
          <p>♦ 参赛作品需为指定歌曲的翻唱作品，翻唱指定作品以外的歌曲则视为无效作品。</p>
          <p>♦ 参赛者可提交多份作品，次数不限，但不多次获奖。</p>
          <p>♦ 为保证尽量多的参赛者得到奖励，各奖项获奖者者不重复获奖，如遇“最佳人气奖”得主与一二三等奖得主重合，则“最佳人气奖”得主顺延。</p>
          <p>♦ 参赛作品需要音频完整，音质清晰，提供干音。</p>
          <p>♦ 参赛作品由参赛者本人演唱；严禁抄袭、盗用、剽窃他人作品；不能侵犯他人的知识产权。若有相关行为，经核实后直接取消参赛资格。</p>
          <p>♦ 若发现机器刷票等行为，经核实后票数直接清零，情节严重者取消参赛资格。</p>
          <p>♦ 作品提交后，则视为作者授权转将作品用于官方及平台宣传展示。</p>
          <p>♦ 奖品按照获奖作品为单位发放于上传作品者。如作品为团队合作，请自行协商奖品的分配。</p>
          <p>♦ 本活动系统由转圈App提供，上传参赛作品默认上传到转圈数据库。</p>
          <p>♦ 本活动最终解释权归”丝绸之路”国际艺术节主办方及承办方所有。</p>
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
        </div>
        <div class={ this.index === 1 ? '' : 'fn-hide' }>
          <ul class="sort fn-clear"
              onClick={ { li: this.clickSort } }>
            <li class={ this.sort === 0 ? 'cur' : '' }
                rel={ 0 }>最新</li>
            <li class={ this.sort === 1 ? 'cur' : '' }
                rel={ 1 }>最热</li>
          </ul>
          <ul class="fc-list fn-clear"
              onClick={ { '.vote': this.clickVote } }>
            {
              this.worksList.map((item) => {
                let pic = item.user.headUrl;
                item.collection.forEach((item) => {
                  if(item.kind === 3) {
                    pic = item.url;
                  }
                });
                return <li>
                  <a class="pic"
                     href={ '/sczl/single/' + item.id }
                     target="_blank">
                    <img src={ $util.img(pic, 480, 480, 80) }/>
                    <span>No.{ item.id }</span>
                  </a>
                  <div class="txt">
                    <a class="ti"
                       href={ '/ysjxy/fc/' + item.id }
                       target="_blank">{ item.works.title }</a>
                    <p class="er">参赛者：<span>{ item.user.nickname }</span></p>
                    <p class="desc">{ item.works.describe }</p>
                    <p class="count"><strong>{ item.voteCount }</strong>票</p>
                    <div class="btn">
                      <span class="vote"
                            onClick={ this.clickVote }
                            rel={ item.id }>投票</span>
                      <a class="share"
                         href={ 'http://service.weibo.com/share/share.php?url='
                         + encodeURIComponent('https://circling.cc/sczl/single/' + item.id)
                         + '&type=button&language=zh_cn&appkey=2345825162&title='
                         + encodeURIComponent(`#新起点，新奇点##2018 西安曲漫# 我参与了丝绸之路古风歌曲翻唱活动 @水墨映像CINK 投票地址：https://circling.cc/sczl/single/${item.id} 参赛地址：https://circling.cc/sczl`)
                         + '&searchPic=false&style=number' }
                         target="_blank">分享</a>
                    </div>
                  </div>
                </li>;
              })
            }
          </ul>
          <Page index={ 1 }
                total={ Math.ceil(this.count / 10) }
                ref="page"
                on-page={ this.page }/>
        </div>
      </div>
      <div class="bot">
        <p>主办单位：陕西省文化厅</p>
        <p>承办单位：西安曲江新区管理委员会</p>
        <p>执行单位：西安西部文化产业博览会有限公司</p>
        <p>协办单位：<img class="i1" src="//zhuanquan.xin/img/556656772227caf61a83d42fdfa0c944.png"/></p>
        <p>技术支持：<img class="i2" src="//zhuanquan.xin/img/4bf6a518b9f3ce5efedb1a9c20d546c8.png"/></p>
      </div>
      <div class="qr" ref="qr">
        <img src="//zhuanquan.xin/img/205481d2a8cdc3479c6d50856cf639a7.png"/>
        <a href="https://circling.cc/post/494119" target="_blank"/>
        <span onClick={ this.closeQr }/>
      </div>
    </div>;
  }
}

export default Home;
