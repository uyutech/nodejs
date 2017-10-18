/**
 * Created by army8735 on 2017/10/18.
 */

'use strict';

import Title from '../works/Title.jsx';

class Collection extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  render() {
    return <div class="collection fn-clear">
      <Title ref="title"
             detail={ {} }/>
    </div>;
  }
}

export default Collection;
