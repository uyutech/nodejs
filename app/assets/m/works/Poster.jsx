/**
 * Created by army8735 on 2017/10/10.
 */

'use strict';

import $util from '../common/util';

class Poster extends migi.Component {
  constructor(...data) {
    super(...data);
    this.list = this.props.list;
  }
  @bind list
  @bind visible
  render() {
    return <div class={ 'mod-poster' + (this.visible ? '' : ' fn-hide') }>
      <ul class="c" onClick={ { a: this.click } }>
        {
          (this.list || []).map(function(item) {
            return <li>
              <a href={ item.url } target="_blank">
                <img src={ $util.img(item.url, 750, 0, 80) || '//zhuanquan.xin/img/blank.png' }/>
              </a>
            </li>;
          })
        }
      </ul>
    </div>;
  }
}

export default Poster;
