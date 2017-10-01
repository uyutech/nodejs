/**
 * Created by army8735 on 2017/9/19.
 */

class TopNav extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  focus() {
    this.emit('focus');
  }
  click() {
    this.submit();
  }
  submit(e) {
    e && e.preventDefault();
    let v = this.ref.input.element.value;
    this.emit('search', v);
  }
  clickUser(e) {
    if(window.$CONFIG.isLogin !== 'True') {
      e.preventDefault();
      migi.eventBus.emit('NEED_LOGIN');
    }
  }
  render() {
    return <div class="top-nav">
      <a href="/" class="logo"/>
      <form class="form" ref="form" onSubmit={ this.submit } action="/search/">
        <input ref="input" type="text" maxlength="16" placeholder="新歌《燃尽人间色发布》" value={ window.$CONFIG.kw || '' } onFocus={ this.focus }/>
      </form>
      <button onClick={ this.click }>确认</button>
      <a href="/my" class="user" onClick={ this.clickUser }>
        <img src={ window.$CONFIG.userPic || '//zhuanquan.xin/img/f59284bd66f39bcfc70ef62eee10e186.png' }/>
      </a>
    </div>;
  }
}

export default TopNav;
