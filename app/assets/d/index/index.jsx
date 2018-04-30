/**
 * Created by army8735 on 2018/3/10.
 */

'use strict';

import './index.less';

import Home from './Home.jsx';

let hash = location.hash || '';

hash = hash.replace(/^#/, '');

if(hash && /^\/\w+/.test(hash)) {
  location.href = hash;
}

let home = migi.preExist(<Home/>);
