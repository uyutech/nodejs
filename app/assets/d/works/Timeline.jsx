/**
 * Created by army8735 on 2017/10/10.
 */

'use strict';

class Timeline extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  render() {
    return <div class="mod timeline">
      <ul class="c">
        {
          (this.props.datas || []).map(function(item) {
            return <li>{ item.LineDate + ' ' + item.Describe }</li>;
          })
        }
      </ul>
    </div>;
  }
}

export default Timeline;
