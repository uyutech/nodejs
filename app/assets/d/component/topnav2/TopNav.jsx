/**
 * Created by army8735 on 2018/3/10.
 */

'use strict';

class TopNav extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.isLogin = self.props.isLogin;
    self.isAuthor = self.props.isAuthor;
    self.uname = self.props.uname;
    self.authorName = self.props.authorName;
  }
  @bind isLogin
  @bind isAuthor
  @bind uname
  @bind authorName
  clickLogin(e) {
    e.preventDefault();
    migi.eventBus.emit('NEED_LOGIN');
  }
  render() {
    return <div class="g-top">
      <div class="c">
        <span class="logo">转圈，一个有爱的智能社区~</span>
        <ul>
          <li>
            <a href="/"
                 class="cur">首页</a></li>
          <li>
          {
            this.isLogin
              ? (this.isAuthor ? this.authorName : this.uname)
              : <a href=""
                   class="login"
                   onClick={ this.clickLogin }>登录</a>
          }
          </li>
        </ul>
      </div>
    </div>;
  }
}

export default TopNav;
