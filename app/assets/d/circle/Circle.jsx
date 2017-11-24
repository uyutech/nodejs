/**
 * Created by army8735 on 2017/11/5.
 */

'use strict';

import net from '../common/net';
import util from '../common/util';

import Title from './Title.jsx';
import SubPost from '../component/subpost/SubPost.jsx';
import Page from '../component/page/Page.jsx';
import HotPost from '../component/hotpost/HotPost.jsx';

let skip = 0;
let take = 20;
let loading;

class Circle extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      let page = self.ref.page;
      let page2 = self.ref.page2;
      page.on('page', function(i) {
        page2.index = i;
        skip = (i - 1) * take;
        self.loadPage();
      });
      page2.on('page', function(i) {
        page.index = i;
        skip = (i - 1) * take;
        self.loadPage();
      });
      self.ref.subPost.on('add_post', function(data) {
        self.ref.hotPost.addData(data);
        self.ref.main.element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    });
  }
  loadPage() {
    if(loading) {
      return;
    }
    loading = true;
    let self = this;
    net.postJSON('/api/circle/list', { circleID: $CONFIG.circleID, skip, take }, function(res) {
      if(res.success) {
        let data = res.data;
        self.ref.hotPost.setData(data.data);
        self.ref.main.element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
      else {
        alert(res.message || util.ERROR_MESSAGE);
      }
      loading = false;
    }, function(res) {
      alert(res.message || util.ERROR_MESSAGE);
      loading = false;
    });
  }
  render() {
    return <div class="circle fn-clear">
      <Title circleDetail={ this.props.circleDetail } ref="title"/>
      <div class="main" ref="main">
        <Page ref="page" total={ Math.ceil(this.props.postList.Size / take) }/>
        <HotPost ref="hotPost" data={ this.props.postList.data }/>
        <Page ref="page2" total={ Math.ceil(this.props.postList.Size / take) }/>
      </div>
      <SubPost ref="subPost" placeholder={ '在' + this.props.circleDetail.TagName +'圈画个圈吧。小小的提示：现在可以把一个圈画在好几个圈子里哦！' }
               circleID={ this.props.circleDetail.TagID } circleName={ this.props.circleDetail.TagName }
               to={ this.props.hotCircleList }/>
    </div>;
  }
}

export default Circle;
