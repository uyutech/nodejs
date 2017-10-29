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
        <a href="#work2015000000000006" class="rjrjs"/>
        <a href="#grid" class="jrj"/>
        <a href="#work2015000000001368" class="wsffl"/>
      </div>
    </div>;
  }
}

export default Rhyme;
