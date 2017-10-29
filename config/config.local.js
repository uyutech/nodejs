/**
 * Created by army8735 on 2017/10/1.
 */

'use strict';

module.exports = appInfo => {
  return {
    hotDeploy: true,
    session: {
      key: 'sessionid',
      maxAge: 24 * 3600 * 1000,
      domain: 'dev.circling.cc2',
    },
  };
};
