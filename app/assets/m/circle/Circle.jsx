/**
 * Created by army8735 on 2017/11/5.
 */

'use strict';

import Title from './Title.jsx';
import SubCmt from '../../d/component/subcmt/SubCmt.jsx';
import HotPost from '../component/hotpost/HotPost.jsx';

class Circle extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      let subCmt = self.ref.subCmt;
      subCmt.on('click', function() {
        location.href = '/circle/post?circleID=' + $CONFIG.circleID;
      });
    });
  }
  render() {
    return <div class="circle fn-clear">
      <Title circleDetail={ this.props.circleDetail }/>
      <HotPost ref="hotPost" data={ this.props.postList.data } params={ { circleID: this.props.circleDetail.TagID } }/>
      <SubCmt ref="subCmt"
              tipText="-${n}"
              subText="发送"
              readOnly={ true }
              placeholder={ '在' + this.props.circleDetail.TagName +'圈画个圈吧。小小的提示：现在可以把一个圈画在好几个圈子里哦！' }/>
    </div>;
  }
}

export default Circle;
