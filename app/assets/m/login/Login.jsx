/**
 * Created by army8735 on 2017/10/27.
 */

'use strict';

class Login extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  render() {
    return <div class="login">
      <a href="/oauth/weibo" class="weibo" onClick={ this.clickWeibo }>微博登录</a>
    </div>;
  }
}

export default Login;
