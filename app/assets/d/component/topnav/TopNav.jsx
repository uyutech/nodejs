/**
 * Created by army8735 on 2017/9/20.
 */

import net from '../../common/net';
import util from '../../common/util';

class TopNav extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.isPublic = !!self.props.userInfo.ISOpen;
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
    net.postJSON('/api/my/altSettle', { public: !isPublic }, function(res) {
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
  clickMenu(e, vd, tvd) {
    e.preventDefault();
    let $a = $(tvd.element);
    if(!$a.hasClass('cur')) {
      window.setHash(tvd.props.href);
      $(vd.element).find('.cur').removeClass('cur');
      $a.addClass('cur');
    }
  }
  setCur(i) {
    let $menu = $(this.ref.menu.element);
    $menu.find('a').removeClass('cur');
    if(i !== undefined) {
      $menu.find('a').eq(i).addClass('cur');
    }
  }
  render() {
    let userInfo = this.props.userInfo || {};
    return <div class="cp-topnav">
      <div class="c">
        <a class="logo" href="#/"/>
        <ul class="menu" ref="menu" onClick={ { a: this.clickMenu } }>
          <li><a href="/">发现</a></li>
          <li><a href="/circling">转圈</a></li>
          <li><a href="/follow">关注</a></li>
        </ul>
        <div class="user fn-clear">
          {
            this.props.isLogin && this.props.isAuthor
              ? <span class="public" onClick={ this.clickPublic }>[{ this.isPublic ? '切换到马甲' : '切换到作者身份' }]</span>
              : ''
          }
          <span class={ 'name' + (this.isPublic ? ' public' : '') } onClick={ this.click }>{ (this.isPublic ? userInfo.AuthorName : userInfo.NickName) || '登陆/注册' }</span>
          <img onClick={ this.click } src={ (this.isPublic ? userInfo.AuthorHead_Url : userInfo.Head_Url) || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png' }/>
        </div>
      </div>
    </div>;
  }
}

export default TopNav;
