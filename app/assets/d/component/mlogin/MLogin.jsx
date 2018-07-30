/**
 * Created by army8735 on 2017/9/14.
 */

import Passport from './Passport.jsx';

class NeedLogin extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  show() {
    $(this.element).removeClass('fn-hide');
  }
  hide() {
    $(this.element).addClass('fn-hide');
  }
  clickClose() {
    this.hide();
  }
  clickWeibo(e) {
    e.preventDefault();
    location.href = '/oauth/weibo?goto=' + encodeURIComponent(location.href);
  }
  render() {
    return <div class="cp-mlogin fn-hide">
      <div class="c">
        <Passport/>
        <a href="/oauth/weibo" class="weibo" onClick={ this.clickWeibo }>微博登录</a>
        <span class="close" onClick={ this.clickClose }/>
      </div>
    </div>;
  }
}

export default NeedLogin;
