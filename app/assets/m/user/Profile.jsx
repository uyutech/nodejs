/**
 * Created by army8735 on 2017/10/30.
 */

'use strict';

import net from '../../d/common/net';
import util from '../../d/common/util';

let FOLLOW_STATE = {
  1: '- 已关注',
  2: '+ 未关注',
  3: '- 互相关注',
};

class Profile extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.head = self.props.userInfo.Head_Url;
    self.sname = self.props.userInfo.NickName;
    self.sign = self.props.userInfo.User_Sign;
    self.followState = self.props.followState;
  }
  @bind head
  @bind sname
  @bind sign
  @bind followState
  clickFollow() {
    let self = this;
    if(self.followState === 2) {
      net.postJSON('/api/user/follow', { userID: self.props.userInfo.UID }, function(res) {
        if(res.success) {
          self.followState = res.data;
        }
        else {
          alert(res.message || util.ERROR_MESSAGE);
        }
      }, function(res) {
        alert(res.message || util.ERROR_MESSAGE);
      });
    }
    else {
      net.postJSON('/api/user/unFollow', { userID: self.props.userInfo.UID }, function(res) {
        if(res.success) {
          self.followState = res.data;
        }
        else {
          alert(res.message || util.ERROR_MESSAGE);
        }
      }, function(res) {
        alert(res.message || util.ERROR_MESSAGE);
      });
    }
  }
  render() {
    return <div class="profile fn-clear">
      <h4>TA的资料</h4>
      <div class="pic" onClick={ this.clickPic }>
        <img src={ util.autoSsl(util.img200_200_80(this.head)) || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png' }/>
      </div>
      <div class="txt">
        <strong ref="sname">{ this.sname }</strong>
        <p class={ this.sign ? 'sign' : 'sign empty' }>{ this.sign || '暂无签名' }</p>
      </div>
      {
        this.followState
          ? <div class="rel">
            <span class={ 's' + this.followState } onClick={ this.clickFollow }>{ FOLLOW_STATE[this.followState] }</span>
          </div>
          : ''
      }
    </div>;
  }
}

export default Profile;
