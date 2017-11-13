/**
 * Created by army8735 on 2017/9/14.
 */

class NeedLogin extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  @bind message
  show() {
    $(this.element).removeClass('fn-hide');
    parent.upZIndex && parent.upZIndex();
  }
  hide() {
    $(this.element).addClass('fn-hide');
    parent.downZIndex && parent.downZIndex();
  }
  clickClose(e) {
    e.preventDefault();
    this.hide();
  }
  clickWeibo(e) {
    e.preventDefault();
    e.stopPropagation();
    parent.downZIndex && parent.downZIndex();
    if(parent !== window && parent.goto) {
      parent.goto('/oauth/weibo?goto=' + encodeURIComponent(location.href));
    }
    else {
      location.href = '/oauth/weibo?goto=' + encodeURIComponent(location.href);
    }
  }
  render() {
    return <div class="cp-mlogin fn-hide">
      <div class="c">
        <h3>还没有登录哦~</h3>
        <p>{ this.message || '点击下方微博登录按钮登录或注册~' }</p>
        <a href="/oauth/weibo" class="weibo" onClick={ this.clickWeibo }>微博登录</a>
        <a href="#" class="close" onClick={ this.clickClose }/>
      </div>
    </div>;
  }
}

export default NeedLogin;
