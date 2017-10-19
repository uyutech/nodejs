/**
 * Created by army8735 on 2017/10/19.
 */

'use strict';

import Intro from './Intro.jsx';

class Media extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  render() {
    return <div class="mod mod-media">
      <Intro ref="intro" cover={ this.props.cover }/>
    </div>;
  }
}

export default Media;
