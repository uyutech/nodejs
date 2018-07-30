/**
 * Created by army8735 on 2018/6/30.
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
  @bind isUploadingVideo
  @bind videoUrl
  @bind videoProgress
  @bind describe
  @bind uploading
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
  clickVideo(e) {
    if(this.isUploadingVideo) {
      e.preventDefault();
    }
  }
  changeVideo(e) {
    let self = this;
    if(self.isUploadingVideo) {
      e.preventDefault();
      return;
    }
    let file = e.target.files[0];
    let size = file.size;
    if(size && size > 1024 * 1024 * 200) {
      alert('文件不能超过2t00M！');
      return;
    }
    self.isUploadingVideo = true;
    self.videoProgress = 0;
    let fileReader = new FileReader();
    fileReader.onload = function() {
      let spark = new SparkMd5.ArrayBuffer();
      spark.append(fileReader.result);
      let md5 = spark.end();
      let name = md5 + '.mp4';
      $net.postJSON('/h5/my/stsVideo', { name }, function(res) {
        if(res.success) {
          let data = res.data;
          if(data.exist) {
            self.isUploadingVideo = false;
            self.videoUrl = '//zhuanquan.net.cn/video/' + name;
            self.videoProgress = 1;
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
              self.isUploadingVideo = false;
              self.videoUrl = '//zhuanquan.net.cn/video/' + name;
              self.videoProgress = 1;
            }
          };
          xhr.upload.onprogress = function(e) {
            self.videoProgress = e.loaded / e.total;
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
    if(self.isUploadingVideo) {
      alert('正在上传视频，请稍后');
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
    $net.postJSON('fcUpload', {
      originId: self.originId,
      audioUrl: self.audioUrl,
      describe: self.describe,
      imgUrl: self.imgUrl,
      videoUrl: self.videoUrl,
    }, function(res) {
      if(res.success) {
        alert('恭喜你上传成功啦！\n' +
          '你可以继续上传其他参赛作品~\n' +
          '但请勿重复提交同以作品~如需修改，请联系@异世谣 官博。')
        location.href = '/ysjxy/fc/' + res.data.id;
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
    let info = this.props.info;
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
      <div class="video">
        <div class="button">
          <span>上传视频文件</span>
          <input type="file"
                 accept="video/mp4"
                 onClick={ this.clickVideo }
                 onChange={ this.changeVideo }/>
        </div>
        <div class="progress">
          <span style={ 'width:' + ((this.videoProgress || 0) * 100) + '%' }/>
        </div>
        <p>可选，支持H264/AAC编码的MP4文件，大小不超过100M。</p>
      </div>
      <div class="desc">
        <h3>填写参赛说明</h3>
        <textarea>{ this.describe }</textarea>
      </div>
      <button class="sub"
              onClick={ this.submit }>提交</button>
    </div>;
  }
}

export default Upload;
