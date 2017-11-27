/**
 * Created by army on 2017/6/24.
 */

import HotWork from '../component/hotwork/HotWork.jsx';
import HotMusicAlbum from '../component/hotmusicalbum/HotMusicAlbum.jsx';
import HotAuthor from '../component/hotauthor/HotAuthor.jsx';
import Dynamic from '../component/dynamic/Dynamic.jsx';

class Home extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  show() {
    $(this.element).removeClass('fn-hide');
  }
  hide() {
    $(this.element).addClass('fn-hide');
  }
  render() {
    return <div class="home">
      <h4>
        <span>主打作品</span>
        <small>{ '未来会根据你的口味进行精准智能的推送！>3<' }</small>
      </h4>
      <HotWork ref="hotWork" dataList={ this.props.homeDetail.Hot_Works_Items }/>
      <HotMusicAlbum ref="hotCollection" title="专辑" dataList={ this.props.album }/>
      <h4>
        <span>合作关系</span>
        <small>{ '我们会邀请更多作者入驻！也诚邀你在转圈发布作品、交流创作>3<' }</small>
      </h4>
      <HotAuthor ref="hotAuthor" dataList={ this.props.homeDetail.AuthorToAuthor }/>
    </div>;
  }
}

export default Home;
