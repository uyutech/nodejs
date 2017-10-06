/**
 * Created by army on 2017/5/20.
 */

let util = {
  goto: function(url) {
    location.href = url;
  },
  img192_192: function(url) {
    return url ? url + '-192_192' : url;
  },
  img144_144: function(url) {
    return url ? url + '-144_144' : url;
  },
  img100_100: function(url) {
    return url ? url + '-100_100' : url;
  },
  ERROR_MESSAGE: '人气大爆发，请稍后再试。'
};

export default util;
