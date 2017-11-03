/**
 * Created by army8735 on 2017/9/21.
 */

import Audio from './Audio.jsx';
import Video from './Video.jsx';
import Link from './Link.jsx';

class Media extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      let audio = self.ref.audio;
      let video = self.ref.video;
      if(audio) {
        audio.on('switchTo', function(data) {
          self.emit('switchTo', data);
        });
      }
      if(video) {
        video.on('switchTo', function(index, data) {
          self.emit('switchTo', data);
        });
      }
    });
  }
  switchType(type) {
    let self = this;
    let audio = self.ref.audio;
    let video = self.ref.video;
    let link = self.ref.link;
    if(type === 'audio') {
      // link.hide();
      video && video.pause().hide();
      audio.show();
      self.emit('switchTo', audio.datas[audio.index || 0]);
    }
    else if(type === 'video') {
      // link.hide();
      audio && audio.pause().hide();
      video.show();
      self.emit('switchTo', video.datas[video.index || 0]);
    }
    else if(type === 'link') {
      audio && audio.pause().hide();
      video && video.pause().hide();
      link.show();
    }
  }
  render() {
    return <div class="mod mod-media box box-fn-top-left" style={ `background-image:url(${this.props.cover})` }>
      {
        this.props.audioData
          ? <Audio ref="audio" cover={ this.props.cover } datas={ this.props.audioData }
                   show={ this.props.first === 'audio' } worksID={ this.props.worksID } workID={ this.props.workID }/>
          : ''
      }
      {
        this.props.videoData
          ? <Video ref="video" cover={ this.props.cover } datas={ this.props.videoData }
                   show={ this.props.first === 'video' } worksID={ this.props.worksID } workID={ this.props.workID }/>
          : ''
      }
      {/*<Link ref="link" worksID={ this.props.worksID } audioData={ this.props.audioData } videoData={ this.props.videoData }/>*/}
    </div>;
  }
}

export default Media;
