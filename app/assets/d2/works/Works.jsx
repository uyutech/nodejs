/**
 * Created by army8735 on 2018/1/29.
 */


'use strict';

import Title from './Title.jsx';
import Media from './Media.jsx';
import WorksComment from './WorksComment.jsx';
import Author from './Author.jsx';
import Text from './Text.jsx';
import Image from './Image.jsx';

class Works extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.worksId = self.props.worksId;
    self.workId = self.props.workId;
    self.setData(self.props.collection);
  }
  @bind worksId
  @bind workId
  setData(collection) {
    let self = this;
    self.videoList = [];
    self.audioList = [];
    self.imgList = [];
    self.textList = [];
    collection.forEach(function(item) {
      switch(item.class) {
        case 1:
          self.videoList.push(item);
          break;
        case 2:
          self.audioList.push(item);
          break;
        case 3:
          self.imgList.push(item);
          break;
        case 4:
          self.textList.push(item);
          break;
      }
    });
  }
  render() {
    let self = this;
    return <div class="works fn-clear">
      <Title ref="title"
             info={ self.props.info }/>
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
                      data={ self.props.comment }/>
      </div>
      <div class="side">
        <ul class="sel fn-clear" ref="sel">
          <li class="cur">简介</li>
        </ul>
        <div class="box box-fn-top-left">
          <Author ref="author" list={ self.props.authors }/>
          <Text ref="text" list={ self.textList }/>
          <Image ref="image" list={ self.imgList }/>
        </div>
      </div>
    </div>;
  }
}

export default Works;
