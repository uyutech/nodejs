/**
 * Created by army8735 on 2017/9/20.
 */

class TopNav extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  setTop(top) {
    top = Math.min(top, 72);
    $(this.element).css('-webkit-transform', `translateY(${-top}px)`);
    $(this.element).css('transform', `translateY(${-top}px)`);
  }
  setMarginRight(right) {
    $(this.element).css('margin-right', right);
  }
  submit(e) {
    e.preventDefault();
    let v = this.ref.input.element.value.trim();
    if(v) {
      this.emit('search', v);
    }
  }
  click(e) {
    if(window.$CONFIG.isLogin !== 'True') {
      e.preventDefault();
      migi.eventBus.emit('NEED_LOGIN');
    }
  }
  render() {
    return <div class="cp-topnav">
      <a class="logo" href="#/">转圈还在测试中，感谢您的关注和包涵！我们会努力做得更好！</a>
      <form class="search" onSubmit={ this.submit }>
        <input type="text" ref="input" maxlength="16" placeholder="弱弱的初级搜索功能QAQ"/>
      </form>
      <a href="#/my" class="user" onClick={ this.click }>
        <span>{ window.$CONFIG.userName || '登陆/注册' }</span>
        <img src={ window.$CONFIG.userPic || '//zhuanquan.xin/img/f59284bd66f39bcfc70ef62eee10e186.png' }/>
      </a>
    </div>;
  }
}

export default TopNav;
