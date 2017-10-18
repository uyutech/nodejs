/**
 * Created by army8735 on 2017/10/10.
 */

'use strict';

class Timeline extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  render() {
    return <div class="mod mod-timeline">
      <ul class="c fn-clear">
        {
          (this.props.datas || []).map(function(item) {
            return <li>
              <span>{ item.Describe }</span>
              <small>{ item.LineDate }</small>
            </li>;
          })
        }
      </ul>
    </div>;
  }
}

export default Timeline;
