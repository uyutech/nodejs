
/**
 * Created by army8735 on 2017/10/1.
 */

'use strict';

module.exports = appInfo => {
  return {
    hotDeploy: true,
    session: {
      key: 'sessionid',
      domain: 'circling.cc2',
    },
    redis: {
      client: {
        port: 6379,
        host: '127.0.0.1',
        db: 0,
      },
      time: 10,
      shortTime: 5,
      mediumTime: 30,
      longTime: 60,
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
      cms: {
        name: 'cms',
        username: 'root',
        password: '87351984@',
        host: 'localhost',
      },
    },
    weibo: {
      appKey: '1987340303',
      appSecret: 'ae82c745736d8dc78230d96388790b22',
      redirect: 'http://dev.circling.cc2/oauth/login',
    },
  };
};