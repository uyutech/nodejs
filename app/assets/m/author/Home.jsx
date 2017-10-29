/**
 * Created by army on 2017/6/24.
 */

import HotWork from '../component/hotwork/HotWork.jsx';
import HotCollection from '../component/hotphotoalbum/HotCollection.jsx';
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
      <HotWork ref="hotWork" title="主打作品" dataList={ this.props.homeDetail.Hot_Works_Items }/>
      <HotCollection ref="hotCollection" title="专辑"/>
      <HotAuthor ref="hotAuthor" title="合作关系" dataList={ this.props.homeDetail.AuthorToAuthor }/>
      <Dynamic title="全网动态"/>
    </div>;
  }
}

export default Home;
