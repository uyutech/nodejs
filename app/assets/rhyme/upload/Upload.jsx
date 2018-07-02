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
  @bind isUploadingSong
  @bind songUrl
  @bind describe
  changeOrigin(e, vd, tvd) {
    this.originId = tvd.props.value;
  }
  clickSong(e) {
    if(this.isUploadingSong) {
      e.preventDefault();
    }
  }
  changeSong(e) {
    let self = this;
    if(self.isUploadingSong) {
      e.preventDefault();
      return;
    }
    let file = e.target.files[0];
    let size = file.size;
    if(size && size > 1024 * 1024 * 20) {
      alert('文件不能超过20M！');
      return;
    }
    self.isUploadingSong = true;
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
            self.isUploadingSong = false;
            self.songUrl = '//zhuanquan'
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
              self.isUploadingSong = false;
            }
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
  render() {
    let info = this.props.info;
    let originWorks = this.props.originWorks;
    return <div class="upload">
      <div>
        <label>请选择参赛曲目</label>
        <ul onChange={ { input: this.changeOrigin } }>
        {
          originWorks.map((item) => {
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
      <div>
        <label>请上传参赛曲目.mp3</label><br/>
        <input type="file"
               accept="audio/mpeg"
               onClick={ this.clickSong }
               onChange={ this.changeSong }/>
      </div>
      <div>
        <label>上传歌曲海报</label><br/>
        <input type="file" accept="image/*"/>
      </div>
      <div>
        <label>上传歌曲视频</label><br/>
        <input type="file" accept="video/mpeg"/>
      </div>
      <div>
        <label>填写参赛说明</label><br/>
        <textarea>{ this.describe }</textarea>
      </div>
    </div>;
  }
}

export default Upload;
