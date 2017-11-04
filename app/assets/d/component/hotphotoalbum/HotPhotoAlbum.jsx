/**
 * Created by army8735 on 2017/10/17.
 */

'use strict';

import util from '../../common/util';

class HotPhotoAlbum extends migi.Component {
  constructor(...data) {
    super(...data);
    this.dataList = this.props.dataList;
  }
  @bind dataList
  render() {
    return <div class="cp-hotphotoalbum">
      <h4>{ this.props.title }<small>{ '我们会邀请更多作者入驻！也诚邀你在转圈发布作品、交流创作>3<' }</small></h4>
      {
        this.dataList && this.dataList.length
          ? <ul class="list fn-clear">
            {
              this.dataList.map(function(item) {
                return <li>
                  <b class="bg"/>
                  <a href={ `/works/${item.WorksID}` } class="pic">
                    <img src={ util.autoSsl(util.img288_288_80(item.cover_Pic)) || '//zhuanquan.xin/img/blank.png' }/>
                  </a>
                  <a href="#" class="txt">{ item.Title }</a>
                </li>;
              })
            }
          </ul>
          : <div class="empty">暂无数据</div>
      }
    </div>;
  }
}

export default HotPhotoAlbum;
