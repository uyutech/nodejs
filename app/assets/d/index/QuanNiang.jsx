/**
 * Created by army8735 on 2017/9/26.
 */

let timeout;

class QuanNiang extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  click(e) {
    e.preventDefault();
    let $txt = $(this.ref.txt.element);
    $txt.removeClass('fn-hide');
    timeout = setTimeout(function() {
      $txt.addClass('fn-hide');
    }, 5000);
  }
  clickClose(e) {
    e.preventDefault();
    $(this.ref.txt.element).addClass('fn-hide');
  }
  render() {
    return <div class="quaniang">
      <a href="#" class="pic" onClick={ this.click }/>
      <div class="txt fn-hide" ref="txt">
        <h5>圈娘：</h5>
        <p>感谢参与转圈内测，现在我们还只有最基础的功能，程序员小哥哥们还在加班加点进行建设。</p>
        <p>欢迎随处逛逛，也欢迎给我们提出宝贵建议！我们一定会做得更好=3=</p>
        <p>欢迎点击右侧给我们留言！<a href="http://weibo.com/u/6259241863" target="_blank">@转圈circling</a></p>
        <a class="close" href="#" onClick={ this.clickClose }>好的</a>
      </div>
    </div>;
  }
}

export default QuanNiang;
