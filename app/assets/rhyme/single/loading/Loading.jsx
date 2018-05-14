/**
 * Created by army8735 on 2017/8/26.
 */

class Loading extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  show() {
    $(this.element).removeClass('fn-hide');
  }
  hide() {
    $(this.element).addClass('fn-hide');
  }
  click(e) {
    e.preventDefault();
    this.emit('fin');
  }
  render() {
    return <div class="main loading">
      <div class="con">
        <div class="start-line"/>
        <div class="end-line"/>
        <a href="#" class="enter" onClick={ this.click }><span>•<br/>异世开启<br/>•</span></a>
      </div>
      <div class="cp">
        <p>All Rights Reserved 结梦谷</p>
        <p>浙ICP备17029501号-1</p>
      </div>
    </div>;
  }
}

export default Loading;
