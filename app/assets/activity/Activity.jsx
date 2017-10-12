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
    return <div class="activity fn-clear">
      <div class="con" dangerouslySetInnerHTML={ this.props.postData.Content }/>
      <ActivityComment ref="activityComment"
                       id={ this.props.id }
                       isLogin={ this.props.isLogin }
                       commentData={ this.props.commentData }/>
    </div>;
  }
}

export default Activity;
