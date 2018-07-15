/**
 * Created by army8735 on 2018/7/10.
 */

'use strict';

class Nav extends migi.Component {
  constructor(...data) {
    super(...data);
    this.index = this.props.index;
  }
  click(e, vd, tvd) {
    if(tvd.element.classList.contains('cur')) {
      e.preventDefault();
    }
  }
  render() {
    return <div class="mod-nav"
                onClick={ { a: this.click } }>
      <a href="/jsgm"
         class={ this.index === 0 ? 'cur' : '' }>首页</a>
      <a href="/jsgm/detail"
         class={ this.index === 1 ? 'cur' : '' }>活动详情</a>
      <a href="/jsgm/works"
         class={ this.index === 2 ? 'cur' : '' }>参赛作品</a>
      <a href="/jsgm/prize"
         class={ this.index === 3 ? 'cur' : '' }>获奖作品</a>
    </div>;
  }
}

export default Nav;
