/**
 * Created by army8735 on 2018/1/30.
 */

'use strict';

import util from '../common/util';
import Video from './Video.jsx';
import Audio from './Audio.jsx';

class Media extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  switchType(klass) {
    let self = this;
    let audio = self.ref.audio;
    let video = self.ref.video;
    if(klass === 2) {
      video && video.pause().hide();
      audio.show();
    }
    else if(klass === 1) {
      audio && audio.pause().hide();
      video.show();
    }
  }
  render() {
    let self = this;
    return <div class="mod mod-media box box-fn-top-left"
                style={ `background-image:url(${util.autoSsl(util.img1296_1296_80(self.props.cover))
                  || '//zhuanquan.xin/img/blank.png'})` }>
      {
        self.props.videoList
          ? <Video ref="video"
                   worksId={ self.props.worksId }
                   list={ self.props.videoList }
                   show={ self.props.kind === 1 }/>
          : ''
      }
      {
        self.props.audioList
          ? <Audio ref="audio"
                   list={ self.props.audioList }
                   show={ self.props.kind === 2 } />
          : ''
      }
    </div>;
  }
}

export default Media;
