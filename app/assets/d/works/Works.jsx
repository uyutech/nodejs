/**
 * Created by army8735 on 2017/9/21.
 */

import Title from './Title.jsx';
import Author from './Author.jsx';
import Media from './Media.jsx';
import itemTemplate from './itemTemplate';
import Intro from './Intro.jsx';
import WorkComment from './WorkComment.jsx';


let first;

class Works extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.setWorks(self.props.worksDetail.Works_Items);
    self.on(migi.Event.DOM, function() {
      let media = self.ref.media;
      let workComment = self.ref.workComment;
      media.on('switchSubWork', function(data) {
        self.subWorkID = data[0].ItemID;
        workComment.subWorkID = self.subWorkID;
        workComment.barrageTime = 0;
      });
      media.on('timeupdate', function(data) {
        workComment.barrageTime = data;
      });
    })
  }
  @bind worksID
  @bind subWorkID
  setWorks(works) {
    let self = this;
    let workHash = {};
    let workList = [];
    let authorList = [];
    let authorHash = {};
    works.forEach(function(item) {
      // 先按每个小作品类型排序其作者
      migi.sort(item.Works_Item_Author, itemTemplate(item.ItemType).authorSort || function() {});
      // 将每个小作品根据小类型映射到大类型上，再归类
      let bigType = itemTemplate(item.ItemType).bigType;
      workHash[bigType] = workHash[bigType] || [];
      workHash[bigType].push(item);
      item.Works_Item_Author.forEach(function(item) {
        authorHash[item.WorksAuthorType] = authorHash[item.WorksAuthorType] || {};
        if(!authorHash[item.WorksAuthorType][item.ID]) {
          authorHash[item.WorksAuthorType][item.ID] = true;
          authorList.push(item);
        }
      });
    });
    Object.keys(workHash).forEach(function(k) {
      workList.push({
        bigType: k,
        value: workHash[k],
      });
    });
    migi.sort(workList, function(a, b) {
      return a.bigType > b.bigType;
    });
    authorHash = {};
    let tempHash = {
      901: 1,
      111: 1,
      112: 1,
      121: 2,
      122: 2,
      411: 2,
      421: 2,
      131: 2,
      134: 2,
      141: 2,
      211: 3,
      312: 3,
      311: 3,
      313: 3,
      351: 3,
      331: 3,
      332: 3,
    };
    authorList.forEach(function(item) {
      let type = tempHash[item.WorksAuthorType] || 3;
      authorHash[type] = authorHash[type] || [];
      authorHash[type].push(item);
    });
    authorList = [];
    if(authorHash[1]) {
      let seq = [901, 111, 112];
      migi.sort(authorHash[1], function(a, b) {
        return seq.indexOf(a.WorksAuthorType) > seq.indexOf(b.WorksAuthorType);
      });
      authorList.push(authorHash[1]);
    }
    if(authorHash[2]) {
      let seq = [121, 122, 411, 421, 131, 134, 141];
      migi.sort(authorHash[2], function(a, b) {
        return seq.indexOf(a.WorksAuthorType) > seq.indexOf(b.WorksAuthorType);
      });
      authorList.push(authorHash[2]);
    }
    if(authorHash[3]) {
      let seq = [211, 312, 311, 313, 351, 331, 332];
      migi.sort(authorHash[3], function(a, b) {
        return seq.indexOf(a.WorksAuthorType) > seq.indexOf(b.WorksAuthorType);
      });
      authorList.push(authorHash[3]);
    }
    self.authorList = authorList;

    workList.forEach(function(item) {
      if(item.bigType === 'audio') {
        self.hasAudio = true;
        self.audioData = item.value;
      }
      else if(item.bigType === 'video') {
        self.hasVideo = true;
        self.videoData = item.value;
      }
    });
    if(self.hasAudio) {
      first = 'audio';
    }
    else if(self.hasVideo) {
      first = 'video';
    }
    self.workList = workList;
  }
  setID(worksID) {
    this.worksID = worksID;
    this.ref.workComment.worksID = worksID;
  }
  load() {
    let self = this;
    let title = self.ref.title;
    let media = self.ref.media;
    let workComment = self.ref.workComment;
    workComment.load();
    util.postJSON('api/works/GetWorkDetails', { WorksID: self.worksID }, function(res) {
      if(res.success) {
        let data = res.data;
        title.title = data.Title;
        title.subTitle = data.sub_Title;
        media.setCover(data.cover_Pic);

        let works = data.Works_Items;
        let workHash = {};
        let workList = [];
        let authorList = [];
        let authorHash = {};
        works.forEach(function(item) {
          // 先按每个小作品类型排序其作者
          util.sort(item.Works_Item_Author, itemTemplate(item.ItemType).authorSort || function() {});
          // 将每个小作品根据小类型映射到大类型上，再归类
          let bigType = itemTemplate(item.ItemType).bigType;
          workHash[bigType] = workHash[bigType] || [];
          workHash[bigType].push(item);
          item.Works_Item_Author.forEach(function(item) {
            authorHash[item.WorksAuthorType] = authorHash[item.WorksAuthorType] || {};
            if(!authorHash[item.WorksAuthorType][item.ID]) {
              authorHash[item.WorksAuthorType][item.ID] = true;
              authorList.push(item);
            }
          });
        });
        Object.keys(workHash).forEach(function(k) {
          workList.push({
            bigType: k,
            value: workHash[k],
          });
        });
        util.sort(workList, function(a, b) {
          return a.bigType > b.bigType;
        });
        authorHash = {};
        let tempHash = {
          901: 1,
          111: 1,
          112: 1,
          121: 2,
          122: 2,
          411: 2,
          421: 2,
          131: 2,
          134: 2,
          141: 2,
          211: 3,
          312: 3,
          311: 3,
          313: 3,
          351: 3,
          331: 3,
          332: 3,
        };
        authorList.forEach(function(item) {
          let type = tempHash[item.WorksAuthorType] || 3;
          authorHash[type] = authorHash[type] || [];
          authorHash[type].push(item);
        });
        authorList = [];
        if(authorHash[1]) {
          let seq = [901, 111, 112];
          util.sort(authorHash[1], function(a, b) {
            return seq.indexOf(a.WorksAuthorType) > seq.indexOf(b.WorksAuthorType);
          });
          authorList.push(authorHash[1]);
        }
        if(authorHash[2]) {
          let seq = [121, 122, 411, 421, 131, 134, 141];
          util.sort(authorHash[2], function(a, b) {
            return seq.indexOf(a.WorksAuthorType) > seq.indexOf(b.WorksAuthorType);
          });
          authorList.push(authorHash[2]);
        }
        if(authorHash[3]) {
          let seq = [211, 312, 311, 313, 351, 331, 332];
          util.sort(authorHash[3], function(a, b) {
            return seq.indexOf(a.WorksAuthorType) > seq.indexOf(b.WorksAuthorType);
          });
          authorList.push(authorHash[3]);
        }
        self.ref.author.setAuthor(authorList);

        media.setWorks(workList);

        let hasAudio = false;
        let hasVideo = false;
        workList.forEach(function(item) {
          if(item.bigType === 'audio') {
            hasAudio = true;
            $(self.ref.type.element).find('.audio').removeClass('fn-hide');
          }
          else if(item.bigType === 'video') {
            hasVideo = true;
            $(self.ref.type.element).find('.video').removeClass('fn-hide');
          }
        });
        if(hasAudio) {
          $(self.ref.type.element).find('.audio').addClass('cur');
        }
        else if(hasVideo) {
          $(self.ref.type.element).find('.video').addClass('cur');
        }
        // media.popular = data.Popular;
        // intro.tags = data.ReturnTagData || [];
        // $(self.ref.form.element).removeClass('fn-hide');
      }
      else {
        alert(res.message);
      }
    });
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
    return <div class="works fn-clear">
      <Title ref="title" worksDetail={ this.props.worksDetail }/>
      <div class="temp fn-clear">
        <ul class="type" ref="type" onClick={ { li: this.clickType } }>
          <li class={ 'audio' + (this.hasAudio ? '' : ' fn-hide') + (first === 'audio' ? ' cur' : '') } rel="audio">音频</li>
          <li class={ 'video' + (this.hasVideo ? '' : ' fn-hide') + (first ==='video' ? ' cur' : '') } rel="video">视频</li>
        </ul>
        <Author ref="author" authorList={ this.authorList }/>
        <Media ref="media"
               worksDetail={ this.props.worksDetail }
               audioData={ this.audioData } videoData={ this.videoData } first={ first }/>
      </div>
      <WorkComment ref="workComment" worksID={ this.props.worksID } commentData={ this.props.commentData }/>
    </div>;
  }
}

export default Works;
