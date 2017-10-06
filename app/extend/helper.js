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
    return 'http://172.19.118.93/' + url.replace(/^\//, '');
  },
};
