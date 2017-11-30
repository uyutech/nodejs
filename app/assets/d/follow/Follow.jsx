/**
 * Created by army8735 on 2017/11/29.
 */

'use strict';

import net from '../common/net';
import util from '../common/util';
import Page from '../component/page/Page.jsx';
import HotUser from '../component/hotuser/HotUser.jsx';
import HotAuthor from '../component/hotauthor/HotAuthor.jsx';

class Follow extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  render() {
    return <div class="follow">
      <div class="c">
        {/*<h4>关注话题</h4>*/}
        {/*<ul class="circles" onClick={ { li: this.clickTag } }>*/}
          {/*{*/}
            {/*(this.props.hotCircle || []).map(function(item) {*/}
              {/*return <li rel={ item.Cid }><a href={ '/circle/' + item.Cid }>{ item.CirclingName }</a></li>;*/}
            {/*}.bind(this))*/}
          {/*}*/}
        {/*</ul>*/}
        <h4>关注作者</h4>
        <HotAuthor ref="hotAuthor" dataList={ this.props.follows }/>
        <h4>关注圈er</h4>
        <HotUser ref="userFollow" dataList={ this.props.userFollows }/>
        <h4>关注我的</h4>
        <HotUser ref="userFans" dataList={ this.props.userFans }/>
      </div>
    </div>;
  }
}

export default Follow;
