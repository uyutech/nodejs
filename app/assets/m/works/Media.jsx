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
  clickType(e, vd, tvd) {
    let self = this;
    let $dd = $(tvd.element);
    if(!$dd.hasClass('cur')) {
      let $parent = $dd.parent();
      let type = $parent.attr('rel');
      let index = tvd.props.rel;
      let audio = self.ref.audio;
      let video = self.ref.video;
      if($parent.hasClass('cur')) {
        $parent.find('.cur').removeClass('cur');
        if(type === 'audio') {
          audio.switchTo(index);
        }
        else if(type === 'video') {
          video.switchTo(index);
        }
      }
      else {
        let $type = $(vd.element);
        $type.find('.cur').removeClass('cur');
        $parent.addClass('cur');
        if(type === 'audio') {
          video && video.pause().hide();
          audio.show();
          audio.switchTo(index);
        }
        else if(type === 'video') {
          audio && audio.pause().hide();
          video.show();
          video.switchTo(index);
        }
      }
      $dd.addClass('cur');
      if(tvd.name.toLowerCase() === 'dt') {
        $dd.next().addClass('cur');
      }
    }
  }
  render() {
    let showLabel = this.props.videoData && this.props.audioData;
    let videoLabelNum = this.props.videoData ? this.props.videoData.length : 0;
    let audioLabelNum = this.props.audioData ? this.props.audioData.length : 0;
    if(showLabel) {
      return <div class="mod mod-media fn-clear" style={ `background-image:url(${this.props.cover || '//zhuanquan.xin/img/blank.png'})` }>
        {
          this.props.videoData
            ? <Video ref="video" cover={ this.props.cover } datas={ this.props.videoData } show={ this.props.first === 'video' }/>
            : ''
        }
        {
          this.props.audioData
            ? <Audio ref="audio" cover={ this.props.cover } datas={ this.props.audioData } show={ this.props.first === 'audio' }/>
            : ''
        }
        <div class="type fn-clear" ref="type" onClick={ { dt: this.clickType, dd: this.clickType } }>
          {
            this.props.videoData
              ? <dl class={ 'video fn-clear' + (this.props.first === 'video' ? ' cur' : '') } rel="video">
                <dt rel={ 0 }>视频</dt>
                {
                  this.props.videoData.length && this.props.videoData.length > 1
                    ? this.props.videoData.map(function(item, i) {
                      return <dd class={ this.props.first === 'video' && !i ? 'cur' : '' } rel={ i }>{ item.ItemName }</dd>;
                    }.bind(this))
                    : ''
                }
              </dl>
              : ''
          }
          {
            this.props.audioData
              ? <dl class={ 'audio fn-clear' + (this.props.first === 'audio' ? ' cur' : '') } rel="audio">
                <dt rel={ 0 }>音频</dt>
                {
                  this.props.audioData.length && this.props.audioData.length > 1
                    ? this.props.audioData.map(function(item, i) {
                      return <dd class={ this.props.first === 'audio' && !i ? 'cur' : '' } rel={ i }>{ item.ItemName }</dd>;
                    }.bind(this))
                    : ''
                }
              </dl>
              : ''
          }
        </div>
      </div>;
    }
    return <div class="mod mod-media fn-clear" style={ `background-image:url(${this.props.cover || '//zhuanquan.xin/img/blank.png'})` }>
      {
        this.props.videoData
          ? <Video ref="video" cover={ this.props.cover } datas={ this.props.videoData } show={ this.props.first === 'video' }/>
          : ''
      }
      {
        this.props.audioData
          ? <Audio ref="audio" cover={ this.props.cover } datas={ this.props.audioData } show={ this.props.first === 'audio' }/>
          : ''
      }
    </div>;
  }
}

export default Media;
