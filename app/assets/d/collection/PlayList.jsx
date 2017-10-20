/**
 * Created by army8735 on 2017/10/19.
 */

'use strict';

function setTranform($elem, n) {
  $elem.css('-moz-transform', `scaleY(${n})`);
  $elem.css('-webkit-transform', `scaleY(${n})`);
  $elem.css('transform', `scaleY(${n})`);
}

let isPlaying;

class PlayList extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.list = self.props.workList;
    self.on(migi.Event.DOM, function() {
      let $l1 = $(self.element).find('.l1');
      let $l2 = $(self.element).find('.l2');
      let $l3 = $(self.element).find('.l3');
      setInterval(function() {
        if(!isPlaying) {
          setTranform($l1, 0.1);
          setTranform($l2, 0.1);
          setTranform($l3, 0.1);
          return;
        }
        let n1 = Math.random();
        let n2 = Math.random();
        let n3 = Math.random();
        setTranform($l1, n1);
        setTranform($l2, n2);
        setTranform($l3, n3);
      }, 100);
    });
    migi.eventBus.on('play', function() {
      isPlaying = true;
    });
    migi.eventBus.on('pause', function() {
      isPlaying = false;
    });
  }
  @bind list
  clickType(e, vd, tvd) {
    let $li = $(tvd.element);
    if(!$li.hasClass('cur')) {
      $(vd.element).find('.cur').removeClass('cur');
      $li.addClass('cur');
      this.ref.list.element.className = 'list ' + (tvd.props.rel || '');
    }
  }
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
      <ul class="type fn-clear" onClick={ { li: this.clickType } }>
        {/*<li class="video" rel="video">播放视频</li>*/}
        {/*<li class="audio" rel="audio">播放音频</li>*/}
        {/*<li class="music cur">播放全部</li>*/}
      </ul>
      <ol class="list" ref="list" onClick={ { li: this.clickItem } }>
        {
          (this.list || []).map(function(item, i) {
            let type = '';
            if(item.ItemType === 1111) {
              type = 'audio';
            }
            else if(item.ItemType === 2110) {
              type = 'video';
            }
            return <li class={ type + (i ? '' : ' cur') } rel={ i }>
              <span class="name">{ item.ItemName }</span>
              <span class="icon"><b class="l1"/><b class="l2"/><b class="l3"/></span>
            </li>;
          })
        }
      </ol>
    </div>;
  }
}

export default PlayList;
