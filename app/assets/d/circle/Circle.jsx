/**
 * Created by army8735 on 2017/11/5.
 */

'use strict';

import Title from './Title.jsx';
import PostList from './PostList.jsx';
import SubPost from './SubPost.jsx';

class Circle extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  render() {
    return <div class="circle fn-clear">
      <Title circleDetail={ this.props.circleDetail }/>
      <div class="main">
        <PostList datas={ this.props.postList }/>
      </div>
      <SubPost ref="subPost" originTo="haha"/>
    </div>;
  }
}

export default Circle;
