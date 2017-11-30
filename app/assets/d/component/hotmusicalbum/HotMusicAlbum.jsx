/**
 * Created by army8735 on 2017/9/18.
 */

'use strict';

import util from '../../common/util';

class HotMusicAlbum extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    if(self.props.dataList) {
      self.dataList = self.props.dataList;
    }
  }
  @bind dataList = []
  render() {
    return <div class="cp-hotmusicalbum">
      {
        this.dataList && this.dataList.length
          ? <ul class="list fn-clear">
            {
              this.dataList.map(function(item) {
                return <li>
                  <b class="bg"/>
                  <a href={ `/works/${item.WorksID}` } class="pic">
                    <img src={ util.autoSsl(util.img288_288_80(item.cover_Pic)) || '//zhuanquan.xin/img/blank.png' }/>
                    <span class="num">{ item.Popular || 0 }</span>
                  </a>
                  <a href={ `/works/${item.WorksID}` } class="txt">
                    <span>{ item.Title }</span>
                    <span class="author">{ (item.SingerName || []).join(' ') }</span>
                  </a>
                </li>;
              })
            }
          </ul>
          : <div class="empty">暂无数据</div>
      }
    </div>;
  }
}

export default HotMusicAlbum;
