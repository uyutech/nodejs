/**
 * Created by army8735 on 2018/3/10.
 */

'use strict';

class BotNav extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  render() {
    return <div class="g-bot">
      <ul>
        <li><a href="">转圈官博</a></li>
        <li><a href="">关于转圈</a></li>
        <li><a href="">联系我们</a></li>
      </ul>
      <p>© Uyutech all rights reserved © 杭州呦悠网络科技有限公司 保留所有权利</p>
    </div>;
  }
}

export default BotNav;
