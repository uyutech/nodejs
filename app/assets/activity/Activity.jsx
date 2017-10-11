/**
 * Created by army8735 on 2017/10/11.
 */

'use strict';

import ActivityComment from './ActivityComment.jsx';

class Activity extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  render() {
    return <div class="activity">
      <div class="con" dangerouslySetInnerHTML={ this.props.postData.Content }/>
      <ActivityComment/>
    </div>;
  }
}

export default Activity;
