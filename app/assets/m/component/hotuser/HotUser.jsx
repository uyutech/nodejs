/**
 * Created by army8735 on 2017/11/27.
 */

'use strict';

import util from '../../../d/common/util';

class HotAuthor extends migi.Component {
  constructor(...data) {
    super(...data);
    this.dataList = this.props.dataList;
    this.on(migi.Event.DOM, function() {
      this.autoWidth();
    });
  }
  @bind dataList
  autoWidth() {
    let $list = $(this.ref.list.element);
    let $c = $list.find('.c');
    $c.css('width', '9999rem');
    let $elem = $c.children();
    $c.css('width', $elem.width() + 1);
  }
  render() {
    return <div class="cp-hotuser">
      <div class="list" ref="list">
        <div class="c">
          {
            this.dataList && this.dataList.length
              ? <ul>
                {
                  this.dataList.map(function(item) {
                    return <li>
                      <a href={ `/user/${item.UserID}` } class="pic">
                        <img src={ util.autoSsl(util.img120_120_80(item.User_HeadUrl || '//zhuanquan.xin/img/head/8fd9055b7f033087e6337e37c8959d3e.png')) }/>
                      </a>
                      <a href={ `/user/${item.UserID}` } class="txt">
                        <span class="name">{ item.UserNickName }</span>
                      </a>
                      <div class="info">{ item.followMe ? '互相关注' : '' }</div>
                    </li>;
                  })
                }
              </ul>
              : <div class="empty">{ this.props.empty || '暂无数据' }</div>
          }
        </div>
      </div>
    </div>;
  }
}

export default HotAuthor;