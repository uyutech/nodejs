/**
 * Created by army8735 on 2017/12/1.
 */

'use strict';

import util from "../../d/common/util";
import net from "../../d/common/net";
import HotPlayList from '../component/hotplaylist/HotPlayList.jsx';
import Page from '../component/page/Page.jsx';

let take = 10;
let skip = take;
let hidden;

class MAList extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      let page = self.ref.page;
      let page2 = self.ref.page2;
      page.on('page', function(i) {
        if(page2) {
          page2.index = i;
        }
        skip = (i - 1) * take;
        self.load();
      });
      if(page2) {
        page2.on('page', function(i) {
          page.index = i;
          skip = (i - 1) * take;
          self.load();
        });
      }
    });
  }
  load() {
    let self = this;
    let hotPlayList = self.ref.hotPlayList;
    net.postJSON('/api/author/maList', { authorID: self.props.authorID, skip, take }, function(res) {
      if(res.success) {
        let data = res.data;
        hotPlayList.dataList = data.data;
      }
      else {
        alert(res.message || util.ERROR_MESSAGE);
      }
    }, function(res) {
      alert(res.message || util.ERROR_MESSAGE);
    });
  }
  show() {
    let self = this;
    $(self.element).removeClass('fn-hide');
    hidden = false;
  }
  hide() {
    let self = this;
    $(self.element).addClass('fn-hide');
    hidden = true;
  }
  render() {
    let size = this.props.dataList.Size;
    return <div class={ 'ma-list' + (this.props.hidden ? ' fn-hide' : '') + (this.props.first ? ' first' : '') }>
      <h4>列表</h4>
      <Page ref="page" total={ Math.ceil(size / take) }/>
      <HotPlayList ref="hotPlayList" dataList={ this.props.dataList.data }/>
      {
        size > take
          ? <Page ref="page2" total={ Math.ceil(size / take) }/>
          : ''
      }
    </div>;
  }
}

export default MAList;
