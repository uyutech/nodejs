/**
 * Created by army8735 on 2017/10/15.
 */

'use strict';

import SparkMd5 from 'spark-md5';
import $net from '../../d/common/net';
import $util from '../../d/common/util';

class Upload extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.worksTypeList = self.props.worksTypeList;
    self.worksType = 1;
    self.professionList = self.worksTypeList[0].professionList;
    self.enablePoster = true;
    self.workTypeList = self.worksTypeList[0].workTypeList;
    let temp = [];
    self.workTypeList.forEach((item) => {
      if(item.upload === 0) {
        temp.push(Object.assign({}, item));
      }
    });
    self.workList = temp;
    self.workListIndex = 0;
    self.on(migi.Event.DOM, function() {
    });
  }
  @bind curWorksType
  @bind worksType
  @bind worksTypeList
  @bind worksName
  @bind worksDesc
  @bind professionList
  @bind poster
  @bind enablePoster
  @bind workTypeList
  @bind workList
  @bind workListIndex
  @bind enable
  change(e) {
    let file = e.target.files[0];
    let size = file.size;
    if(size && size !== 0 && size < 2048 * 2048 * 100) {
      let fileReader = new FileReader();
      fileReader.onload = function() {
        let spark = new Spark.ArrayBuffer();
        spark.append(fileReader.result);
        let md5 = spark.end();
      };
      fileReader.readAsArrayBuffer(file);
    }
  }
  clickWorksType(e, vd, tvd) {
    if(tvd.props.rel === this.curWorksType) {
      return;
    }
    this.curWorksType = tvd.props.rel;
  }
  inputProfession(e, vd, tvd) {
    let index = tvd.props.rel;
    let profession = this.professionList[index];
    profession.value = e.target.value;
    if(profession.required) {
      this.checkEnable();
    }
  }
  next() {
    this.worksType = this.curWorksType;
    for(let i = 0; i < this.worksTypeList.length; i++) {
      if(this.worksTypeList[i].id === this.worksType) {
        this.professionList = this.worksTypeList[i].professionList;
        this.workTypeList = this.worksTypeList[i].workTypeList;
        break;
      }
    }
    this.checkEnable();
  }
  inputWorkProfession(e, vd, tvd) {
    let index = tvd.props.rel;
    let work = this.workList[this.workListIndex];
    let profession = work.professionList[index];
    profession.value = e.target.value;
    if(profession.required) {
      this.checkEnable();
    }
  }
  posterFile(e) {
    let self = this;
    let file = e.target.files[0];
    if(!file) {
      return;
    }
    let size = file.size;
    if(size && size > 1024 * 1024 * 10) {
      alert('文件不能超过10M！');
      return;
    }
    self.enablePoster = false;
    let fileReader = new FileReader();
    fileReader.onload = function() {
      let spark = new SparkMd5.ArrayBuffer();
      spark.append(fileReader.result);
      let md5 = spark.end();
      let name;
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
      name = md5 + suffix;
      $net.postJSON('/h5/my/sts', { name }, function(res) {
        if(res.success) {
          let data = res.data;
          let url = '//zhuanquan.xyz/pic/' + name;
          if(data.exist) {
            self.poster = url;
            self.enablePoster = true;
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
              self.poster = url;
              self.enablePoster = true;
            }
          };
          xhr.upload.onprogress = function(e) {
            // item.progress = e.loaded / e.total;
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
  file(e, vd, tvd) {
    let self = this;
    let index = tvd.props.rel;
    let item = self.workList[index];
    let kind = item.kind;
    let file = e.target.files[0];
    if(!file) {
      return;
    }
    let size = file.size;
    let url;
    if(kind === 1) {
      if(size && size > 1024 * 1024 * 200) {
        alert('文件不能超过200M！');
        return;
      }
      url = '/h5/my/stsVideo';
    }
    else if(kind === 2) {
      if(size && size > 1024 * 1024 * 20) {
        alert('文件不能超过20M！');
        return;
      }
      url = '/h5/my/stsAudio';
    }
    else if(kind === 3) {
      if(size && size > 1024 * 1024 * 10) {
        alert('文件不能超过10M！');
        return;
      }
      url = '/h5/my/sts';
    }
    let fileReader = new FileReader();
    fileReader.onload = function() {
      let spark = new SparkMd5.ArrayBuffer();
      spark.append(fileReader.result);
      let md5 = spark.end();
      let name;
      if(kind === 1) {}
      else if(kind === 2) {
        name = md5 + '.mp3';
      }
      else if(kind === 3) {
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
        name = md5 + suffix;
      }
      $net.postJSON(url, { name }, function(res) {
        if(res.success) {
          let data = res.data;
          let url = '//zhuanquan.net.cn/';
          if(kind === 1) {
            url += 'video/';
          }
          else if(kind === 2) {
            url += 'audio/';
          }
          else if(kind === 3) {
            url = '//zhuanquan.net.cn/pic/';
          }
          url += name;
          if(data.exist) {
            item.value = url;
            item.progress = 1;
            item.disabled = false;
            self.workList.splice(index, 1, item);
            self.checkEnable();
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
              item.value = url;
              item.progress = 1;
              item.disabled = false;
              self.workList.splice(index, 1, item);
              self.checkEnable();
            }
          };
          xhr.upload.onprogress = function(e) {
            item.progress = e.loaded / e.total;
          };
          xhr.send(form);
          item.xhr = xhr;
        }
        else {
          alert(res.message || $util.ERROR_MESSAGE);
        }
      }, function(res) {
        alert(res.message || $util.ERROR_MESSAGE);
      });
    };
    if(kind === 3) {
      fileReader.readAsDataURL(file);
    }
    else {
      fileReader.readAsArrayBuffer(file);
    }
    item.disabled = true;
    self.workList.splice(index, 1, item);
  }
  checkEnable() {
    let self = this;
    if(!self.worksType) {
      self.enable = false;
      return;
    }
    if(!self.worksName) {
      self.enable = false;
      return;
    }
    for(let i = 0; i < self.professionList.length; i++) {
      let item = self.professionList[i];
      if(item.required && (!item.value || !item.value.trim())) {
        self.enable = false;
        return;
      }
    }
    for(let i = 0; i < self.workList.length; i++) {
      let work = self.workList[i];
      for(let j = 0; i < work.professionList.length; i++) {
        let item = work.professionList[j];
        if(item.required && (!item.value || !item.value.trim())) {
          self.enable = false;
          return;
        }
      }
      if(work.kind === 1 || work.kind === 2 || work.kind === 3) {
        if(!work.value || work.progress !== 1) {
          self.enable = false;
          return;
        }
      }
      else if(work.kind === 4) {
        if(!work.value) {
          self.enable = false;
          return;
        }
      }
    }
    self.enable = true;
  }
  submit() {
    let self = this;
    self.enable = false;
    let professionList = self.professionList.filter((item) => {
      return item.value && item.value.trim();
    }).map((item) => {
      return {
        id: item.id,
        value: item.value,
      };
    });
    let workList = self.workList.map((item) => {
      return {
        kind: item.kind,
        value: item.value,
        professionList: item.professionList.filter((item) => {
          return item.value && item.value.trim();
        }).map((item) => {
          return {
            id: item.id,
            value: item.value,
          };
        })
      };
    });
    $net.postJSON('/api/upload', {
      worksType: self.worksType,
      worksName: self.worksName,
      worksDesc: self.worksDesc,
      poster: self.poster,
      professionList,
      workList,
    }, function(res) {
      if(res.success) {
        console.log(res);
      }
      else {
        alert(res.message || $util.ERROR_MESSAGE);
      }
    }, function(res) {
      alert(res.message || $util.ERROR_MESSAGE);
      self.uploading = false;
    });
  }
  render() {
    return <div class="upload">
      <div class={ (this.worksType ? 'fn-hide' : '')  }>
        <h3>请选择大作品类型</h3>
        <ul class="works-type"
            onClick={ { label: this.clickWorksType } }>
          {
            (this.worksTypeList || []).map((item) => {
              return <li class={ this.curWorksType === item.id ? 'cur' : '' }>
                <label rel={ item.id }>
                  <input type="radio" name="worksType"/>
                  <span>{ item.name }</span>
                </label>
              </li>;
            })
          }
        </ul>
        <button class="next"
                disabled={ !this.curWorksType }
                onClick={ this.next }>下一步</button>
      </div>
      <div class={ 'con' + (this.worksType ? '' : ' fn-hide') }>
        <div class="line">
          <label class="required">作品名</label>
          <input type="text"
                 value={ this.worksName }
                 placeholder="请输入作品名"
                 onInput={ this.checkEnable }/>
        </div>
        <div class="line">
          <label>作品简介</label>
          <textarea placeholder="请输入作品简介">{ this.worksDesc }</textarea>
        </div>
        <div class="poster">
          { this.poster ? '' : '点击上传作品封面' }
          <img src={ this.poster || '//zhuanquan.xin/img/blank.png' }/>
          <input type="file"
                 disabled={ !this.enablePoster }
                 onChange={ this.posterFile }/>
        </div>
        {
          (this.professionList || []).map((item, i) => {
            return <div class="line">
              <label class={ item.required ? 'required' : '' }>{ item.name }</label>
              <input type="text"
                     value={ item.value }
                     placeholder={ '请输入' + item.name }
                     rel={ i }
                     onInput={ this.inputProfession }/>
            </div>;
          })
        }
        <dl class="add-more">
          <dt>添加子类型：</dt>
          {
            (this.workTypeList || []).map((item) => {
              return <dd>{ item.name }</dd>;
            })
          }
        </dl>
        <ul class="sub-type">
          {
            (this.workList || []).map((item, i) => {
              return <li class={ this.workListIndex === i ? 'cur' : '' }>
                <span>{ item.name }</span>
                <b rel={ i }/>
              </li>;
            })
          }
        </ul>
        <ul class="work-list">
          {
            (this.workList || []).map((item, i) => {
              return <li class={ this.workListIndex === i ? '' : 'fn-hide' }>
                {
                  (item.professionList || []).map((item2, j) => {
                    return <div class="line">
                      <label class={ item2.required ? 'required' : '' }>{ item2.name }</label>
                      <input type="text"
                             value={ item2.value }
                             placeholder={ '请输入' + item2.name }
                             rel={ j }
                             onInput={ this.inputWorkProfession }/>
                    </div>;
                  })
                }
                {
                  item.kind === 1 || item.kind === 2
                    ? <div class="up">
                        <div class={ 'btn' + (item.disabled ? ' disabled' : '') }>
                          <span>{ item.kind === 1 ? '上传视频' : '上传音频' }</span>
                          <input type="file"
                                 rel={ i }
                                 accept={ item.kind === 1 ? 'video/mp4' : 'audio/mpeg' }
                                 onChange={ this.file }
                                 disabled={ item.disabled }/>
                        </div>
                        <div class="progress">
                          <span class="percent"
                                style={ 'width:' + ((item.progress || 0) * 100) + '%' }/>
                          <span class="num">{ (item.progress || 0).toFixed(2) * 100 + '%' }</span>
                        </div>
                      </div>
                    : ''
                }
                {
                  item.kind === 3
                    ? <div class="up">
                        <div class={ 'btn' + (item.disabled ? ' disabled' : '') }>
                          <span>上传图片</span>
                          <input type="file"
                                 rel={ i }
                                 accept="image/*"
                                 onChange={ this.file }
                                 disabled={ item.disabled }/>
                        </div>
                        <div class="progress">
                          <span class="percent"
                                style={ 'width:' + ((item.progress || 0) * 100) + '%' }/>
                          <span class="num">{ (item.progress || 0).toFixed(2) * 100 + '%' }</span>
                        </div>
                      </div>
                    : ''
                }
                {
                  item.kind === 4
                    ? <textarea placeholder="请输入内容"/>
                    : ''
                }
              </li>;
            })
          }
        </ul>
        <button class="next"
                disabled={ !this.enable }
                onClick={ this.submit }>提交</button>
      </div>
    </div>;
  }
}

export default Upload;
