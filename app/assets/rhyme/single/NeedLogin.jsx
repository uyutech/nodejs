/**
 * Created by army8735 on 2017/9/14.
 */

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
  clickLogin(e, vd) {
    e.preventDefault();
    let hash = location.hash.replace(/^#/, '');
    $.cookie('hash', hash);
    setTimeout(function() {
      location.href = vd.props.href;
    }, 100);
  }
  clickClose(e) {
    e.preventDefault();
    this.hide();
  }
  @bind message
  render() {
    return <div class="need-login fn-hide">
      <div class="c">
        <p>{ this.message || '您还没有登录，不能进行相关操作噢~' }</p>
        <p>或选择 <a href={ window.LOGIN_URL } onClick={ this.clickLogin }>立即登录</a></p>
        <a href={ window.LOGIN_URL } onClick={ this.clickLogin } class="weibo"/>
        <a href="#" class="close" onClick={ this.clickClose }/>
      </div>
    </div>;
  }
}

export default NeedLogin;
