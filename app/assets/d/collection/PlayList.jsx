/**
 * Created by army8735 on 2017/10/19.
 */

'use strict';

class PlayList extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  clickType() {}
  render() {
    return <div class="mod mod-playlist">
      <ul class="type fn-clear" onClick={ this.clickType }>
        <li class="video">播放视频</li>
        <li class="audio">播放音频</li>
        <li class="music cur">播放全部</li>
      </ul>
      <ol class="list">
        <li class="cur">
          <small>1.</small>
          <span class="name">名字</span>
          <span class="icon"><b/></span>
        </li>
        <li>
          <small>1.</small>
          <span class="name">名字</span>
          <span class="icon"><b/></span>
        </li>
      </ol>
    </div>;
  }
}

export default PlayList;
