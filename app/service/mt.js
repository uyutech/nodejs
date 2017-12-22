/**
 * Created by army8735 on 2017/12/16.
 */

'use strict';

const crypto = require('crypto');
const uuidv4 = require('uuid/v4');
const moment = require('moment');

module.exports = app => {
  class Service extends app.Service {
    * analysis(name) {
      // let timestamp = moment().utc().format('YYYY-MM-DD[T]HH:mm:ss[Z]');
      // let uuid = uuidv4();
      // let data = 'AccessKeyId=LTAI9ZiZpCA8r53F&Action=SubmitAnalysisJob&Format=JSON&Input='
      //   + encodeURIComponent(JSON.stringify({
      //     Bucket: 'circling-av',
      //     Location: 'oss-cn-shanghai',
      //     Object: 'video/7cf8ced0-32ff-4651-8924-53c2c063edb5.mp4',
      //   })) + '&PipelineId=f0c786d93d5c4eb48915d3b356fa4812&SignatureMethod=HMAC-SHA1&SignatureNonce=' + uuid
      //   + '&SignatureVersion=1.0&Timestamp=' + encodeURIComponent(timestamp) + '&Version=2014-06-18';
      // // console.log(111,data);
      // let str = encodeURIComponent(data);
      // let signature = 'GET&' + encodeURIComponent('/') + '&' + str;
      // // console.log(222,signature);
      // let hmac = crypto.createHmac('sha1', 'PAAKBv3gsRj6Q6yusDGmd3hQK66VGm&');
      // let Signature = hmac.update(signature).digest('base64');
      // data += '&Signature=' + encodeURIComponent(Signature);
      // // console.log(333,data);
      //
      // let res = yield this.ctx.curl('http://mts.cn-shanghai.aliyuncs.com/?' + data, {
      //   method: 'GET',
      //   dataType: 'json',
      //   gzip: true,
      // });
      // console.log(res.data);

      // let id = '18541c13c3664b77a0f15ff9dc98d798';
      // let timestamp2 = moment().utc().format('YYYY-MM-DD[T]HH:mm:ss[Z]');
      // let uuid2 = uuidv4();
      // let data2 = 'AccessKeyId=LTAI9ZiZpCA8r53F&Action=QueryAnalysisJobList&AnalysisJobIds='
      //   + id + '&Format=JSON&SignatureMethod=HMAC-SHA1&SignatureNonce=' + uuid2
      //   + '&SignatureVersion=1.0&Timestamp=' + encodeURIComponent(timestamp2)
      //   + '&Version=2014-06-18';
      // let str2 = encodeURIComponent(data2);
      // let signature2 = 'GET&' + encodeURIComponent('/') + '&' + str2;
      // let hmac2 = crypto.createHmac('sha1', 'PAAKBv3gsRj6Q6yusDGmd3hQK66VGm&');
      // let Signature2 = hmac2.update(signature2).digest('base64');
      // data2 += '&Signature=' + encodeURIComponent(Signature2);
      //
      // let res2 = yield this.ctx.curl('http://mts.cn-shanghai.aliyuncs.com/?' + data2, {
      //   method: 'GET',
      //   dataType: 'json',
      //   gzip: true,
      // });
      // console.log(JSON.stringify(res2.data.AnalysisJobList.AnalysisJob));

      // let timestamp = moment().utc().format('YYYY-MM-DD[T]HH:mm:ss[Z]');
      // let uuid = uuidv4();
      // let data = 'AccessKeyId=LTAI9ZiZpCA8r53F&Action=SubmitJobs&Format=JSON&Input='
      //   + encodeURIComponent(JSON.stringify({
      //     Bucket: 'circling-av',
      //     Location: 'oss-cn-shanghai',
      //     Object: 'video/7cf8ced0-32ff-4651-8924-53c2c063edb5.mp4',
      //   })) + '&OutputBucket=circling-mt&OutputLocation=oss-cn-shanghai&Outputs=' + encodeURIComponent(JSON.stringify([
      //     {
      //       OutputObject: uuidv4() + '.mp4',
      //       TemplateId: 'S00000000-200030',
      //       // WaterMarks: [{
      //       //   InputFile: {
      //       //     Bucket: 'circling-av',
      //       //     Location: 'oss-cn-shanghai',
      //       //     Object: 'watermark/logo.png',
      //       //   },
      //       //   WaterMarkTemplateId: 'e1c7b9489fbe4468b33266c88f4052c2',
      //       // }],
      //     }
      //   ])) + '&PipelineId=f0c786d93d5c4eb48915d3b356fa4812&SignatureMethod=HMAC-SHA1&SignatureNonce=' + uuid
      //   + '&SignatureVersion=1.0&Timestamp=' + encodeURIComponent(timestamp) + '&Version=2014-06-18';
      // let str = encodeURIComponent(data);
      // let signature = 'GET&' + encodeURIComponent('/') + '&' + str;
      // let hmac = crypto.createHmac('sha1', 'PAAKBv3gsRj6Q6yusDGmd3hQK66VGm&');
      // let Signature = hmac.update(signature).digest('base64');
      // data += '&Signature=' + encodeURIComponent(Signature);
      //
      // let res = yield this.ctx.curl('http://mts.cn-shanghai.aliyuncs.com/?' + data, {
      //   method: 'GET',
      //   dataType: 'json',
      //   gzip: true,
      // });
      // console.log(res.data);

      let timestamp = moment().utc().format('YYYY-MM-DD[T]HH:mm:ss[Z]');
      let uuid = uuidv4();
      let data = 'AccessKeyId=LTAI9ZiZpCA8r53F&Action=SubmitMediaInfoJob&Format=JSON&Input='
        + encodeURIComponent(JSON.stringify({
          Bucket: 'circling-av',
          Location: 'oss-cn-shanghai',
          Object: 'video/7cf8ced0-32ff-4651-8924-53c2c063edb5.mp4',
        })) + '&SignatureMethod=HMAC-SHA1&SignatureNonce=' + uuid
        + '&SignatureVersion=1.0&Timestamp=' + encodeURIComponent(timestamp) + '&Version=2014-06-18';
      // console.log(111,data);
      let str = encodeURIComponent(data);
      let signature = 'GET&' + encodeURIComponent('/') + '&' + str;
      // console.log(222,signature);
      let hmac = crypto.createHmac('sha1', 'PAAKBv3gsRj6Q6yusDGmd3hQK66VGm&');
      let Signature = hmac.update(signature).digest('base64');
      data += '&Signature=' + encodeURIComponent(Signature);
      // console.log(333,data);

      let res = yield this.ctx.curl('http://mts.cn-shanghai.aliyuncs.com/?' + data, {
        method: 'GET',
        dataType: 'json',
        gzip: true,
      });
      console.log(res.data.MediaInfoJob);

      // let timestamp2 = moment().utc().format('YYYY-MM-DD[T]HH:mm:ss[Z]');
      // let uuid2 = uuidv4();
      // let data2 = 'AccessKeyId=LTAI9ZiZpCA8r53F&Action=QueryMediaInfoJobList&Format=JSON'
      //   + '&MediaInfoJobIds=' + res.data.MediaInfoJob.JobId
      //   + '&SignatureMethod=HMAC-SHA1&SignatureNonce=' + uuid2
      //   + '&SignatureVersion=1.0&Timestamp=' + encodeURIComponent(timestamp2) + '&Version=2014-06-18';
      // // console.log(111,data);
      // let str2 = encodeURIComponent(data2);
      // let signature2 = 'GET&' + encodeURIComponent('/') + '&' + str2;
      // // console.log(222,signature);
      // let hmac2 = crypto.createHmac('sha1', 'PAAKBv3gsRj6Q6yusDGmd3hQK66VGm&');
      // let Signature2 = hmac2.update(signature2).digest('base64');
      // data2 += '&Signature=' + encodeURIComponent(Signature2);
      // // console.log(333,data);
      //
      // let res2 = yield this.ctx.curl('http://mts.cn-shanghai.aliyuncs.com/?' + data2, {
      //   method: 'GET',
      //   dataType: 'json',
      //   gzip: true,
      // });
      // console.log(res2.data.MediaInfoJobList.MediaInfoJob[0]);
    }
  }
  return Service;
};
