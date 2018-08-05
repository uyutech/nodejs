/**
 * Created by army8735 on 2018/7/28.
 */

'use strict';

import $net from '../../common/net';
import $util from '../../common/util';
import SparkMd5 from 'spark-md5';

const STATE = {
  LOADING: 0,
  SENDING: 1,
  LOADED: 2,
  ERROR: 3,
};
const TEXT = {
  0: '读取中...',
  1: '上传中...',
  2: '',
  3: '加载失败',
};
const MAX_TEXT_LENGTH = 4096;
const MAX_IMG_NUM = 9;

let first = true;
let user;
let author;
let useAuthor;
let uploading;
let imgNum = 0;
let uuid = 0;
let audioXhr;
let videoXhr;
let audioUrl;
let videoUrl;

class Post extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.visible = self.props.visible;
    self.name = $CONFIG.nickname;
    self.num = 0;
    self.list = [];
    self.invalid = true;
    self.on(migi.Event.DATA, function(k) {
      let v = self[k];
      if(v) {
        self.ref.text.element.focus();
      }
    });
  }
  get visible() {
    return this._visible;
  }
  @bind
  set visible(v) {
    let self = this;
    self._visible = v;
    if(v && first) {
      first = false;
      self.useAuthor = !!localStorage.getItem('useAuthor');
      $net.postJSON('/api/my/allIdentities', function(res) {
        if(res.success) {
          let data = res.data;
          user = data.user;
          author = data.author;
          if(self.useAuthor && author && author.length) {
            self.name = author[0].name;
            self.headUrl = author[0].headUrl;
          }
          else {
            self.name = user.nickname;
            self.headUrl = user.headUrl;
          }
        }
        else {
          alert(res.message || $util.ERROR_MESSAGE);
        }
      }, function(res) {
        alert(res.message || $util.ERROR_MESSAGE);
      });
    }
  }
  @bind headUrl
  @bind name
  @bind useAuthor
  @bind num
  @bind invalid
  @bind list
  @bind sending
  @bind text
  @bind uploadingAudio
  @bind audioName
  @bind audioProgress
  @bind audioClose
  @bind uploadingVideo
  @bind videoName
  @bind videoProgress
  @bind videoClose
  close() {
    this.visible = false;
  }
  clickAlt() {
    if(author && author.length) {
      this.useAuthor = !this.useAuthor;
      if(this.useAuthor) {
        localStorage.setItem('useAuthor', 1);
        this.name = author[0].name;
        this.headUrl = author[0].headUrl;
      }
      else {
        localStorage.removeItem('useAuthor');
        this.name = user.nickname;
        this.headUrl = user.headUrl;
      }
    }
  }
  input(e, vd) {
    let self = this;
    let $vd = $(vd.element);
    let content = $vd.val().trim();
    self.num = content.length;
    self.invalid = content.length < 3 || content.length > MAX_TEXT_LENGTH;
  }
  clickFile(e) {
    if(uploading) {
      e.preventDefault();
      return;
    }
    if(imgNum >= MAX_IMG_NUM) {
      e.preventDefault();
      alert('图片最多不能超过' + MAX_IMG_NUM + '张哦~');
    }
  }
  change(e) {
    let self = this;
    if(uploading) {
      e.preventDefault();
      return;
    }
    if(imgNum >= MAX_IMG_NUM) {
      e.preventDefault();
      alert('图片最多不能超过' + MAX_IMG_NUM + '张哦~');
      return;
    }
    uploading = true;
    let files = e.target.files;
    let count = 0;
    let all = files.length;
    for(let i = 0, len = all; i < len; i++) {
      if(i + imgNum >= MAX_IMG_NUM) {
        all = i;
        alert('图片最多不能超过' + MAX_IMG_NUM + '张哦~超出部分将自动忽略~');
        return;
      }
      let file = files[i];
      let size = file.size;
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
      if(size && size <= 10485760) {
        let fileReader = new FileReader();
        let weight = uuid++;
        fileReader.onload = function() {
          let spark = new SparkMd5();
          spark.append(fileReader.result);
          let md5 = spark.end();
          let has;
          for(let j = 0, len = self.list.length; j < len; j++) {
            if(self.list[j].md5 === md5) {
              has = true;
              break;
            }
          }
          if(has) {
            return;
          }
          let index = 0;
          let find;
          for(let j = 0, len = self.list.length; j < len; j++) {
            if(self.list[j].weight > weight) {
              index = j;
              find = true;
              break;
            }
          }
          if(!find) {
            index = self.list.length;
          }
          self.list.splice(index, 0, {
            weight,
            url: fileReader.result,
            state: STATE.LOADING,
          });
          let node = document.createElement('img');
          node.style.position = 'absolute';
          node.style.left = '-9999rem';
          node.style.top = '-9999rem';
          node.src = fileReader.result;
          node.onload = function() {
            for(let j = 0, len = self.list.length; j < len; j++) {
              if(self.list[j].weight === weight) {
                self.list[j].width = node.width;
                self.list[j].height = node.height;
                if(self.list[j].state === STATE.LOADING) {
                  self.list[j].state = STATE.SENDING;
                }
                self.list.splice(j, 1, self.list[j]);
                break;
              }
            }
            document.body.removeChild(node);
          };
          document.body.appendChild(node);
          $net.postJSON('/h5/my/sts', { name: md5 + suffix }, function(res) {
            if(res.success) {
              let data = res.data;
              if(data.exist) {
                for(let j = 0, len = self.list.length; j < len; j++) {
                  if(self.list[j].weight === weight) {
                    self.list[j].url = '//zhuanquan.xyz/pic/' + md5 + suffix;
                    self.list[j].state = STATE.LOADED;
                    self.list.splice(j, 1, self.list[j]);
                    count++;
                    if(count === all) {
                      uploading = false;
                      imgNum = self.list.length;
                    }
                    break;
                  }
                }
                return;
              }
              let name = md5 + suffix;
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
                  for(let j = 0, len = self.list.length; j < len; j++) {
                    if(self.list[j].weight === weight) {
                      self.list[j].url = '//zhuanquan.xyz/pic/' + md5 + suffix;
                      self.list[j].state = STATE.LOADED;
                      self.list.splice(j, 1, self.list[j]);
                      count++;
                      if(count === all) {
                        uploading = false;
                        imgNum = self.list.length;
                      }
                      break;
                    }
                  }
                }
              };
              xhr.send(form);
            }
            else {
              for(let j = 0, len = self.list.length; j < len; j++) {
                if(self.list[j].weight === weight) {
                  self.list[j].state = STATE.ERROR;
                  self.list.splice(j, 1, self.list[j]);
                  imgNum = self.list.length;
                  break;
                }
              }
              alert(res.message || $util.ERROR_MESSAGE);
            }
          }, function(res) {
            for(let j = 0, len = self.list.length; j < len; j++) {
              if(self.list[j].weight === weight) {
                self.list[j].state = STATE.ERROR;
                self.list.splice(j, 1, self.list[j]);
                imgNum = self.list.length;
                break;
              }
            }
            alert(res.message || $util.ERROR_MESSAGE);
          });
        };
        fileReader.readAsDataURL(file);
      }
      else {
        alert('图片最大不能超过10m！');
      }
    }
  }
  clickImg(e, vd, tvd) {
    let self = this;
    let weight = tvd.props.rel;
    for(let j = 0, len = self.list.length; j < len; j++) {
      if(self.list[j].weight === weight) {
        if(self.list[j].state === STATE.LOADED || self.list[j].state === STATE.ERROR) {
          self.list.splice(j, 1);
          imgNum = self.list.length;
          break;
        }
      }
    }
  }
  clickAudio(e) {
    if(this.uploadingAudio || audioUrl) {
      e.preventDefault();
    }
  }
  changeAudio(e) {
    if(this.uploadingAudio || audioUrl) {
      e.preventDefault();
      return;
    }
    let self = this;
    let file = e.target.files[0];
    let size = file.size;
    if(size && size > 1024 * 1024 * 20) {
      alert('文件不能超过20M！');
      return;
    }
    self.audioProgress = 0;
    self.uploadingAudio = true;
    self.audioName = file.name;
    let fileReader = new FileReader();
    fileReader.onload = function() {
      let spark = new SparkMd5.ArrayBuffer();
      spark.append(fileReader.result);
      let md5 = spark.end();
      let name = md5 + '.mp3';
      $net.postJSON('/h5/my/stsAudio', { name }, function(res) {
        self.audioClose = true;
        if(res.success) {
          let data = res.data;
          if(data.exist) {
            self.uploadingAudio = false;
            audioUrl = '//zhuanquan.net.cn/audio/' + name;
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
          audioXhr = new XMLHttpRequest();
          audioXhr.open('post', host, true);
          audioXhr.onload = function() {
            if(audioXhr.status === 200) {
              self.uploadingAudio = false;
              audioUrl = '//zhuanquan.net.cn/audio/' + name;
              self.audioProgress = 1;
            }
          };
          audioXhr.upload.onprogress = function(e) {
            self.audioProgress = e.loaded / e.total;
          };
          audioXhr.send(form);
        }
        else {
          alert(res.message || $util.ERROR_MESSAGE);
        }
      }, function(res) {
        alert(res.message || $util.ERROR_MESSAGE);
        self.audioClose = true;
      });
    };
    fileReader.readAsArrayBuffer(file);
  }
  closeAudio() {
    audioUrl = null;
    this.audioName = null;
    this.audioProgress = 0;
    this.ref.audio.element.value = '';
    this.audioClose = false;
    if(audioXhr) {
      audioXhr.abort();
      audioXhr = null;
    }
  }
  clickVideo(e) {
    if(this.uploadingVideo || videoUrl) {
      e.preventDefault();
    }
  }
  changeVideo(e) {
    if(this.uploadingVideo || videoUrl) {
      e.preventDefault();
      return;
    }
    let self = this;
    let file = e.target.files[0];
    let size = file.size;
    if(size && size > 1024 * 1024 * 200) {
      alert('文件不能超过200M！');
      return;
    }
    self.videoProgress = 0;
    self.uploadingVideo = true;
    self.videoName = file.name;
    let fileReader = new FileReader();
    fileReader.onload = function() {
      let spark = new SparkMd5.ArrayBuffer();
      spark.append(fileReader.result);
      let md5 = spark.end();
      let name = md5 + '.mp4';
      $net.postJSON('/h5/my/stsVideo', { name }, function(res) {
        self.videoClose = true;
        if(res.success) {
          let data = res.data;
          if(data.exist) {
            self.uploadingVideo = false;
            videoUrl = '//zhuanquan.net.cn/video/' + name;
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
          videoXhr = new XMLHttpRequest();
          videoXhr.open('post', host, true);
          videoXhr.onload = function() {
            if(videoXhr.status === 200) {
              self.uploadingVideo = false;
              videoUrl = '//zhuanquan.net.cn/video/' + name;
              self.videoProgress = 1;
            }
          };
          videoXhr.upload.onprogress = function(e) {
            self.videoProgress = e.loaded / e.total;
          };
          videoXhr.send(form);
        }
        else {
          alert(res.message || $util.ERROR_MESSAGE);
        }
      }, function(res) {
        alert(res.message || $util.ERROR_MESSAGE);
        self.videoClose = true;
      });
    };
    fileReader.readAsArrayBuffer(file);
  }
  closeVideo() {
    videoUrl = null;
    this.videoName = null;
    this.videoProgress = 0;
    this.ref.video.element.value = '';
    this.videoClose = false;
    if(videoXhr) {
      videoXhr.abort();
      videoXhr = null;
    }
  }
  sub() {
    let self = this;
    if(!self.sending && !self.invalid && !uploading && !self.uploadingAudio && !self.uploadingVideo) {
      let image = [];
      self.list.forEach(function(item) {
        if(item.state === STATE.LOADED) {
          image.push({
            url: item.url,
            width: item.width || 0,
            height: item.height || 0,
          });
        }
      });
      if(self.list.length > image.length) {
        if(window.confirm('尚有未上传成功的图片，继续提交吗？')) {
          self.submitConfirm(image);
        }
      }
      else {
        self.submitConfirm(image);
      }
    }
  }
  submitConfirm(image) {
    let self = this;
    self.sending = true;
    let authorId;
    if(this.useAuthor && author && author.length) {
      authorId = author[0].id;
    }
    $net.postJSON('/h5/subPost/sub', {
      content: self.text,
      image: JSON.stringify(image),
      audioUrl,
      videoUrl,
      authorId,
    }, function(res) {
      if(res.success) {
        let data = res.data;
        location.href = '/post/' + data.id;
      }
      else {
        alert(res.message || $util.ERROR_MESSAGE);
      }
      self.sending = false;
    }, function(res) {
      alert(res.message || $util.ERROR_MESSAGE);
      self.sending = false;
    });
  }
  render() {
    return <div class={ 'cp-post' + (this.visible ? '' : ' fn-hide') }>
      <div class="con">
        <div class="h">
          <h5>画个圈发布你的状态吧~</h5>
          <span onClick={ this.close }>X</span>
        </div>
        <div class={ 'u' + (this.useAuthor ? ' author' : ' user') }
             onClick={ this.clickAlt }>
          <img src={ $util.img(this.headUrl, 64, 64, 80) || '//zhuanquan.xin/head/head.png' }/>
          <span>{ this.name }</span>
        </div>
        <div class="t">
          <textarea ref="text"
                    placeholder="画个圈记录你的生活吧~"
                    maxLength={ MAX_TEXT_LENGTH }
                    onInput={ this.input }>{ this.text }</textarea>
          <span>{ this.num + '/' + MAX_TEXT_LENGTH }</span>
        </div>
        <ul class="i fn-clear"
            onClick={ { li: this.clickImg } }>
        {
          (this.list || []).map((item) => {
            return <li class={ 's' + item.state }
                       rel={ item.weight }
                       style={ 'background-image:url(' + $util.img(item.url, 120, 120, 80) + ')' }>
              <span>{ TEXT[item.state] }</span>
            </li>;
          })
        }
        </ul>
        <div class="av">
          <div class={ 'name' + (this.audioName ? '' : ' fn-hide') }>
            <b class="p" style={ 'width:' + this.audioProgress * 100 + '%' }/>
            <span>{ this.audioName }</span>
          </div>
          <b class={ 'close' + (this.audioClose ? '' : ' fn-hide') }
             onClick={ this.closeAudio }/>
          <div class={ 'name' + (this.videoName ? '' : ' fn-hide') }>
            <b class="p v" style={ 'width:' + this.videoProgress * 100 + '%' }/>
            <span>{ this.videoName }</span>
          </div>
          <b class={ 'close' + (this.videoClose ? '' : ' fn-hide') }
             onClick={ this.closeVideo }/>
        </div>
        <div class="f">
          <div class="pic">
            <input type="file"
                   accept="image/gif, image/jpeg, image/png"
                   multiple="multiple"
                   onClick={ this.clickFile }
                   onChange={ this.change }/>
          </div>
          <div class="audio">
            <input type="file"
                   ref="audio"
                   accept="audio/mpeg"
                   onClick={ this.clickAudio }
                   onChange={ this.changeAudio }/>
          </div>
          <div class="video">
            <input type="file"
                   ref="video"
                   accept="video/mp4"
                   onClick={ this.clickVideo }
                   onChange={ this.changeVideo }/>
          </div>
          <button disabled={ this.invalid || this.sending || this.uploadingAudio || this.uploadingVideo }
                  onClick={ this.sub }>发布</button>
        </div>
      </div>
    </div>;
  }
}

export default Post;
