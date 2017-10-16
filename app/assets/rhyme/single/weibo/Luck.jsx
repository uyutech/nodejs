/**
 * Created by army8735 on 2017/8/27.
 */

class Luck extends migi.Component {
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
    this.emit('ok');
  }
  render() {
    return <div class="main weibo">
      <p>{ window.LUCK_MES }</p>
      <a href="#" class="ok" onClick={ this.click }>确定</a>
    </div>;
  }
}

export default Luck;
