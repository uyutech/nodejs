/**
 * Created by army8735 on 2017/8/26.
 */

class Legend extends migi.Component {
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
    return <div class="main legend">
      <ul ref="list" class="fn-clear">
        <li class="immortals" rel="muhan" cname="慕寒">
          <a href="#charactermuhan" class="c">
            <span>生</span>
          </a>
          <a href="#charactermuhan" class="h">
            <span class="muhan"/>
          </a>
        </li>
        <li class="spirits" rel="hetu" cname="河图">
          <a href="#characterhetu" class="c">
            <span>化</span>
          </a>
          <a href="#characterhetu" class="h">
            <span class="hetu"/>
          </a>
        </li>
        <li class="ethereals" rel="mi" cname="弥">
          <a href="#charactermi" class="c">
            <span>极</span>
          </a>
          <a href="#charactermi" class="h">
            <span class="mi"/>
          </a>
        </li>
        <li class="mutants" rel="sixia" cname="司夏">
          <a href="#charactersixia" class="c">
            <span>变</span>
          </a>
          <a href="#charactersixia" class="h">
            <span class="sixia"/>
          </a>
        </li>
      </ul>
    </div>;
  }
}

export default Legend;
