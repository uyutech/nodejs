/**
 * Created by army8735 on 2017/10/30.
 */

'use strict';

import util from '../../../d/common/util';

class HotCircle extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    if(self.props.dataList) {
      self.dataList = self.props.dataList;
    }
    self.on(migi.Event.DOM, function() {
      self.autoWidth();
    });
  }
  @bind dataList = []
  autoWidth() {
    let $list = $(this.ref.list.element);
    let $c = $list.find('.c');
    $c.css('width', '9999rem');
    let $ul = $c.find('ul');
    $c.css('width', $ul.width() + 1);
  }
  render() {
    return <div class="cp-hotcircle">
      <div class="list" ref="list">
        <div class="c">
          {
            this.dataList && this.dataList.length
              ? <ul>
                {
                  this.dataList.map(function(item) {
                    return <li>
                      <a href={ `/circle/${item.TagID}` } class="pic">
                        <img src={ util.autoSsl(util.img288_288_80(item.TagCover)) || '//zhuanquan.xin/img/blank.png' }/>
                      </a>
                      <a href={ `/circle/${item.TagID}` } class="txt">
                        <span class="name">{ item.TagName }</span>
                        <span class="fans">成员 { util.abbrNum(item.FansNumber) }</span>
                        <span class="comment">画圈 { util.abbrNum(item.Popular) }</span>
                      </a>
                    </li>;
                  })
                }
              </ul>
              : <div class="empty"/>
          }
        </div>
      </div>
    </div>;
  }
}

export default HotCircle;
