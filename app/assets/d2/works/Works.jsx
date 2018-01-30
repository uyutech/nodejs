/**
 * Created by army8735 on 2018/1/29.
 */

'use strict';

import Title from './Title.jsx';
import Media from './Media.jsx';
import WorksComment from './WorksComment.jsx';

class Works extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.setData(self.props.worksWorkList);
  }
  setData(worksWorkList) {
    let self = this;
    self.audioList = [];
    self.videoList = [];
    worksWorkList.forEach(function(work) {
      switch(work.workCategory) {
        case 1:
          self.audioList.push(work);
          break;
        case 2:
          self.videoList.push(work);
          break;
      }
    });
  }
  render() {
    let self = this;
    return <div class="works fn-clear">
      <Title ref="title"
             worksInfo={ self.props.worksInfo }/>
      <div class="main">
        <ul class="type fn-clear"
            ref="type"
            onClick={ { li: this.clickType } }>
          {
            self.videoList.length
              ? <li class="video cur" rel="video">视频</li>
              : ''
          }
          {
            self.audioList.length
              ? <li class="audio" rel="audio">音频</li>
              : ''
          }
        </ul>
        <Media ref="media"
               videoList={ self.videoList }
               audioList={ self.audioList }/>
        <WorksComment ref="worksComment"
                      worksId={ self.props.worksId }
                      worksCommentData={ self.props.worksCommentData }/>
      </div>
      <div class="side">
        <ul class="sel fn-clear" ref="sel">
          <li class="cur">简介</li>
        </ul>
      </div>
    </div>;
  }
}

export default Works;
