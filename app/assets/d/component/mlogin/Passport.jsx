/**
 * Created by army8735 on 2017/12/29.
 */

'use strict';

import $util from '../../common/util';
import $net from '../../common/net';

let interval;

class Login extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.phone = '';
    self.password = '';
    self.code = '';
    self.count = 0;
    self.visible = false;
    self.forget = false;
  }
  @bind phone
  @bind password
  @bind code
  @bind selReg
  @bind count
  @bind loading
  @bind visible
  @bind forget
  clickSel(e, vd, tvd) {
    let $li = $(tvd.element);
    if($li.hasClass('cur')) {
      return;
    }
    this.selReg = !this.selReg;
  }
  isPhoneValid() {
    return /^1\d{10}$/.test(this.phone);
  }
  isPasswordValid() {
    return this.password.length >= 6;
  }
  isCodeValid() {
    return /^\d{6}$/.test(this.code);
  }
  clickCode() {
    let self = this;
    if(self.count) {
      return;
    }
    if(!self.phone) {
      alert('请填写手机号~');
      return;
    }
    if(!self.isPhoneValid()) {
      alert('手机号不符合要求~');
      return;
    }
    self.count = 60;
    interval = setInterval(function() {
      if(--self.count <= 0) {
        clearInterval(interval);
      }
    }, 1000);
    $net.postJSON('/h5/passport/registerCode', { phone: self.phone }, function(res) {
      if(res.success) {
        alert('验证码已发送，10分钟内有效~');
      }
      else {
        alert(res.message || $util.ERROR_MESSAGE);
      }
    }, function(res) {
      alert(res.message || $util.ERROR_MESSAGE);
    });
  }
  clickCode2() {
    let self = this;
    if(self.count) {
      return;
    }
    if(!self.phone) {
      alert('请填写手机号~');
      return;
    }
    if(!self.isPhoneValid()) {
      alert('手机号不符合要求~');
      return;
    }
    self.count = 60;
    interval = setInterval(function() {
      if(--self.count <= 0) {
        clearInterval(interval);
      }
    }, 1000);
    $net.postJSON('/h5/passport/resetCode', { phone: self.phone }, function(res) {
      if(res.success) {
        alert('验证码已发送，10分钟内有效~');
      }
      else {
        alert(res.message || $util.ERROR_MESSAGE);
      }
    }, function(res) {
      alert(res.message || $util.ERROR_MESSAGE);
    });
  }
  clickLogin() {
    let self = this;
    if(self.loading) {
      return;
    }
    if(!self.phone) {
      alert('请填写手机号~');
      return;
    }
    if(!self.isPhoneValid()) {
      alert('手机号不合法~');
      return;
    }
    if(!self.password) {
      alert('请填写密码~');
      return;
    }
    if(!self.isPasswordValid()) {
      alert('密码长度不符合要求~');
      return;
    }
    self.loading = true;
    $net.postJSON('/api/passport/login', {
      phone: self.phone,
      pw: self.password,
    }, function(res) {
      if(res.success) {
        location.reload(true);
      }
      else {
        alert(res.message || $util.ERROR_MESSAGE);
        self.loading = false;
      }
    }, function(res) {
      alert(res.message || $util.ERROR_MESSAGE);
      self.loading = false;
    });
  }
  clickRegister() {
    let self = this;
    if(self.loading) {
      return;
    }
    if(!self.phone) {
      alert('请填写手机号~');
      return;
    }
    if(!self.isPhoneValid()) {
      alert('手机号不符合要求~');
      return;
    }
    if(!self.password) {
      alert('请填写密码~');
      return;
    }
    if(!self.isPasswordValid()) {
      alert('密码长度不符合要求~');
      return;
    }
    if(!self.code) {
      alert('请填写验证码~');
      return;
    }
    if(!self.isCodeValid()) {
      alert('验证码不符合要求~');
      return;
    }
    self.loading = true;
    let phone = self.phone;
    let password = self.password;
    $net.postJSON('/h5/passport/register', {
      phone,
      pw: password,
      code: self.code,
    }, function(res) {
      if(res.success) {
        jsBridge.login('/h5/passport/login', {
          phone,
          pw: password,
        }, function(res) {
          if(res.success) {
            let data = res.data;
            $.cookie('isLogin', true);
            alert('登录成功');
            jsBridge.setPreference('my', data, function() {
              jsBridge.popWindow({
                login: true,
              });
            });
          }
          else {
            alert(res.message || $util.ERROR_MESSAGE);
            self.loading = false;
          }
        });
      }
      else {
        alert(res.message || $util.ERROR_MESSAGE);
        self.loading = false;
      }
    }, function(res) {
      alert(res.message || $util.ERROR_MESSAGE);
      self.loading = false;
    });
  }
  clickReset() {
    let self = this;
    if(self.loading) {
      return;
    }
    if(!self.phone) {
      alert('请填写手机号~');
      return;
    }
    if(!self.isPhoneValid()) {
      alert('手机号不符合要求~');
      return;
    }
    if(!self.password) {
      alert('请填写密码~');
      return;
    }
    if(!self.isPasswordValid()) {
      alert('密码长度不符合要求~');
      return;
    }
    if(!self.code) {
      alert('请填写验证码~');
      return;
    }
    if(!self.isCodeValid()) {
      alert('验证码不符合要求~');
      return;
    }
    self.loading = true;
    let phone = self.phone;
    let password = self.password;
    $net.postJSON('/h5/passport/reset', {
      phone,
      pw: password,
      code: self.code,
    }, function(res) {
      if(res.success) {
        alert('重设成功，请登录。');
        self.loading = false;
      }
      else {
        alert(res.message || $util.ERROR_MESSAGE);
        self.loading = false;
      }
    }, function(res) {
      alert(res.message || $util.ERROR_MESSAGE);
      self.loading = false;
    });
  }
  render() {
    return <div class="passport">
      <div class={ 'c' + (this.forget ? ' fn-hide' : '') }>
        <ul class="sel"
            onClick={ { li: this.clickSel } }>
          <li class={ this.selReg ? '' : 'cur' }
              rel="login">登录</li>
          <li class={ this.selReg ? 'cur' : '' }
              rel="register">注册</li>
        </ul>
        <div class={ 'login' + (this.selReg ? ' fn-hide' : '') }>
          <div class="line">
            <input type="tel"
                   class="phone"
                   placeholder="请输入手机号"
                   maxlength="11"
                   value={ this.phone }/>
            <b class={ 'clear' + (this.phone ? '' : ' fn-hide') }
               onClick={ function() { this.phone = ''; } }/>
          </div>
          <div class="line">
            <input type={ this.visible ? 'text' : 'password' }
                   class="password"
                   placeholder="请输入密码（至少6位）"
                   maxlength="16"
                   value={ this.password }/>
            <b class={ 'clear' + (this.password ? '' : ' fn-hide') }
               onClick={ function() { this.password = ''; } }/>
            <b class={ 'visible' + (this.visible ? '' : ' invisible') }
               onClick={ function() { this.visible = !this.visible; } }/>
          </div>
          <p class="forget"
             onClick={ function() { this.forget = true; } }>忘记密码</p>
          <button class={ this.loading ? 'dis' : '' }
                  onClick={ this.clickLogin }>登录</button>
        </div>
        <div class={ 'register' + (this.selReg ? '' : ' fn-hide') }>
          <div class="line">
            <input type="tel"
                   class="phone"
                   placeholder="请输入手机号"
                   maxlength="11"
                   value={ this.phone }/>
            <b class={ 'clear' + (this.phone ? '' : ' fn-hide') }
               onClick={ function() { this.phone = ''; } }/>
          </div>
          <div class="line">
            <input type={ this.visible ? 'text' : 'password' }
                   class="password"
                   placeholder="请输入密码（至少6位）"
                   maxlength="16"
                   value={ this.password }/>
            <b class={ 'clear' + (this.password ? '' : ' fn-hide') }
               onClick={ function() { this.password = ''; } }/>
            <b class={ 'visible' + (this.visible ? '' : ' invisible') }
               onClick={ function() { this.visible = !this.visible; } }/>
          </div>
          <div class="line2">
            <input type="tel"
                   class="code"
                   placeholder="请输入验证码"
                   maxlength="6"
                   value={ this.code }/>
            <button class={ this.count ? 'dis' : '' }
                    onClick={ this.clickCode }>{ this.count ? ('还剩' + this.count + '秒') : '发送验证码' }</button>
          </div>
          <button class={ this.loading ? 'dis' : '' }
                  onClick={ this.clickRegister }>注册</button>
        </div>
      </div>
      <div class={ 'c' + (this.forget ? '' : ' fn-hide') }>
        <h5>重置密码<b onClick={ function() { this.forget = false; } }/></h5>
        <div class="line">
          <input type="tel"
                 class="phone"
                 placeholder="请输入手机号"
                 maxlength="11"
                 value={ this.phone }/>
          <b class={ 'clear' + (this.phone ? '' : ' fn-hide') }
             onClick={ function() { this.phone = ''; } }/>
        </div>
        <div class="line">
          <input type={ this.visible ? 'text' : 'password' }
                 class="password"
                 placeholder="请输入密码（至少6位）"
                 maxlength="16"
                 value={ this.password }/>
          <b class={ 'clear' + (this.password ? '' : ' fn-hide') }
             onClick={ function() { this.password = ''; } }/>
          <b class={ 'visible' + (this.visible ? '' : ' invisible') }
             onClick={ function() { this.visible = !this.visible; } }/>
        </div>
        <div class="line2">
          <input type="tel"
                 class="code"
                 placeholder="请输入验证码"
                 maxlength="6"
                 value={ this.code }/>
          <button class={ this.count ? 'dis' : '' }
                  onClick={ this.clickCode2 }>{ this.count ? ('还剩' + this.count + '秒') : '发送验证码' }</button>
        </div>
        <button class={ this.loading ? 'dis' : '' }
                onClick={ this.clickReset }>重设</button>
      </div>
    </div>;
  }
}

export default Login;
