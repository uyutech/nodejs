/**
 * Created by army8735 on 2017/8/26.
 */

class Geography extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  show() {
    $(this.element).removeClass('fn-hide');
  }
  hide() {
    $(this.element).addClass('fn-hide');
  }
  render() {
    return <div class="main geography">
      <div class="wait"/>
    </div>;
  }
}

export default Geography;
