/**
 * Created by army8735 on 2017/10/15.
 */

'use strict';

import SparkMd5 from 'spark-md5';
import $net from '../../d/common/net';
import $util from '../../d/common/util';

let timeout;
let ajax;
let mouseenter;

class Upload extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.worksTypeList = self.props.worksTypeList;
    self.enablePoster = true;
    self.on(migi.Event.DOM, function() {
    });
    // self.worksType = 1;
    // self.professionList = self.worksTypeList[0].professionList;
    // self.workTypeList = self.worksTypeList[0].workTypeList;
    // let temp = [];
    // self.workTypeList.forEach((item) => {
    //   if(item.upload === 0) {
    //     temp.push(Object.assign({}, item));
    //   }
    // });
    // self.workList = temp;
    // self.workListIndex = 0;
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
  @bind suggest
  @bind suggestList
  @bind suggestWork
  @bind suggestListWork
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
    let self = this;
    let index = tvd.props.rel;
    let value = e.target.value.trim();
    let profession = self.professionList[index];
    profession.author = undefined;
    profession.value = value;
    self.suggest = value ? index : -1;
    if(profession.required) {
      self.checkEnable();
    }
    if(timeout) {
      clearTimeout(timeout);
    }
    if(ajax) {
      ajax.abort();
    }
    timeout = setTimeout(function() {
      ajax = $net.postJSON('/api/author/suggest', { name: value }, function(res) {
        if(res.success) {
          let data = res.data;
          self.suggestList = data.data;
        }
      });
    }, 200);
  }
  focusIn(e, vd, tvd) {
    let self = this;
    let index = tvd.props.rel;
    let profession = self.professionList[index];
    if(profession.value) {
      self.suggest = index;
    }
  }
  focusOut(e, vd, tvd) {
    if(mouseenter) {
      return;
    }
    let self = this;
    self.suggest = -1;
    let index = tvd.props.index;
    let profession = self.professionList[index];
    if(self.suggest && self.suggest[0]) {
      profession.author = self.suggest[0].id;
      profession.value = self.suggest[0].name;
    }
  }
  mouseEnter(e, vd) {
    mouseenter = true;
  }
  mouseLeave(e, vd) {
    mouseenter = false;
  }
  clickAuthor(e, vd, tvd) {
    let self = this;
    let index = tvd.props.index;
    let id = tvd.props.rel;
    let value = tvd.props.title;
    let profession = self.professionList[index];
    profession.author = id;
    profession.value = value;
    self.professionList.splice(index, 1, profession);
    self.suggest = -1;
    mouseenter = false;
  }
  next() {
    let self = this;
    self.worksType = self.curWorksType;
    for(let i = 0; i < self.worksTypeList.length; i++) {
      if(self.worksTypeList[i].id === self.worksType) {
        self.professionList = self.worksTypeList[i].professionList;
        self.workTypeList = self.worksTypeList[i].workTypeList;
        let temp = [];
        self.workTypeList.forEach((item) => {
          if(item.upload === 0) {
            let o = Object.assign({}, item);
            o.professionList = [];
            (item.professionList || []).forEach((item, i) => {
              o.professionList[i] = Object.assign({}, item);
            });
            temp.push(o);
          }
        });
        self.workList = temp;
        self.workListIndex = 0;
        break;
      }
    }
    self.checkEnable();
  }
  addWork(e, vd, tvd) {
    let id = tvd.props.rel;
    for(let i = 0; i < this.workTypeList.length; i++) {
      let item = this.workTypeList[i];
      if(item.id === id) {
        let o = Object.assign({}, item);
        o.professionList = [];
        (item.professionList || []).forEach((item, i) => {
          o.professionList[i] = Object.assign({}, item);
        });
        this.workList.push(o);
        this.workListIndex = this.workList.length - 1;
        this.checkEnable();
        break;
      }
    }
  }
  delWork(e, vd, tvd) {
    let index = tvd.props.rel;
    this.workList.splice(index, 1);
    this.checkEnable();
    if(this.workListIndex > this.workList.length - 1) {
      this.workListIndex = this.workList.length - 1;
    }
  }
  clickWork(e, vd, tvd) {
    let index = tvd.props.rel;
    if(this.workListIndex !== index) {
      this.workListIndex = index;
      this.checkEnable();
    }
  }
  addOne(e, vd, tvd) {
    let self = this;
    let index = tvd.props.rel;
    let profession = self.professionList[index];
    let clone = Object.assign({}, profession);
    clone.author = clone.value = undefined;
    clone.clone = true;
    for(let i = index + 1; i < self.professionList.length; i++) {
      let item = self.professionList[i];
      if(!item.clone) {
        self.professionList.splice(i, 0, clone);
        break;
      }
    }
  }
  delOne(e, vd, tvd) {
    let self = this;
    let index = tvd.props.rel;
    self.professionList.splice(index, 1);
  }
  inputWorkProfession(e, vd, tvd) {
    let self = this;
    let index = tvd.props.rel;
    let value = e.target.value.trim();
    let work = self.workList[self.workListIndex];
    let profession = work.professionList[index];
    profession.author = undefined;
    profession.value = e.target.value;
    self.suggestWork = value ? index : -1;
    if(profession.required) {
      self.checkEnable();
    }
    if(timeout) {
      clearTimeout(timeout);
    }
    if(ajax) {
      ajax.abort();
    }
    timeout = setTimeout(function() {
      ajax = $net.postJSON('/api/author/suggest', { name: value }, function(res) {
        if(res.success) {
          let data = res.data;
          self.suggestListWork = data.data;
        }
      });
    }, 200);
  }
  focusInWork(e, vd, tvd) {
    let self = this;
    let work = self.workList[self.workListIndex];
    let index = tvd.props.rel;
    let profession = work.professionList[index];
    if(profession.value) {
      self.suggestWork = index;
    }
  }
  focusOutWork() {
    if(mouseenter) {
      return;
    }
    let self = this;
    self.suggestWork = -1;
    let work = self.workList[self.workListIndex];
    let index = tvd.props.index;
    let profession = work.professionList[index];
    if(self.suggest && self.suggest[0]) {
      profession.author = self.suggest[0].id;
      profession.value = self.suggest[0].name;
    }
  }
  clickAuthorWork(e, vd, tvd) {
    let self = this;
    let index = tvd.props.index;
    let id = tvd.props.rel;
    let value = tvd.props.title;
    let work = self.workList[self.workListIndex];
    let profession = work.professionList[index];
    profession.author = id;
    profession.value = value;
    self.workList.splice(self.workListIndex, 1, work);
    self.suggestWork = -1;
  }
  addOneWork(e, vd, tvd) {
    let self = this;
    let index = tvd.props.rel;
    let work = self.workList[self.workListIndex];
    let profession = work.professionList[index];
    let clone = Object.assign({}, profession);
    clone.author = clone.value = undefined;
    clone.clone = true;
    for(let i = index + 1; i < work.professionList.length; i++) {
      let item = work.professionList[i];
      if(!item.clone) {
        work.professionList.splice(i, 0, clone);
        break;
      }
    }
    self.workList.splice(self.workListIndex, 1, work);
  }
  delOneWork(e, vd, tvd) {
    let self = this;
    let index = tvd.props.rel;
    let work = self.workList[self.workListIndex];
    work.professionList.splice(index, 1);
    self.workList.splice(self.workListIndex, 1, work);
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
      if(kind === 1) {
        name = md5+ '.mp4';
      }
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
            url = '//zhuanquan.xyz/pic/';
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
      for(let j = 0; j < work.professionList.length; j++) {
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
    if(!self.poster) {
      alert('请先上传作品封面');
      return;
    }
    let error = '';
    let hash = {};
    let professionList = self.professionList.filter((item) => {
      return item.author || (item.value && item.value.trim());
    }).map((item) => {
      if(item.author) {
        if(hash[item.author]) {
          error = item.name + '重复：' + item.value;
        }
        hash[item.author] = true;
      }
      else {
        if(hash[item.value]) {
          error = item.name + '重复：' + item.value;
        }
        hash[item.value] = true;
      }
      return {
        id: item.id,
        author: item.author,
        value: item.author ? undefined : item.value,
      };
    });
    if(error) {
      alert(error);
      return;
    }
    let workList = self.workList.map((item) => {
      let hash = {};
      return {
        kind: item.kind,
        value: item.value,
        type: item.id,
        professionList: item.professionList.filter((item2) => {
          return item2.author || (item2.value && item2.value.trim());
        }).map((item2) => {
          if(item2.author) {
            if(hash[item2.author]) {
              error = item.name + '文件的' + item2.name + '重复：' + item2.value;
            }
            hash[item2.author] = true;
          }
          else {
            if(hash[item2.value]) {
              error = item.name + '文件的' + item2.name + '重复：' + item2.value;
            }
            hash[item2.value] = true;
          }
          return {
            id: item2.id,
            author: item2.author,
            value: item2.author ? undefined : item2.value,
          };
        })
      };
    });
    if(error) {
      alert(error);
      return;
    }
    self.enable = false;
    $net.postJSON('/api/upload', {
      worksType: self.worksType,
      worksName: self.worksName,
      worksDesc: self.worksDesc,
      poster: self.poster,
      professionList,
      workList,
    }, function(res) {
      if(res.success) {
        let data = res.data;
        alert('上传成功，点击跳转作品页面。');
        location.href = '/works/' + data.id;
        self.enable = true;
      }
      else {
        alert(res.message || $util.ERROR_MESSAGE);
        self.enable = true;
      }
    }, function(res) {
      alert(res.message || $util.ERROR_MESSAGE);
      self.enable = true;
    });
  }
  render() {
    return <div class="upload">
      <div class={ (this.worksType ? 'fn-hide' : '')  }>
        <h3>请选择作品类型</h3>
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
                 placeholder="请输入作品名，必填"
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
                 accept="image/*"
                 disabled={ !this.enablePoster }
                 onChange={ this.posterFile }/>
        </div>
        <div onFocusin={ { input: this.focusIn } }
             onFocusout={ { input: this.focusOut } }
             onInput={ { input: this.inputProfession } }
             onClick={ { '.author': this.clickAuthor, '.add-one': this.addOne, '.del-one': this.delOne } }>
        {
          (this.professionList || []).map((item, i) => {
            return <div class="line">
              <label class={ item.required ? 'required' : '' }>{ item.name }</label>
              <input type="text"
                     value={ item.value }
                     placeholder={ '请输入作者名，' + (item.required ? '必填' : '可选') }
                     rel={ i }/>
              {
                item.clone
                  ? <span class="del-one"
                          rel={ i }>删除</span>
                  : <span class="add-one"
                          rel={ i }>再加一个</span>
              }
              <ul class={ 'suggest' + (this.suggest === i ? '' : ' fn-hide') }
                  onMouseEnter={ this.mouseEnter }
                  onMouseLeave={ this.mouseLeave }>
              {
                (this.suggestList || []).map((item) => {
                  return <li class="author"
                             rel={ item.id }
                             title={ item.name }
                             index={ i }>{ item.name }</li>;
                })
              }
              </ul>
            </div>;
          })
        }
        </div>
        <ul class="sub-type"
            onClick={ { b: this.delWork, 'span': this.clickWork } }>
          {
            (this.workList || []).map((item, i) => {
              return <li class={ this.workListIndex === i ? 'cur' : '' }>
                <span rel={ i }>{ item.name }</span>
                <b rel={ i }/>
              </li>;
            })
          }
        </ul>
        <ul class="work-list"
            onFocusin={ { 'input.text': this.focusInWork } }
            onFocusout={ { 'input.text': this.focusOutWork } }
            onInput={ { 'input.text': this.inputWorkProfession } }
            onClick={ { '.author': this.clickAuthorWork, '.add-one': this.addOneWork, '.del-one': this.delOneWork } }>
        {
          (this.workList || []).map((item, i) => {
            return <li class={ this.workListIndex === i ? '' : 'fn-hide' }>
              {
                (item.professionList || []).map((item2, j) => {
                  return <div class="line">
                    <label class={ item2.required ? 'required' : '' }>{ item2.name }</label>
                    <input type="text"
                           class="text"
                           value={ item2.value }
                           placeholder={ '请输入作者名，' + (item2.required ? '必填' : '可选') }
                           rel={ j }/>
                    {
                      item2.clone
                        ? <span class="del-one"
                                rel={ j }>删除</span>
                        : <span class="add-one"
                                rel={ j }>再加一个</span>
                    }
                    <ul class={ 'suggest' + (this.suggestWork === j ? '' : ' fn-hide') }
                        onMouseEnter={ this.mouseEnter }
                        onMouseLeave={ this.mouseLeave }>
                      {
                        (this.suggestListWork || []).map((item) => {
                          return <li class="author"
                                     rel={ item.id }
                                     title={ item.name }
                                     index={ j }>{ item.name }</li>;
                        })
                      }
                    </ul>
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
        <dl class="add-more"
            onClick={ { dd: this.addWork } }>
          <dt>继续添加其它文件：</dt>
          {
            (this.workTypeList || []).map((item) => {
              return <dd rel={ item.id }>{ item.name }</dd>;
            })
          }
        </dl>
        <button class="next"
                disabled={ !this.enable }
                onClick={ this.submit }>提交</button>
      </div>
    </div>;
  }
}

export default Upload;
