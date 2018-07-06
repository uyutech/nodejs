/**
 * Created by army8735 on 2018/6/29.
 */

'use strict';

import $util from '../../rhyme/common/util';

class Home extends migi.Component {
  constructor(...data) {
    super(...data);
    this.index = 0;
    this.tab = 0;
  }
  @bind index
  @bind tab
  clickIndex(e, vd, tvd) {
    if(this.index === tvd.props.rel) {
      return;
    }
    this.index = tvd.props.rel;
  }
  clickTab(e, vd, tvd) {
    if(this.tab === tvd.props.rel) {
      return;
    }
    this.tab = tvd.props.rel;
  }
  render() {
    let info = this.props.info;
    let originWorks = this.props.originWorks;
    return <div class="home">
      <div class="banner">
        <img src="//zhuanquan.xin/rhymesland/ysjxy/banner.jpg"/>
      </div>
      <div class="wrap">
        <div class="con">
          <ul class="nav fn-clear"
              onClick={ { li: this.clickIndex } }>
            <li class={ 'index' + (this.index === 0 ? ' cur' : '') }
                rel={ 0 }>首页</li>
            <li class={ 'detail' + (this.index === 1 ? ' cur' : '') }
                rel={ 1 }>活动详情</li>
            <li class={ 'works' + (this.index === 2 ? ' cur' : '') }
                rel={ 2 }>参赛作品</li>
            <li class={ 'prize' + (this.index === 3 ? ' cur' : '') }
                rel={ 3 }>获奖作品</li>
          </ul>
          <div class={ this.index === 0 ? '' : 'fn-hide'}>
            <div class="info">
              <h3 class="title">活动简介</h3>
              <pre>{ info.describe }</pre>
            </div>
            <div class="join">
              <h3 class="title">参赛报名</h3>
              <ul class="tab"
                  onClick={ { li: this.clickTab } }>
                <li class={ 'fc' + (this.tab === 0 ? ' cur' : '') }
                    rel={ 0 }>翻唱比赛</li>
                <li class={ 'hh' + (this.tab === 1 ? ' cur' : '') }
                    rel={ 1 }>绘画比赛</li>
              </ul>
              <div class={ 'c' + (this.tab === 0 ? '' : ' fn-hide') }>
                <h4>此刻唱起异世歌谣，下一个大神是你没跑。</h4>
                <p>日常感慨异世大神的歌声余音绕梁？渴望摇身一变成为大神之一？是时候展现你动人的歌喉啦。<br/>
                  异世谣至今已解锁3个篇章，发布15首歌曲。众多歌谣各有美妙，或在于一见倾心洗脑循环，或在于某个瞬间让你无意识地哼起。快来pick你喜欢的异世歌谣，唱给你喜爱的大神~<br/>
                  我们准备了丰厚奖品，更不容错过的是——优胜者有机会成为异世大神中的一员，由官方打造角色曲以及人设图！帮你实现穿越到异世的豪华脑洞！<br/>
                </p>
                <h4>-♦ 参赛方式 ♦-</h4>
                <p>登录异世谣官网 → 点击“异世交响月活动”→ 选择“异世翻唱大赛”→ 点击“我要参赛” → 上传作品并填写相关参赛信息→参赛成功！</p>
                <h4>-♦ 参赛要求 ♦-</h4>
                <p>♦ 翻唱歌曲需为《异世谣》正式出品的歌曲（已在下方列出），请使用异世谣官方提供的歌曲伴奏，自由选择歌曲翻唱。<br/>
                  ♦ 参赛选手需按照原词曲进行翻唱，不得擅自修改唱词和曲调。<br/>
                  ♦ 参赛者可根据自身需求对伴奏进行适当的升降调处理。<br/>
                  ♦ 参赛者需为参与翻唱的歌手本人。<br/>
                  ♦ 比赛允许多人合唱参赛，实体或现金奖品由上传参赛者负责分配。<br/>
                  ♦ 比赛允许一人投稿多首作品，评选时将采用名次最高的作品。<br/>
                  ♦ 为避免不必要的误会或纠纷，请参赛选手保留一份参赛作品的未处理干声。</p>
                <h4>-♦ 异世歌谣 ♦-</h4>
                <ul class="origin fn-clear">
                {
                  originWorks.map((item) => {
                    let work = item.collection[0];
                    for(let i = 1; i < item.collection.length; i++) {
                      let o = item.collection[i];
                      if(o.kind === 2) {
                        work = o;
                        break;
                      }
                    }
                    let accompany;
                    for(let i = 1; i < item.collection.length; i++) {
                      let o = item.collection[i];
                      if(o.type === 3) {
                        accompany = o;
                        break;
                      }
                    }
                    accompany = accompany || work;
                    let author = [];
                    let hash = {};
                    work.author.forEach((item) => {
                      item.list.forEach((item) => {
                        if(!hash[item.id]) {
                          hash[item.id] = true;
                          author.push(item);
                        }
                      });
                    });
                    return <li>
                      <a href={ 'https://circling.cc/works/' + item.id }
                         class="pic"
                         target="_blank">
                        <img src={ $util.img(item.cover || work.cover, 100, 100, 80) || '//zhuanquan.xin/img/blank.png' }/>
                      </a>
                      <div>{ item.title + (item.subTitle ? (' - ' + item.subTitle) : '') }</div>
                      <div>{ author.map((item) => {
                        return <span>{ item.name }</span>;
                      })}</div>
                      <div>
                        <a href={ 'https://circling.cc/works/' + item.id + '/' + work.id }
                           target="_blank">♫原曲</a>
                        <a href={ 'https://circling.cc/works/' + item.id + '/' + accompany.id }
                           target="_blank">♫伴奏</a>
                      </div>
                    </li>;
                  })
                }
                </ul>
              </div>
              <div class={ 'c' + (this.tab === 1 ? '' : ' fn-hide') }>
                <h4>愿用一只平凡画笔，画一出绝伦的异世风情。</h4>
                <p>渴望成为异世谣官方画师为大神设计人设图？希望为新曲绘制插图曲绘？是时候展现真正的技术了（bgm起！
                  相信每个人对人设图都留有一些想象空间。或许你的脑中，鲛人小姐姐穿着超短牛仔裤，狐妖大大带着大金链？请尽情施展才华发挥脑洞，画出你心目中的异世人物插画。
                  我们准备了丰厚奖品，更不容错过的是——优胜者有机会与异世谣官方合作。未来出场的大神由你来描绘！大神的新衣由你来决定！新歌的曲绘由你来完成！</p>
                <h4>-♦ 参赛方式 ♦-</h4>
                <p>登录异世谣官网 → 点击“异世交响月活动”→ 选择“异世绘画大赛”→ 点击“我要参赛” → 上传作品并填写相关参赛信息→参赛成功！</p>
                <h4>-♦ 参赛要求 ♦-</h4>
                <p>♦ 画中人物应为异世谣官方角色（已在下方列出，包括已出场及部分未出场大神，此外，异世作品PV中出现的其他配角形象也可以使用），可根据需要适当改变人物造型(发型、衣着、配饰等)。<br/>
                  ♦ 比赛不限制出现人物数量、背景有无，手绘板绘均可。<br/>
                  ♦ 参赛者需为参与绘制作品的画手本人。<br/>
                  ♦ 比赛允许多人合作参赛，实体或现金奖品由上传参赛者负责分配。<br/>
                  ♦ 比赛允许一人投稿多幅作品，评选时将采用名次最高的作品。<br/>
                  ♦ 为避免不必要的误会或纠纷，请参赛选手保留部分绘制过程中的稿件截图或照片（如草稿、线稿等）。</p>
                <h4>-♦ 异世人设 ♦-</h4>
                <ul class="char fn-clear">
                  <li>
                    <a href="http://rhymesland.com/#charactermuhan"
                       target="_blank">
                      <img src="//zhuanquan.xin/rhymesland/ysjxy/headmuhan.png"/>
                    </a>
                  </li>
                  <li>
                    <a href="http://rhymesland.com/#charactersixia"
                       target="_blank">
                      <img src="//zhuanquan.xin/rhymesland/ysjxy/headsixia.png"/>
                    </a>
                  </li>
                  <li>
                    <a href="http://rhymesland.com/#characterhetu"
                       target="_blank">
                      <img src="//zhuanquan.xin/rhymesland/ysjxy/headhetu.png"/>
                    </a>
                  </li>
                  <li>
                    <a href="http://rhymesland.com/#charactermi"
                       target="_blank">
                      <img src="//zhuanquan.xin/rhymesland/ysjxy/headmi.png"/>
                    </a>
                  </li>
                </ul>
                <ul class="char fn-clear">
                  <li>
                    <a href="http://rhymesland.com/#charactersanwu"
                       target="_blank">
                      <img src="//zhuanquan.xin/rhymesland/ysjxy/headsanwu.png"/>
                    </a>
                  </li>
                  <li>
                    <a href="http://rhymesland.com/#characterajie"
                       target="_blank">
                      <img src="//zhuanquan.xin/rhymesland/ysjxy/headajie.png"/>
                    </a>
                  </li>
                  <li>
                    <a href="http://rhymesland.com/#characteryueqianchen"
                       target="_blank">
                      <img src="//zhuanquan.xin/rhymesland/ysjxy/headyueqianchen.png"/>
                    </a>
                  </li>
                  <li>
                    <a href="http://rhymesland.com/#characterlitterzy"
                       target="_blank">
                      <img src="//zhuanquan.xin/rhymesland/ysjxy/headlitterzy.png"/>
                    </a>
                  </li>
                </ul>
                <ul class="char fn-clear">
                  <li>
                    <a href="http://rhymesland.com/#charactervagary"
                       target="_blank">
                      <img src="//zhuanquan.xin/rhymesland/ysjxy/headvagary.png"/>
                    </a>
                  </li>
                  <li>
                    <a href="http://rhymesland.com/#characterace"
                       target="_blank">
                      <img src="//zhuanquan.xin/rhymesland/ysjxy/headace.png"/>
                    </a>
                  </li>
                  <li>
                    <a href="http://rhymesland.com/#characterpaigu"
                       target="_blank">
                      <img src="//zhuanquan.xin/rhymesland/ysjxy/headpaigu.png"/>
                    </a>
                  </li>
                  <li>
                    <a href="http://rhymesland.com/#charactertazi"
                       target="_blank">
                      <img src="//zhuanquan.xin/rhymesland/ysjxy/headtazi.png"/>
                    </a>
                  </li>
                  <li>
                    <a href="http://rhymesland.com/#characteramuro"
                       target="_blank">
                      <img src="//zhuanquan.xin/rhymesland/ysjxy/headamuro.png"/>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class={ this.index === 1 ? '' : 'fn-hide'}>
            <div class="time">
              <h3 class="title">活动时间</h3>
              <img src="//zhuanquan.xin/rhymesland/ysjxy/time.png"/>
            </div>
            <div class="prize">
              <h3 class="title">奖品设置</h3>
              <img src="//zhuanquan.xin/rhymesland/ysjxy/time.png"/>
            </div>
            <div class="rule">
              <h3 class="title">评审规则</h3>
              <p>♦ 一二三等奖及前途无限奖将根据评委综合评分选出。评判标准会充分考虑整体效果，包括但不限于以下因素：<br/>
                【翻唱比赛】音准、节奏、气息、感情表达、后期效果。<br/>
                【绘画比赛】色彩、线条、构图、创意。<br/>
                ♦ 人气爆棚奖仅考虑作品所得票数，如遇“人气爆棚奖”得主与一二三等奖得主重合，则“人气爆棚奖”得主顺延。</p>
            </div>
            <div class="rater">
              <h3 class="title">比赛评委</h3>
            </div>
            <div class="note">
              <h3 class="title">参赛需知</h3>
              <p>♦ 参赛作品需为《异世谣》相关内容作品，其他不相关作品视为无效投稿。<br/>
                ♦ 本次活动之前录制/绘制的作品可以参加比赛。<br/>
                ♦ 参赛者可提交多份作品，次数不限，但不多次获奖。<br/>
                ♦ 为保证尽量多的参赛者得到奖励，各奖项获奖者者不重复获奖，如遇“人气爆棚奖”得主与一二三等奖得主重合，则“人气爆棚奖”得主顺延。<br/>
                ♦ 参赛者可同时参加翻唱/绘画大赛。<br/>
                ♦ 参赛作品需要画面/声音清晰完整。<br/>
                ♦ 参赛作品由参赛者本人演唱/绘制；严谨抄袭、盗用、剽窃他人作品；不能侵犯他人的知识产权。若有相关行为，经核实后直接取消参赛资格。<br/>
                ♦ 若发现机器刷票等行为，经核实后票数直接清零，情节严重者取消参赛资格。<br/>
                ♦ 作品提交后，则视为作者授权转将作品用于异世谣官方宣传展示。作品获奖后，作者自动授权异世谣官方使用获奖作品。作者不可再授权他方使用。<br/>
                ♦ 奖品按照获奖作品为单位发放于上传作品者。如作品为团队合作，请自行协商奖品的分配。<br/>
                ♦ 本活动系统由转圈App提供，上传参赛作品默认上传到转圈数据库。<br/>
                ♦ 本活动最终解释权归异世谣官方所有。</p>
            </div>
          </div>
          <div class={ this.index === 2 ? '' : 'fn-hide'}>
            <div class="wait"/>
          </div>
          <div class={ this.index === 3 ? '' : 'fn-hide'}>
            <div class="wait"/>
          </div>
        </div>
      </div>
    </div>;
  }
}

export default Home;
