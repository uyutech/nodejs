/**
 * Created by army8735 on 2017/10/9.
 */

'use strict';

import util from '../common/util';

class InspComment extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  render() {
    return <ul class="insp">
      {
        (this.props.commentData || []).map(function(item) {
          return <li>
            <div class="t">
              <div class="profile fn-clear">
                <img class="pic" src={ item.Head_Url || '//zhuanquan.xin/img/blank.png' }/>
                <div class="txt">
                  <div>
                    <span class="name">{ item.AuthorName }</span>
                    <small class="time">{ util.formatDate(item.LineDate) }</small>
                  </div>
                  <p>{ item.sign }</p>
                </div>
              </div>
            </div>
            <div class="c">
              <pre>{ item.Content }<span class="placeholder"/></pre>
            </div>
          </li>;
        })
      }
    </ul>;
  }
}

export default InspComment;
