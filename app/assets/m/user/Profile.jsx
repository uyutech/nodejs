/**
 * Created by army8735 on 2017/10/30.
 */

'use strict';

import net from '../../d/common/net';
import util from '../../d/common/util';

class Profile extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.head = self.props.userInfo.Head_Url;
    self.sname = self.props.userInfo.NickName;
  }
  @bind head
  @bind sname
  render() {
    return <div class="profile fn-clear">
      <h4>TA的资料</h4>
      <div class="pic" onClick={ this.clickPic }>
        <img src={ util.autoSsl(util.img200_200_80(this.head)) || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png' }/>
      </div>
      <div class="txt">
        <strong ref="sname">{ this.sname }</strong>
      </div>
    </div>;
  }
}

export default Profile;
