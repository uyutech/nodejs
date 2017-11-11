/**
 * Created by army8735 on 2017/10/28.
 */

'use strict';

class Cover extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.url = self.props.work.FileUrl;
    self.on(migi.Event.DOM, function() {
      migi.eventBus.on('chooseMusic', function(item) {
        self.url = item.FileUrl;
      });
    });
  }
  @bind url
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
      <b class={ 'start' + (this.url ? '' : ' fn-hide') } onClick={ this.clickStart }/>
    </div>;
  }
}

export default Cover;
