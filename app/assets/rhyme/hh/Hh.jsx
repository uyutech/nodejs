/**
 * Created by army8735 on 2018/7/5.
 */

'use strict';

import SparkMd5 from 'spark-md5';
import $net from '../../d/common/net';
import $util from '../../d/common/util';

class Hh extends migi.Component {
  constructor(...data) {
    super(...data);
    this.character = this.props.character;
  }
  @bind character
  @bind characterId
  @bind isUploadingImg
  @bind imgUrl
  @bind imgProgress
  @bind describe
  @bind uploading
  changeCharacter(e, vd, tvd) {
    // this.characterId = tvd.props.value;
    let id = tvd.props.value;
    this.character.forEach((item) => {
      if(item.id === id) {
        item.checked = !item.checked;
      }
    });
    for(let i = 0, len = this.character; i < len; i++) {
      let item = this.character[i];
      if(item.id === id) {
        item.checked = !item.checked;
        break;
      }
    }
    this.character = this.character;
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
    if(self.isUploadingImg) {
      alert('正在上传绘画作品，请稍后');
      return;
    }
    if(!self.imgUrl) {
      alert('请先上传绘画作品');
      return;
    }
    let character = [];
    self.character.forEach((item) => {
      if(item.checked) {
        character.push(item);
      }
    });
    if(!character.length) {
      alert('请选择参赛作品的原画人物');
      return;
    }
    if(self.uploading) {
      return;
    }
    let title = character.map((item) => {
      return item.name;
    }).join('&');
    title += ' 异世同人图';
    $net.postJSON('hhUpload', {
      title,
      describe: self.describe,
      imgUrl: self.imgUrl,
    }, function(res) {
      if(res.success) {
        alert('恭喜你上传成功啦！\n' +
          '你可以继续上传其他参赛作品~\n' +
          '但请勿重复提交同以作品~如需修改，请联系@异世谣 官博。')
        location.href = '/ysjxy/hh/' + res.data.id;
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
    let character = this.props.character;
    return <div class="upload">
      <div class="character">
        <h3>请选择参赛作品的原画人物</h3>
        <ul class="fn-clear"
            onChange={ { input: this.changeCharacter } }>
        {
          character.map((item) => {
            if(!item) {
              return;
            }
            return <li>
              <input type="checkbox"
                     name="character"
                     checked={ item.checked }
                     value={ item.id }/>
              <span>{ item.name }</span>
            </li>;
          })
        }
        </ul>
      </div>
      <div class="img">
        <div class="button">
          <span>上传绘画文件</span>
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
              onClick={ this.submit }>提交</button>
    </div>;
  }
}

export default Hh;
