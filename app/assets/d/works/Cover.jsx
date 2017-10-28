/**
 * Created by army8735 on 2017/10/28.
 */

'use strict';

class Cover extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  show() {
    $(this.element).removeClass('fn-hide');
  }
  hide() {
    $(this.element).addClass('fn-hide');
  }
  clickStart() {
    this.emit('start');
  }
  render() {
    return <div class="cover">
      <b class="start" onClick={ this.clickStart }/>
    </div>;
  }
}

export default Cover;
