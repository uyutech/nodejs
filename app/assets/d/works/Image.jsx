/**
 * Created by army8735 on 2018/3/26.
 */

'use strict';

import util from "../../d/common/util";

class Image extends migi.Component {
  constructor(...data) {
    super(...data);
    this.list = this.props.list;
  }
  @bind list
  render() {
    return <ul class={ 'mod mod-image' + ((this.list && this.list.length ? '' : ' fn-hide')) }>
      {
        (this.list || []).map(function(item) {
          return <li>
            <h5>{ item.typeName }</h5>
            <a href={ item.url || '//zhuanquan.xin/img/blank.png' } target="_blank">
              <img src={ util.img(item.url, 720, 0, 80) || '//zhuanquan.xin/img/blank.png' }/>
            </a>
          </li>;
        })
      }
    </ul>;
  }
}

export default Image;
