/**
 * Created by army8735 on 2017/9/26.
 */

class QuanNiang extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.num = $CONFIG.messageNum;
  }
  @bind message;
  @bind num
  click() {
    this.show();
  }
  clickClose() {
    $(this.ref.txt.element).addClass('fn-hide');
  }
  clickMessage() {
    this.emit('message');
  }
  show() {
    let $txt = $(this.ref.txt.element);
    $txt.removeClass('fn-hide');
  }
  readMessage(n) {
    this.num = Math.max(0, this.num - n);
  }
  render() {
    return <div class="quaniang">
      <div class="message" onClick={ this.clickMessage }>
        <span class={ this.num ? '' : 'fn-hide' }>{ this.num > 99 ? '99+' : this.num }</span>
      </div>
      <span class="pic" onClick={ this.click }/>
      <div class="txt fn-hide" ref="txt">
        <h5>圈儿：</h5>
        <pre>{ this.message || '安卓版的App测试版已经做好啦，正在调试bug的阶段，预计于下周在各大应用商店上线。\n' +
        '为了让大家在这个阶段就可以体验App，并且帮助我们发现各种Bug，在正式上线之前，小伙伴们可以点击下面的【下载安卓App】按钮，抢先体验哦！\n\n' +
        '有什么使用上的反馈和建议可以点击下面的【联系小哥哥】按钮，给程序员小哥哥留言。\n' +
        '使用苹果手机的小伙伴们也不要着急，我们会尽快完成iOS端的开发。目前所有功能都可以在Web端使用。' }</pre>
        <p><a href="https://circling.cc/h5/index" target="_blank">【下载安卓App】</a><a href="https://circling.cc/post/2020000000056611" target="_blank">【联系小哥哥】</a></p>
        <b class="close" onClick={ this.clickClose }/>
      </div>
    </div>;
  }
}

export default QuanNiang;
