/**
 * Created by army8735 on 2018/4/23.
 */

'use strict';

import Media from './Media.jsx';
import Info from './Info.jsx';
import Select from './Select.jsx';
import Column from './Column.jsx';
import Author from './Author.jsx';
import Text from './Text.jsx';
import Poster from './Poster.jsx';
import Comments from './Comments.jsx';

class Works extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.worksId = self.props.worksId;
    self.workId = self.props.workId;
    self.curColumn = 0;
    self.setData({
      info: self.props.info,
      collection: self.props.collection,
      commentList: self.props.commentList,
    });
    self.on(migi.Event.DOM, function() {
      self.url = /(iPhone|iPod|ios)/i.test(navigator.userAgent)
        ? 'https://itunes.apple.com/cn/app/id1331367220'
        : 'https://circling.net.cn/android/circling-0.7.1.apk';
      if(self.av) {
        self.setMedia(self.av);
      }
    });
  }
  @bind kind
  @bind url
  @bind curColumn
  setData(data) {
    let self = this;
    self.data = data;

    let select = self.ref.select;
    let author = self.ref.author;
    let text = self.ref.text;
    let poster = self.ref.poster;
    let comments = self.ref.comments;

    // 未完成保密
    if(data.info.state === 3) {
      return;
    }

    let avList = self.avList = [];
    let imgList = [];
    let textList = [];
    data.collection.forEach(function(item) {
      if([1, 2].indexOf(item.kind) > -1) {
        avList.push(item);
      }
      else if(item.kind === 3) {
        imgList.push(item);
      }
      else if(item.kind === 4) {
        textList.push(item);
      }
    });

    let index = 0;
    if(self.workId) {
      for(let i = 0, len = avList.length; i < len; i++) {
        if(avList[i].id === self.workId) {
          index = i;
          break;
        }
      }
    }
    self.avList = avList;
    self.av = avList[index];

    self.setColumn(imgList, data.commentList);
    self.author = data.info.author;
    self.textList = textList;
    self.imgList = imgList;
    self.commentList = data.commentList;
  }
  setMedia(item) {
    let self = this;
    item.worksId = self.worksId;
    item.worksTitle = self.data.info.title;
    item.worksCover = self.data.info.cover;
    self.ref.media.setData(item || null);
  }
  setColumn(imgList, commentList) {
    let self = this;
    let list = [
      {
        id: 0,
        name: '简介',
      }
    ];
    if(imgList.length) {
      list.push({
        id: 1,
        name: '海报',
      });
    }
    list.push({
      id: 2,
      name: '评论 ' + (commentList ? commentList.count || '' : ''),
    });
    if(self.curColumn === undefined) {
      self.curColumn = 0;
    }
    self.list = list;
  }
  clickSel(e, vd ,tvd) {
    let self = this;
    if(tvd.props.rel === self.curColumn) {
      return;
    }
    self.curColumn = tvd.props.rel;
  }
  changeColumn(id) {
    let self = this;
    self.curColumn = id;
  }
  change(workId) {
    let self = this;
    self.workId = workId;
    for(let i = 0; i < self.avList.length; i++) {
      if(self.avList[i].id === workId) {
        self.setMedia(self.avList[i]);
        break;
      }
    }
  }
  render() {
    let self = this;
    return <div class="works">
      <Media ref="media"/>
      <Info ref="info"
            data={ self.props.info }/>
      <Select ref="select"
              list={ self.avList }
              id={ self.av && self.av.id }
              on-change={ self.change }/>
      <Column ref="column"
              list={ self.list }
              on-change={ self.changeColumn }/>
      <div class={ 'intro' + (self.curColumn === 0 ? '' : ' fn-hide') }>
        <Author ref="author" list={ self.author }/>
        <Text ref="text" list={ self.textList }/>
      </div>
      <Poster ref="poster"
              list={ self.imgList }
              @visible={ self.curColumn === 1 }/>
      <Comments ref="comments"
                id={ self.worksId }
                data={ self.commentList }
                @visible={ self.curColumn === 2 }/>
    </div>;
  }
}

export default Works;
