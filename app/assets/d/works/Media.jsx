/**
 * Created by army8735 on 2017/9/21.
 */

import Audio from './Audio.jsx';
import Video from './Video.jsx';

class Media extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  switchType(type) {
    if(type === 'audio') {
      this.ref.video.pause().hide();
      this.ref.audio.show();
    }
    else if(type === 'video') {
      this.ref.audio.pause().hide();
      this.ref.video.show();
    }
  }
  render() {
    return <div class="media" style={ `background-image:url(${this.props.cover})` }>
      {
        this.props.audioData
          ? <Audio ref="audio" cover={ this.props.cover } datas={ this.props.audioData } show={ this.props.first === 'audio' }/>
          : ''
      }
      {
        this.props.videoData
          ? <Video ref="video" cover={ this.props.cover } datas={ this.props.videoData } show={ this.props.first === 'video' }/>
          : ''
      }
    </div>;
  }
}

export default Media;
