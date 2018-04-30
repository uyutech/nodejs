/**
 * Created by army8735 on 2018/3/26.
 */

'use strict';

class Text extends migi.Component {
  constructor(...data) {
    super(...data);
    this.list = this.props.list;
  }
  @bind list
  render() {
    return <ul class={ 'mod mod-text' + ((this.list && this.list.length ? '' : ' fn-hide')) }>
      {
        (this.list || []).map(function(item) {
          return <li>
            <h5>{ item.typeName }</h5>
            <pre>{ item.content }</pre>
          </li>;
        })
      }
    </ul>;
  }
}

export default Text;
