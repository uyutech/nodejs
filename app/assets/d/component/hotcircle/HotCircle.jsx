/**
 * Created by army8735 on 2017/11/12.
 */

'use strict';

import util from '../../common/util';

class HotCircle extends migi.Component {
  constructor(...data) {
    super(...data);
    this.dataList = this.props.dataList || [];
  }
  @bind dataList = []
  render() {
    return <div class="cp-hotcircle">
      <h4>{ this.props.title }<small>{ '未来会根据你的口味进行精准智能的推送！>3<' }</small></h4>
      {
        this.dataList && this.dataList.length
          ? <ul class="list fn-clear">
            {
              this.dataList.slice(0, 6).map(function(item) {
                return <li>
                  <a href={ `/circle/${item.TagID}` } class="pic">
                    <img src={ util.autoSsl(util.img288_288_80(item.TagCover)) || '//zhuanquan.xin/img/blank.png' }/>
                  </a>
                  <a href={ `/circle/${item.TagID}` } class="txt">
                    <span class="name">{ item.TagName }</span>
                    <span class="fans">{ item.FansNumber || 0 }</span>
                    <span class="comment">{ item.Popular || 0 }</span>
                  </a>
                </li>;
              })
            }
          </ul>
          : <div class="empty"/>
      }
    </div>;
  }
}

export default HotCircle;
