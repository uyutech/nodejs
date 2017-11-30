/**
 * Created by army on 2017/6/18.
 */

import util from '../../d/common/util';
import net from '../../d/common/net';
import Banner from './Banner.jsx';
import HotWork from '../component/hotwork/HotWork.jsx';
import HotAuthor from '../component/hotauthor/HotAuthor.jsx';
import HotMusicAlbum from '../component/hotmusicalbum/HotMusicAlbum.jsx';
import HotCircle from '../component/hotcircle/HotCircle.jsx';
import HotPlayList from '../../d/component/hotplaylist/HotPlayList.jsx';
import SubCmt from '../../d/component/subcmt/SubCmt.jsx';

class Find extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      let subCmt = self.ref.subCmt;
      subCmt.on('click', function() {
        location.href = '/circle/post';
      });
    });
  }
  show() {
    $(this.element).removeClass('fn-hide');
  }
  hide() {
    $(this.element).addClass('fn-hide');
  }
  clickChangeWork() {
    let self = this;
    net.postJSON('/api/find/hotWorkList', function(res) {
      if(res.success) {
        self.ref.hotWork.setData(res.data);
        self.ref.hotWork.autoWidth();
      }
      else {
        alert(res.message || util.ERROR_MESSAGE);
      }
    }, function(res) {
      alert(res.message || util.ERROR_MESSAGE);
    });
  }
  clickType() {}
  render() {
    return <div class="find">
      <Banner/>
      <h4>推荐圈子</h4>
      <HotCircle ref="HotCircle" dataList={ this.props.hotCircleList }/>
      <h4>热门作品<small onClick={ this.clickChangeWork }>换一批</small></h4>
      <HotWork ref="hotWork" dataList={ this.props.hotWorkList }/>
      <h4>热门专辑</h4>
      <HotMusicAlbum ref="hotMusicAlbum" dataList={ this.props.hotMusicAlbumList }/>
      <h4>入驻作者</h4>
      <HotAuthor ref="hotAuthor" dataList={ this.props.hotAuthorList }/>
      <ul class="type fn-clear" ref="type" onClick={ { li: this.clickType } }>
        <li class="ma cur">音乐</li>
        {/*<li class="pic">美图</li>*/}
      </ul>
      <HotPlayList ref="hotPlayList" dataList={ this.props.hotPlayList.data }/>
      <SubCmt ref="subCmt"
              tipText="-${n}"
              subText="发送"
              readOnly={ true }
              placeholder={ '小小的提示：现在可以把一个圈画在好几个圈子里哦！' }/>
    </div>;
  }
}

export default Find;
