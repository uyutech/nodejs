/**
 * Created by army8735 on 2017/11/9.
 */

'use strict';

class SubPost extends migi.Component {
  constructor(...data) {
    super(...data);
    this.value = this.props.value || '';
    this.invalid = this.value.trim().length < 3;
    this.maxlength = this.props.maxlength;
    this.subText = this.props.subText;
    this.tipText = this.props.tipText;
    this.placeholder = this.props.placeholder;
    this.originTo = this.props.originTo;
  }
  @bind maxlength
  @bind placeholder
  @bind subText
  @bind tipText
  @bind value = ''
  @bind to
  @bind originTo
  @bind invalid = true
  @bind expand
  @bind num = 0
  input(e, vd) {
    this.num = $(vd.element).val().length;
    if(!$CONFIG.isLogin) {
      // migi.eventBus.emit('NEED_LOGIN');
    }
    else {
      this.num = $(vd.element).val().length;
      this.invalid = $(vd.element).val().trim().length < 3;
    }
  }
  focus() {this.expand = true;return;
    if(!window.$CONFIG.isLogin) {
      migi.eventBus.emit('NEED_LOGIN');
    }
    else {
      this.expand = true;
    }
  }
  submit(e) {
    e.preventDefault();
    if(!this.invalid) {
      this.emit('submit', this.value);
    }
  }
  blur() {
    this.expand = false;
  }
  render() {
    return <div class={ 'mod-sub' + (this.expand ? ' expand' : ' expand') }>
      <div class="c">
        <form class={ 'fn-clear' + (this.to || this.originTo ? ' to' : '') } ref="form" onSubmit={ this.submit }>
          <label>TO: { this.to || this.originTo }</label>
          <textarea class="text" ref="input"
                    placeholder={ this.to ? '回复' + this.to + '的评论' : this.placeholder || '夸夸这个作品吧' }
                    onInput={ this.input } onFocus={ this.focus } maxlength={ this.maxlength || 256 }
                    onBlur={ this.blur } value={ this.value }/>
          <span class="limit">{ this.num + ' / 144' }</span>
          <button class="upload">shangtu</button>
          <input type="submit"
                 class={ 'submit' + (this.invalid ? ' dis' : '') }
                 value={ this.value.trim().length
                   ? this.value.trim().length < 3
                     ? this.tipText
                       ? this.tipText.replace('${n}', (3 - this.value.trim().length))
                       : '还少' + (3 - this.value.trim().length) + '个字哦'
                     : this.subText || '发布'
                   : this.subText || '发布评论' }/>
        </form>
      </div>
    </div>;
  }
}

export default SubPost;
