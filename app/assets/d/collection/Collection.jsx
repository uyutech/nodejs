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

class Collection extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.collectionID = self.props.collectionID;
    self.collectionType = self.props.collectionDetail.WorkType;
    self.setWorks(self.props.collectionDetail.Works_Items);
  }
  @bind collectionID
  @bind collectionType
  setWorks(works) {
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
          <li class="intro cur" rel="intro">简介</li>
          <li class="play" rel="play">播放</li>
        </ul>
        <Media ref="media"
               collectionID={ this.collectionID }
               cover={ this.props.collectionDetail.cover_Pic }/>
        <div class="info">
          <Describe data={ this.props.collectionDetail.Describe }/>
          <Author/>
          <InspComment/>
        </div>
      </div>
      <div class="side">
        <ul class="sel fn-clear" ref="sel">
          <li class="cur">曲目</li>
        </ul>
        <div class="box">
          <PlayList/>
        </div>
        <CollectionComment ref="collectionComment"
                           isLogin={ this.props.isLogin }
                           collectionID={ this.collectionID }
                           workID={ this.workID }
                           commentData={ this.props.commentData }/>
      </div>
      <AddLabelPanel ref="addLabelPanel" worksID={ this.worksID }/>
    </div>;
  }
}

export default Collection;
