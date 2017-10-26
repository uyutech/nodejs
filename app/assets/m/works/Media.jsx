/**
 * Created by army8735 on 2017/9/1.
 */

import util from '../../d/common/util';
import net from '../../d/common/net';
import Audio from './Audio.jsx';
import Video from './Video.jsx';

class Media extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;

    self.on(migi.Event.DOM, function() {
    });
  }
  render() {
    return <div class="mod mod-media fn-clear" style={ `background-image:url(${this.props.cover || '//zhuanquan.xin/img/blank.png'})` }>
      {
        this.props.videoData
          ? <Video ref="video" cover={ this.props.cover } datas={ this.props.videoData } show={ this.props.first === 'video' }/>
          : ''
      }
      <div class="type fn-clear">
      {
        this.props.videoData
          ? <dl class={ 'video fn-clear' + (this.props.first === 'video' ? ' cur' : '') }>
            <dt>视频</dt>
            {
              this.props.videoData.map(function(item, i) {
                return <dd class={ this.props.first === 'video' && !i }>{ item.ItemName }</dd>;
              }.bind(this))
            }
          </dl>
          : ''
      }
      {
        this.props.audioData
          ? <dl class={ 'audio fn-clear' + (this.props.first === 'audio' ? ' cur' : '') }>
            <dt>音频</dt>
            {
              this.props.audioData.map(function(item, i) {
                return <dd class={ this.props.first === 'audio' && !i }>{ item.ItemName }</dd>;
              })
            }
          </dl>
          : ''
      }
      </div>
    </div>;
  }
}

export default Media;
