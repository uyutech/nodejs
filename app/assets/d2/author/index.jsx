/**
 * Created by army8735 on 2018/3/29.
 */

'use strict';

import Author from './Author.jsx';

let author = migi.preExist(
  <Author authorId={ $CONFIG.authorId }
         info={ $CONFIG.info }
         aliases={ $CONFIG.aliases }
         outsides={ $CONFIG.outsides }
         comment={ $CONFIG.comment }/>
);
