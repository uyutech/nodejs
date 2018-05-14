/**
 * Created by army8735 on 2017/8/27.
 */

class Rhyme extends migi.Component {
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
    return <div class="main rhyme">
      <div class="c">
        <a href="https://circling.cc/works/2015000000000006" class="rjrjs" target="_blank"/>
        <a href="https://circling.cc/works/2015000000000001" class="jrj" target="_blank"/>
        <a href="https://circling.cc/works/2015000000001368" class="wsffl" target="_blank"/>
        <a href="https://circling.cc/works/2015000000001586" class="zx" target="_blank"/>
      </div>
    </div>;
  }
}

export default Rhyme;
