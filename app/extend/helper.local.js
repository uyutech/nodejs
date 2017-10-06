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
    return 'http://test.circling.cc/' + url.replace(/^\//, '');
  },
};
