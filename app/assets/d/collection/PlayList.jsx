/**
 * Created by army8735 on 2017/10/19.
 */

'use strict';

class PlayList extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.list = self.props.workList;
  }
  @bind list
  clickType() {}
  clickItem(e, vd, tvd) {
    let $li = $(tvd.element);
    if(!$li.hasClass('cur')) {
      let $ol = $(vd.element);
      $ol.find('.cur').removeClass('cur');
      $li.addClass('cur');
      let i = tvd.props.rel;
      migi.eventBus.emit('chooseMedia', this.list[i]);
    }
  }
  render() {
    return <div class="mod mod-playlist">
      <ul class="type fn-clear" onClick={ this.clickType }>
        <li class="video">播放视频</li>
        <li class="audio">播放音频</li>
        <li class="music cur">播放全部</li>
      </ul>
      <ol class="list" ref="list" onClick={ { li: this.clickItem } }>
        {
          (this.list || []).map(function(item, i) {
            return <li class={ i ? '' : 'cur' } rel={ i }>
              <small>{ i + 1 }.</small>
              <span class="name">{ item.ItemName }</span>
              <span class="icon"><b/></span>
            </li>;
          })
        }
      </ol>
    </div>;
  }
}

export default PlayList;
