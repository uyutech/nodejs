/**
 * Created by army8735 on 2017/10/10.
 */

'use strict';

class Login extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  clickWeibo(e) {
    e.preventDefault();
    let parent = window.parent;
    if(parent !== window && parent.goto) {
      parent.goto('/oauth/weibo');
    }
    else {
      location.href = '/oauth/weibo';
    }
  }
  render() {
    return <div class="login">
      <a href="#" class="weibo" onClick={ this.clickWeibo }>微博登录</a>
    </div>;
  }
}

export default Login;
