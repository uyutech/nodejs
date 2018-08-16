/**
 * Created by army8735 on 2018/8/15.
 */

'use strict';

import SparkMd5 from 'spark-md5';
import $net from '../../d/common/net';
import $util from '../../d/common/util';

class Upload extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  @bind originId
  @bind isUploadingAudio
  @bind audioUrl
  @bind audioProgress
  @bind isUploadingImg
  @bind imgUrl
  @bind imgProgress
  @bind describe
  @bind uploading
  @bind disabled
  changeOrigin(e, vd, tvd) {
    this.originId = tvd.props.value;
  }
  clickAudio(e) {
    if(this.isUploadingAudio) {
      e.preventDefault();
    }
  }
  changeAudio(e) {
    let self = this;
    if(self.isUploadingAudio) {
      e.preventDefault();
      return;
    }
    let file = e.target.files[0];
    let size = file.size;
    if(size && size > 1024 * 1024 * 20) {
      alert('文件不能超过20M！');
      return;
    }
    self.isUploadingAudio = true;
    self.audioProgress = 0;
    let fileReader = new FileReader();
    fileReader.onload = function() {
      let spark = new SparkMd5.ArrayBuffer();
      spark.append(fileReader.result);
      let md5 = spark.end();
      let name = md5 + '.mp3';
      $net.postJSON('/h5/my/stsAudio', { name }, function(res) {
        if(res.success) {
          let data = res.data;
          if(data.exist) {
            self.isUploadingAudio = false;
            self.audioUrl = '//zhuanquan.net.cn/audio/' + name;
            self.audioProgress = 1;
            return;
          }
          let key = data.prefix + name;
          let policy = data.policy;
          let signature = data.signature;
          let host = data.host;
          let accessKeyId = data.accessKeyId;
          let form = new FormData();
          form.append('key', key);
          form.append('OSSAccessKeyId', accessKeyId);
          form.append('success_action_status', 200);
          form.append('policy', policy);
          form.append('signature', signature);
          form.append('file', file);
          let xhr = new XMLHttpRequest();
          xhr.open('post', host, true);
          xhr.onload = function() {
            if(xhr.status === 200) {
              self.isUploadingAudio = false;
              self.audioUrl = '//zhuanquan.net.cn/audio/' + name;
              self.audioProgress = 1;
            }
          };
          xhr.upload.onprogress = function(e) {
            self.audioProgress = e.loaded / e.total;
          };
          xhr.send(form);
        }
        else {
          alert(res.message || $util.ERROR_MESSAGE);
        }
      }, function(res) {
        alert(res.message || $util.ERROR_MESSAGE);
      });
    };
    fileReader.readAsArrayBuffer(file);
  }
  clickImg(e) {
    if(this.isUploadingImg) {
      e.preventDefault();
    }
  }
  changeImg(e) {
    let self = this;
    if(self.isUploadingImg) {
      e.preventDefault();
      return;
    }
    let file = e.target.files[0];
    let size = file.size;
    if(size && size > 1024 * 1024 * 10) {
      alert('文件不能超过10M！');
      return;
    }
    let suffix;
    switch(file.type) {
      case 'image/png':
        suffix = '.png';
        break;
      case 'image/gif':
        suffix = '.gif';
        break;
      case 'image/jpeg':
        suffix = '.jpg';
        break;
    }
    self.isUploadingImg = true;
    self.imgProgress = 0;
    let fileReader = new FileReader();
    fileReader.onload = function() {
      self.preview = fileReader.result;
      let spark = new SparkMd5();
      spark.append(fileReader.result);
      let md5 = spark.end();
      let name = md5 + suffix;
      $net.postJSON('/h5/my/sts', { name }, function(res) {
        if(res.success) {
          let data = res.data;
          if(data.exist) {
            self.isUploadingImg = false;
            self.imgUrl = '//zhuanquan.xyz/pic/' + name;
            self.imgProgress = 1;
            return;
          }
          let key = data.prefix + name;
          let policy = data.policy;
          let signature = data.signature;
          let host = data.host;
          let accessKeyId = data.accessKeyId;
          let form = new FormData();
          form.append('key', key);
          form.append('OSSAccessKeyId', accessKeyId);
          form.append('success_action_status', 200);
          form.append('policy', policy);
          form.append('signature', signature);
          form.append('file', file);
          let xhr = new XMLHttpRequest();
          xhr.open('post', host, true);
          xhr.onload = function() {
            if(xhr.status === 200) {
              self.isUploadingImg = false;
              self.imgUrl = '//zhuanquan.xyz/pic/' + name;
              self.imgProgress = 1;
            }
          };
          xhr.upload.onprogress = function(e) {
            self.imgProgress = e.loaded / e.total;
          };
          xhr.send(form);
        }
        else {
          alert(res.message || $util.ERROR_MESSAGE);
        }
      }, function(res) {
        alert(res.message || $util.ERROR_MESSAGE);
      });
    };
    fileReader.readAsDataURL(file);
  }
  submit() {
    let self = this;
    if(self.isUploadingAudio) {
      alert('正在上传音频，请稍后');
      return;
    }
    if(self.isUploadingImg) {
      alert('正在上传海报，请稍后');
      return;
    }
    if(!self.originId) {
      alert('请选择参赛作品的原作曲目');
      return;
    }
    if(!self.audioUrl) {
      alert('请先上传翻唱歌曲');
      return;
    }
    if(self.uploading) {
      return;
    }
    $net.postJSON('join', {
      originId: self.originId,
      audioUrl: self.audioUrl,
      describe: self.describe,
      imgUrl: self.imgUrl,
    }, function(res) {
      if(res.success) {
        alert('#新起点，新奇点##2018 西安曲漫#\n我参与了丝绸之路古风歌曲翻唱活动\n@水墨映像CINK');
        location.href = '/sczl/works/' + res.data.id;
      }
      else {
        alert(res.message || $util.ERROR_MESSAGE);
      }
      self.uploading = false;
    }, function(res) {
      alert(res.message || $util.ERROR_MESSAGE);
      self.uploading = false;
    });
  }
  render() {
    let originWorks = this.props.originWorks;
    return <div class="upload">
      <div class="origin">
        <h3>请选择参赛作品的原作曲目</h3>
        <ul class="fn-clear"
            onChange={ { input: this.changeOrigin } }>
          {
            originWorks.map((item) => {
              if(!item) {
                return;
              }
              return <li>
                <input type="radio"
                       name="origin"
                       value={ item.id }/>
                <span>{ item.title }</span>
              </li>;
            })
          }
        </ul>
      </div>
      <div class="audio">
        <div class="button">
          <span>上传音频文件</span>
          <input type="file"
                 accept="audio/mpeg"
                 onClick={ this.clickAudio }
                 onChange={ this.changeAudio }/>
        </div>
        <div class="progress">
          <span style={ 'width:' + ((this.audioProgress || 0) * 100) + '%' }/>
        </div>
        <p>必需，请上传不超过20M的成品MP3音频文件。</p>
      </div>
      <div class="img">
        <div class="button">
          <span>上传海报</span>
          <input type="file"
                 accept="image/*"
                 onClick={ this.clickImg }
                 onChange={ this.changeImg }/>
        </div>
        <div class="progress">
          <span style={ 'width:' + ((this.imgProgress || 0) * 100) + '%' }/>
        </div>
        <p>可选，支持jpg/png格式，大小不超过10M。</p>
      </div>
      <div class="desc">
        <h3>填写参赛说明</h3>
        <textarea>{ this.describe }</textarea>
      </div>
      <button class="sub"
              disabled={ this.disabled }
              onClick={ this.submit }>提交</button>
    </div>;
  }
}

export default Upload;
