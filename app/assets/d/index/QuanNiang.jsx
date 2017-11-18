/**
 * Created by army8735 on 2017/9/26.
 */

class QuanNiang extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.num = self.props.messages.Count;
  }
  @bind message;
  @bind num
  click() {
    this.show();
  }
  clickClose(e) {
    e.preventDefault();
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
        <pre>{ this.message || '感谢参与转圈内测，现在我们还只有最基础的功能，程序员小哥哥们还在加班加点进行建设。\n欢迎随处逛逛，也欢迎给我们提出宝贵建议！我们一定会做得更好=3=' }</pre>
        <p>欢迎点击右侧给我们留言！<a href="http://weibo.com/u/6259241863" target="_blank">@转圈circling</a></p>
        <a class="close" href="#" onClick={ this.clickClose }>好的</a>
      </div>
    </div>;
  }
}

export default QuanNiang;
