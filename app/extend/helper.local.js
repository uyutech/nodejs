/**
 * Created by army8735 on 2017/10/1.
 */

'use strict';

module.exports = {
  getAssetUrl(url) {
    if(url.indexOf('//') > -1) {
      return url;
    }
    return '/public' + url;
  },
  getRemoteUrl(url) {
    if(url.indexOf('//') > -1) {
      return url;
    }
    return 'http://192.168.0.3/' + url.replace(/^\//, '');
  },
  weiboAppKey: '1987340303',
  weiboAppSecret: 'ae82c745736d8dc78230d96388790b22',
  weiboRedirect: 'http://dev.circling.cc/oauth/login',
};
