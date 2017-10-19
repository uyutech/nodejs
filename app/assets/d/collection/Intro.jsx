/**
 * Created by army8735 on 2017/10/19.
 */

'use strict';

class Intro extends migi.Component {
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
    return <div class="intro"/>;
  }
}

export default Intro;
