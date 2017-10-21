/**
 * Created by army8735 on 2017/10/18.
 */

'use strict';

import Title from '../works/Title.jsx';
import Timeline from '../works/Timeline.jsx';
import Media from './Media.jsx';
import Describe from './Describe.jsx';
import Author from '../works/Author.jsx';
import InspComment from '../works/InspComment.jsx';
import PlayList from './PlayList.jsx';
import CollectionComment from './CollectionComment.jsx';
import AddLabelPanel from '../works/AddLabelPanel.jsx';
import LyricsParser from '../works/LyricsParser.jsx';

class Collection extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.collectionID = self.props.collectionID;
    self.collectionType = self.props.collectionDetail.WorkType;
    self.setWorks(self.props.collectionDetail.Works_Items);
    self.on(migi.Event.DOM, function() {
      let addLabel = self.ref.addLabelPanel;
      migi.eventBus.on('add-label', function() {
        addLabel.show();
      });
      let media = self.ref.media;
      let intro = media.ref.intro;
      let $type = $(self.ref.type.element);
      intro.on('start', function() {
        media.start();
        $type.find('.intro').removeClass('cur');
        $type.find('.play').addClass('cur');
      });
      migi.eventBus.on('chooseMedia', function() {
        $type.find('.intro').removeClass('cur');
        $type.find('.play').addClass('cur');
      });
    });
  }
  @bind collectionID
  @bind collectionType
  setWorks(works) {
    let self = this;
    let workList = [];
    works.forEach(function(item) {
      if(item.ItemType === 1111 || item.ItemType === 1113) {
        let l = {};
        if(LyricsParser.isLyrics(item.lrc)) {
          l.is = true;
          l.txt = LyricsParser.getTxt(item.lrc);
          l.data = LyricsParser.parse(item.lrc);
        }
        else {
          l.is = false;
          l.txt = item.lrc;
        }
        item.formatLyrics = l;
        workList.push(item);
      }
      else if(item.ItemType === 2110) {
        workList.push(item);
      }
    });
    self.workList = workList;
  }
  clickType(e, vd, tvd) {
    let $li = $(tvd.element);
    if(!$li.hasClass('cur')) {
      $(vd.element).find('.cur').removeClass('cur');
      $li.addClass('cur');
      let type = tvd.props.rel;
      this.ref.media.switchType(type);
    }
  }
  render() {
    return <div class="collection fn-clear">
      <Title ref="title"
             detail={ this.props.collectionDetail }/>
      {
        this.props.collectionDetail.WorkTimeLine && this.props.collectionDetail.WorkTimeLine.length
          ? <Timeline datas={ this.props.collectionDetail.WorkTimeLine }/>
          : ''
      }
      <div class="main">
        <ul class="type fn-clear" ref="type" onClick={ { li: this.clickType } }>
          <li class="intro cur" rel="intro">封面</li>
          <li class="play" rel="player">播放</li>
        </ul>
        <Media ref="media"
               collectionID={ this.collectionID }
               cover={ this.props.collectionDetail.cover_Pic }
               workList={ this.workList }/>
        <div class="info">
          <Describe data={ this.props.collectionDetail.Describe }/>
          <Author authorList={ [this.props.collectionDetail.Works_Author] }/>
          <InspComment ref="inspComment"
                       commentData={ this.props.collectionDetail.WorksAuthorComment }/>
        </div>
      </div>
      <div class="side">
        <ul class="sel fn-clear" ref="sel">
          <li class="cur">曲目</li>
        </ul>
        <div class="box">
          <PlayList workList={ this.workList }/>
        </div>
        <CollectionComment ref="collectionComment"
                           isLogin={ this.props.isLogin }
                           collectionID={ this.collectionID }
                           workID={ this.workID }
                           commentData={ this.props.commentData }/>
      </div>
      <AddLabelPanel ref="addLabelPanel" worksID={ this.collectionID }/>
    </div>;
  }
}

export default Collection;
