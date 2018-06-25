/**
 * Created by army8735 on 2017/9/21.
 */

import $util from '../common/util';

class Author extends migi.Component {
  constructor(...data) {
    super(...data);
    this.list = this.props.list;
  }
  @bind list
  render() {
    return <ul class="mod-author">
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
                          <img src={ $util.img(author.headUrl, 48, 48, 80) || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png' }/>
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
    </ul>;
  }
}

export default Author;
