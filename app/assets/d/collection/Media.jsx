/**
 * Created by army8735 on 2017/10/19.
 */

'use strict';

import Intro from './Intro.jsx';
import Player from './Player.jsx';

class Media extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      let intro = self.ref.intro;
      let player = self.ref.player;
      intro.on('start', function() {
        self.start();
      });
      migi.eventBus.on('chooseMedia', function() {
        intro.hide();
        player.show();
      });
    });
  }
  switchType(type) {
    let self = this;
    let intro = self.ref.intro;
    let player = self.ref.player;
    if(type === 'intro') {
      player.hide();
      player.pause();
      intro.show();
    }
    else if(type === 'player') {
      intro.hide();
      player.show();
    }
  }
  start() {
    let self = this;
    let intro = self.ref.intro;
    let player = self.ref.player;
    intro.hide();
    player.show();
    player.play();
  }
  render() {
    return <div class="mod mod-media" style={ 'background-image:url(' + this.props.cover + ')'}>
      <Intro ref="intro"/>
      <Player ref="player" workList={ this.props.workList }/>
    </div>;
  }
}

export default Media;