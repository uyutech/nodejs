/**
 * Created by army8735 on 2018/7/10.
 */

'use strict';

import Nav from '../common/Nav.jsx';

class Prize extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  render() {
    return <div class="prize">
      <Nav index={ 3 }/>
      <img class="wait"
           src="//zhuanquan.xin/img/f65a43134bfaf972bff5e06f5c51982c.png"/>
    </div>;
  }
}

export default Prize;
