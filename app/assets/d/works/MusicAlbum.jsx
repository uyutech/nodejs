/**
 * Created by army8735 on 2017/10/28.
 */

'use strict';

import Cover from './Cover.jsx';
import Player from './Player.jsx';

class Media extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      let cover = self.ref.cover;
      let player = self.ref.player;
      cover.on('start', function() {
        self.start();
      });
      migi.eventBus.on('chooseMusic', function() {
        cover.hide();
        player.show();
      });
    });
  }
  switchType(type) {
    let self = this;
    let cover = self.ref.cover;
    let player = self.ref.player;
    if(type === 'cover') {
      player.hide();
      player.pause();
      cover.show();
    }
    else if(type === 'player') {
      cover.hide();
      player.show();
    }
  }
  start() {
    let self = this;
    let cover = self.ref.cover;
    let player = self.ref.player;
    cover.hide();
    player.show();
    player.play();
  }
  render() {
    return <div class="mod mod-musicalbum box box-fn-top-left" style={ 'background-image:url("' + (this.props.cover || '//zhuanquan.xin/img/blank.png') + '")'}>
      <Cover ref="cover"/>
      <Player ref="player" workList={ this.props.workList }/>
    </div>;
  }
}

export default Media;
