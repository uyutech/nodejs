/**
 * Created by army8735 on 2017/8/26.
 */

class Index extends migi.Component{
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
    return <div class="main index">
      <div class="light"/>
      <div class="logo">
        <div class="point">
          <span class="p1"/>
          <span class="p2"/>
          <span class="p3"/>
        </div>
      </div>
      <p class="copyright">All Rights Reserved 结梦谷 浙ICP备17029501号-1</p>
    </div>;
  }
}

export default Index;
