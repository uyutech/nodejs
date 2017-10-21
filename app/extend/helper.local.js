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
  * postServiceJSON(url, data) {
    if(url.indexOf('//') === -1) {
      url = 'http://192.168.0.3/' + url.replace(/^\//, '');
    }
    let start = Date.now();
    let res;
    try {
      res = yield this.ctx.curl(url, {
        method: 'POST',
        data,
        dataType: 'json',
        gzip: true,
      });
    }
    catch(e) {
      let end = Date.now();
      this.ctx.getLogger('serviceLogger').error('[-/-/%s/%sms POST %s]', this.ctx.traceID, end - start, url);
      throw new Error(e);
    }
    let end = Date.now();
    this.ctx.getLogger('serviceLogger').info('[-/-/%s/%sms POST %s]', this.ctx.traceID, end - start, url);
    return res;
  },
  getStat() {
    return '';
  },
  weiboAppKey: '1987340303',
  weiboAppSecret: 'ae82c745736d8dc78230d96388790b22',
  weiboRedirect: 'http://dev.circling.cc/oauth/login',
  rhymeAppKey: '2120765784',
  rhymeAppSecret: '1db3207ed08ac5224a680898bbe10540',
  rhymeRedirect: 'http://dev.rhymesland.com/oauth/rhymeLogin',
};
