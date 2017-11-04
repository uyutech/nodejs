/**
 * Created by army8735 on 2017/9/20.
 */

import net from '../../common/net';
import util from '../../common/util';

class TopNav extends migi.Component {
  constructor(...data) {
    super(...data);
    this.isPublic = !!this.props.userInfo.ISOpen;
  }
  @bind isPublic
  @bind loading
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
    if(!window.$CONFIG.isLogin) {
      migi.eventBus.emit('NEED_LOGIN');
    }
    else {
      location.hash = '/my';
    }
  }
  clickPublic() {
    let self = this;
    if(self.loading) {
      return;
    }
    self.loading = true;
    let isPublic = self.isPublic;
    net.postJSON('/api/user/altSettle', { public: !isPublic }, function(res) {
      if(res.success) {
        self.isPublic = !isPublic;
        $CONFIG.isPublic = !isPublic;
      }
      else {
        alert(res.message || util.ERROR_MESSAGE);
      }
      self.loading = false;
    }, function(res) {
      alert(res.message || util.ERROR_MESSAGE);
      self.loading = false;
    });
  }
  render() {
    let userInfo = this.props.userInfo || {};
    return <div class="cp-topnav">
      <div class="c">
        <a class="logo" href="#/">转圈还在测试中，感谢您的关注和包涵！我们会努力做得更好！</a>
        {/*<form class="search" onSubmit={ this.submit }>*/}
          {/*<input type="text" ref="input" maxlength="16" placeholder="弱弱的初级搜索功能QAQ"/>*/}
        {/*</form>*/}
        <div class="user fn-clear">
          {
            this.props.isLogin && this.props.isAuthor
              ? <span class="public" onClick={ this.clickPublic }>[{ this.isPublic ? '切换到马甲' : '切换到作者身份' }]</span>
              : ''
          }
          <span class={ 'name' + (this.isPublic ? ' public' : '') } onClick={ this.click }>{ (this.isPublic ? userInfo.AuthorName : userInfo.NickName) || '登陆/注册' }</span>
          <img onClick={ this.click } src={ userInfo.Head_Url || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png' }/>
        </div>
      </div>
    </div>;
  }
}

export default TopNav;
