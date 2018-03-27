/**
 * Created by army8735 on 2018/3/27.
 */

'use strict';

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
                  <dt>{ item.kindName }</dt>
                  {
                    item.list.map(function(author) {
                      return <dd>
                        <img src={ author.headUrl }/>
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
