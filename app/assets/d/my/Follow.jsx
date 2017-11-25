/**
 * Created by army8735 on 2017/9/22.
 */

'use strict';

import net from '../../d/common/net';
import util from '../../d/common/util';

class Follow extends migi.Component {
  constructor(...data) {
    super(...data);
    this.list = this.props.list;
  }
  @bind list
  render() {
    return <div class="follow">
      <ul class="list fn-clear">
        {
          (this.list || []).map(function(item) {
            return <li>
              <a href={ '/author/' + item.AuthorID } class="pic">
                <img src={ util.autoSsl(util.img120_120_80(item.Head_url)) || '//zhuanquan.xin/head/0d90e4f2e6f7ef48992df6b49f54cf40.png' }/>
              </a>
              <a href="#" class="txt">{ item.AuthorName }</a>
              <div class="info">{ item.FansNumber }粉丝</div>
            </li>;
          })
        }
      </ul>
    </div>;
  }
}

export default Follow;
