/**
 * Created by army8735 on 2017/10/12.
 */

'use strict';

class SubCmt extends migi.Component {
  constructor(...data) {
    super(...data);
    this.value = this.props.value || '';
    this.invalid = this.value.trim().length < 3;
    this.maxlength = this.props.maxlength;
    this.subText = this.props.subText;
    this.tipText = this.props.tipText;
    this.placeholder = this.props.placeholder;
    this.originTo = this.props.originTo;
    this.readOnly = this.props.readOnly;
  }
  @bind maxlength
  @bind placeholder
  @bind subText
  @bind tipText
  @bind value = ''
  @bind to
  @bind originTo
  @bind invalid = true
  @bind readOnly
  input(e, vd) {
    if(!$CONFIG.isLogin) {
      migi.eventBus.emit('NEED_LOGIN');
    }
    else {
      this.invalid = $(vd.element).val().trim().length < 3;
    }
  }
  focus() {
    if(!window.$CONFIG.isLogin) {
      migi.eventBus.emit('NEED_LOGIN');
    }
    else {
      this.emit('focus');
    }
  }
  click() {
    this.emit('click');
  }
  submit(e) {
    e.preventDefault();
    if(!this.invalid) {
      this.emit('submit', this.value);
    }
  }
  render() {
    return <div class="cp-subcmt">
      <form class={ 'fn-clear' + (this.to || this.originTo ? ' to' : '') } ref="form" onSubmit={ this.submit } onClick={ this.click }>
        <label>TO: { this.to || this.originTo }</label>
        <input type="text" class="text" ref="input" placeholder={ this.to ? '回复' + this.to + '的评论' : this.placeholder || '夸夸这个作品吧' }
               onInput={ this.input } onFocus={ this.focus } maxlength={ this.maxlength || 256 }
               value={ this.value } readonly={ this.readOnly}/>
        <input type="submit"
               class={ 'submit' + (this.invalid ? ' dis' : '') }
               value={ this.value.trim().length
                 ? this.value.trim().length < 3
                   ? this.tipText
                     ? this.tipText.replace('${n}', (3 - this.value.trim().length))
                     : '还少' + (3 - this.value.trim().length) + '个字哦'
                   : this.subText || '发布评论'
                 : this.subText || '发布评论' }/>
      </form>
    </div>;
  }
}

export default SubCmt;
