/**
 * Created by army8735 on 2018/3/27.
 */

'use strict';

import util from '../common/util';

class Author extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.list = self.props.list;
  }
  @bind list
  render() {
    return <div class="mod mod-author">
      <h5>作者</h5>
      <ul>
      {
        (this.list || []).map(function(arr) {
          return <li>
            {
              (arr || []).map(function(item) {
                return <dl>
                  <dt>{ item.name }</dt>
                  {
                    (item.list || []).map(function(author) {
                      if(author.isSettle) {
                        return <dd>
                          <img src={util.autoSsl(util.img48_48_80(author.headUrl))
                            || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png'}/>
                          <span>{ author.name }</span>
                        </dd>;
                      }
                      return <dd>
                        <span>{ author.name }</span>
                      </dd>;
                    })
                  }
                </dl>;
              })
            }
          </li>;
        })
      }
      </ul>
    </div>;
  }
}

export default Author;
