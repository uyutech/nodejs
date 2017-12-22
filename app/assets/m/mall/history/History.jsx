/**
 * Created by army8735 on 2017/12/22.
 */

'use strict';

class History extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  render() {
    return <div class="history">
      <ul class="type">
        <li><a href="/mall">圈商城</a></li>
        <li><a href="/mall/new">新福利</a></li>
        <li><a href="/mall/wait">等待收货</a></li>
        <li><a href="/mall/history" class="cur">过往福利</a></li>
      </ul>
      <p>这里空空的，再去转转圈吧~</p>
    </div>;
  }
}

export default History;
