
/**
 * Created by army8735 on 2017/10/1.
 */

'use strict';

module.exports = appInfo => {
  return {
    hotDeploy: true,
    session: {
      key: 'sessionid',
      domain: 'dev.circling.cc2',
    },
    redis: {
      password: 'uyuTech123',
    },
    database: {
      circling: {
        name: 'circling',
        username: 'root',
        password: '87351984@',
        host: 'localhost',
      },
      mall: {
        name: 'mall',
        username: 'root',
        password: '87351984@',
        host: 'localhost',
      },
      recommend: {
        name: 'recommend',
        username: 'root',
        password: '87351984@',
        host: 'localhost',
      },
      stats: {
        name: 'stats',
        username: 'root',
        password: '87351984@',
        host: 'localhost',
      },
    },
  };
};