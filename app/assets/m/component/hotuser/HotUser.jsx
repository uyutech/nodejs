/**
 * Created by army8735 on 2017/11/27.
 */

'use strict';

import util from '../../../d/common/util';

class HotAuthor extends migi.Component {
  constructor(...data) {
    super(...data);
    this.dataList = this.props.dataList;
  }
  @bind dataList
  render() {
    return <div class="cp-hotuser">
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
            {
              this.props.more
                ? <li class="more"><a href={ this.props.more }>查看更多</a></li>
                : ''
            }
          </ul>
          : <div class="empty">{ this.props.empty || '暂无数据' }</div>
      }
    </div>;
  }
}

export default HotAuthor;