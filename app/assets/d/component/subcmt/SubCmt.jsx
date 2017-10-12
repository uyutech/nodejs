/**
 * Created by army8735 on 2017/10/12.
 */

'use strict';

class SubCmt extends migi.Component {
  constructor(...data) {
    super(...data);
    this.value = this.props.value || '';
    this.hasCommentContent = this.value.trim().length;
    this.maxlength = this.props.maxlength;
    this.subText = this.props.subText;
    this.placeholder = this.props.placeholder;
  }
  @bind hasCommentContent
  @bind isCommentSending
  @bind maxlength
  @bind placeholder
  @bind subText
  @bind value = ''
  input(e, vd) {
    if(!$CONFIG.isLogin) {
      migi.eventBus.emit('NEED_LOGIN');
    }
    else {
      this.hasCommentContent = $(vd.element).val().trim().length;
    }
  }
  focus() {
    if(!window.$CONFIG.isLogin) {
      migi.eventBus.emit('NEED_LOGIN');
    }
  }
  submit(e) {
    e.preventDefault();
    if(this.hasCommentContent) {
      this.emit('submit', this.value);
    }
  }
  render() {
    return <div class="cp-subcmt">
      <form class="fn-clear" ref="form" onSubmit={ this.submit }>
        <input type="text" class="text" ref="input" placeholder={ this.placeholder || '夸夸这个作品吧' }
               onInput={ this.input } onFocus={ this.focus } maxlength={ this.maxlength || 120 }
               value={ this.value }/>
        <input type="submit"
               class={ 'submit' + (this.hasCommentContent && !this.isCommentSending ? '' : ' dis') }
               value={ this.subText || '发布评论' }/>
      </form>
    </div>;
  }
}

export default SubCmt;
