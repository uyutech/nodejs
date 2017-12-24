/**
 * Created by army8735 on 2017/10/10.
 */

'use strict';

import util from '../../d/common/util';

class Poster extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  render() {
    return <div class="mod mod-poster">
      <h5>{ this.props.datas.name }</h5>
      <ul class="c">
        {
          (this.props.datas.value || []).map(function(item) {
            return <li>
              <a href={ item.FileUrl || '//zhuanquan.xin/img/blank.png' } target="_blank">
                <img src={ util.autoSsl(util.img720__80(item.FileUrl)) || '//zhuanquan.xin/img/blank.png' }/>
              </a>
            </li>;
          })
        }
      </ul>
    </div>;
  }
}

export default Poster;
