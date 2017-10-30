/**
 * Created by army on 2017/6/18.
 */

import util from '../../d/common/util';
import net from '../../d/common/net';
import Banner from './Banner.jsx';
import HotWork from '../component/hotwork/HotWork.jsx';
import HotPhotoAlbum from '../component/hotphotoalbum/HotPhotoAlbum.jsx';
import HotAuthor from '../component/hotauthor/HotAuthor.jsx';
import HotMusicAlbum from '../component/hotmusicalbum/HotMusicAlbum.jsx';
import HotPost from '../component/hotpost/HotPost.jsx';
// import DoubleCheck from '../component/doublecheck/DoubleCheck.jsx';
// import PlayList from '../component/playlist/PlayList.jsx';

let ajax;
let SortType = '1';
let Parameter = '';
let ajaxL2;

class Find extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      // let doubleCheck = self.ref.doubleCheck;
      // doubleCheck.on('changeL1', function(param) {
      //   if(ajaxL2) {
      //     ajaxL2.abort();
      //   }
      //   doubleCheck.isLoadindL2 = true;
      //   net.postJSON('/api/find/tagB', { tagA: param }, function (res) {
      //     if(res.success) {
      //       let data = res.data;
      //       doubleCheck.tagList2 = data;
      //       doubleCheck.autoWidth2();
      //       doubleCheck.setCacheL2(param, data);
      //       doubleCheck.checkL2();
      //     }
      //     doubleCheck.isLoadindL2 = false;
      //   }, function() {
      //     doubleCheck.isLoadindL2 = false;
      //   });
      // });
      // doubleCheck.on('change', function(lA, lB) {
      //   let temp = lA.concat(lB);
      //   temp = temp.length ? JSON.stringify(temp) : '';
      //   if(temp !== Parameter) {
      //     Parameter = temp;
      //     self.loadPlayList();
      //   }
      // });
    });
  }
  show() {
    $(this.element).removeClass('fn-hide');
  }
  hide() {
    $(this.element).addClass('fn-hide');
  }
  // load() {
  //   let self = this;
  //   net.postJSON('api/find/Hot_works_List', function(res) {
  //     if(res.success) {
  //       let data = res.data;
  //       self.ref.hotWork.dataList = data;
  //       self.ref.hotWork.autoWidth();
  //     }
  //   });
  //   net.postJSON('api/find/Hot_Author_List', function(res) {
  //     if(res.success) {
  //       let data = res.data;
  //       self.ref.hotAuthor.dataList = data;
  //       self.ref.hotAuthor.autoWidth();
  //     }
  //   });
  //   net.postJSON('api/find/GetTag', { Skip:0, Take: 10 }, function(res) {
  //     if(res.success) {
  //       let data = res.data;
  //       data.FilterlevelA = [{
  //         ID: 0,
  //         TagName: '音乐',
  //         TagType: 0,
  //         TagCount: 3957,
  //         Filterlevel: "A",
  //       }];
  //       self.ref.doubleCheck.setData(data);
  //     }
  //     self.loadPlayList();
  //   });
  // }
  // loadPlayList() {
  //   let self = this;
  //   if(ajax) {
  //     ajax.abort();
  //   }
  //   ajax = net.postJSON('/api/find/playList', { Parameter, Skip: 0, Take: 10, SortType }, function(res) {
  //     if(res.success) {
  //       let data = res.data;
  //       self.ref.playList.setData(data.data);
  //     }
  //   });
  // }
  render() {
    return <div class="find">
      <Banner/>
      <HotPost ref="hotPost" title="推荐圈子" dataList={ this.props.hotPostList }/>
      <HotWork ref="hotWork" title="推荐作品" dataList={ this.props.hotWorkList }/>
      <HotMusicAlbum ref="hotMusicAlbum" title="推荐专辑" dataList={ this.props.hotMusicAlbumList }/>
      <HotAuthor ref="hotAuthor" title="推荐作者" dataList={ this.props.hotAuthorList }/>
      <HotPhotoAlbum ref="hotPhotoAlbum" title="推荐相册" dataList={ this.props.hotPhotoAlbumList}/>
    </div>;
  }
}

export default Find;
