/**
 * Created by army on 2017/7/1.
 */

import util from '../../common/util';

class PlayList extends migi.Component {
  constructor(...data) {
    super(...data);
    this.dataList = this.props.dataList || [];
    this.dataList2 = this.props.dataList2 || [];
  }
  @bind dataList = [];
  @bind dataList2 = [];
  render() {
    return <div class="cp-playlist fn-clear">
      <div class="hot">
        <h4>最热<small>未来还将解锁更多人气数据-3-</small></h4>
        <ul class="list" ref="list">
          {
            this.dataList.map(function(item) {
              return <li>
                <a href={ `/works/${item.WorksID}` } class="pic">
                  <img src={ util.autoSsl(util.img100_100(item.cover_Pic)) || '//zhuanquan.xin/img/blank.png' }/>
                </a>
                <div class="txt" worksId={ item.WorksID || item.WorkID }>
                  <a href={ `/works/${item.WorksID}` } class="name">{ item.Title }</a>
                  <p class="intro">{ item.sub_Title }</p>
                </div>
              </li>;
            })
          }
        </ul>
      </div>
      <div class="new">
        <h4>最新<small>未来会显示更多歌曲信息-3-</small></h4>
        <ul class="list2" ref="list2">
          {
            this.dataList2.map(function(item) {
              return <li>
                <a href={ `/works/${item.WorksID}` } class="pic">
                  <img src={ util.autoSsl(util.img100_100(item.cover_Pic)) || '//zhuanquan.xin/img/blank.png' }/>
                </a>
                <div class="txt" worksId={ item.WorksID || item.WorkID }>
                  <a href={ `/works/${item.WorksID}` } class="name">{ item.Title }</a>
                  <p class="intro">{ item.sub_Title }</p>
                </div>
              </li>;
            })
          }
        </ul>
      </div>
    </div>;
  }
}

export default PlayList;
