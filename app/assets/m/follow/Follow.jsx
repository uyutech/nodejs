/**
 * Created by army8735 on 2017/11/29.
 */

'use strict';

import HotUser from '../component/hotuser/HotUser.jsx';
import HotAuthor from '../component/hotauthor/HotAuthor.jsx';

class Follow extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      // self.autoWidth();
    });
  }
  // autoWidth() {
  //   let $list = $(this.ref.circles.element);
  //   let $c = $list.find('.c');
  //   $c.css('width', '9999rem');
  //   let $elem = $c.children();
  //   $c.css('width', $elem.width() + 1);
  // }
  render() {
    return <div class="follow">
      {/*<h4>关注话题</h4>*/}
      {/*<div class="circles" ref="circles">*/}
        {/*<div class="c">*/}
          {/*<ul>*/}
            {/*{*/}
              {/*(this.props.hotCircle || []).map(function(item) {*/}
                {/*return <li rel={ item.Cid }><a href={ '/circle/' + item.Cid }>{ item.CirclingName }</a></li>;*/}
              {/*}.bind(this))*/}
            {/*}*/}
          {/*</ul>*/}
        {/*</div>*/}
      {/*</div>*/}
      <h4>关注作者</h4>
      <HotAuthor ref="hotAuthor" empty={ '你还没有关注作者哦，快去发现页看看有没有喜欢的作者吧！' } dataList={ this.props.follows }/>
      <h4>关注圈er</h4>
      <HotUser ref="hotuser" empty={ '你还没有关注的圈er哦，快去转圈页看看有没有有趣的小伙伴吧~' } dataList={ this.props.userFollows }/>
      <h4>关注我的</h4>
      <HotUser ref="hotuser" empty={ '还没有人关注你哦，快去转圈页看看有没有有趣的小伙伴吧~' } dataList={ this.props.userFans }/>
    </div>;
  }
}

export default Follow;
