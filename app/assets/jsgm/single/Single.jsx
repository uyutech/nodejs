/**
 * Created by army8735 on 2018/7/14.
 */

'use strict';

import $net from '../../d/common/net';
import $util from '../../d/common/util';
import Nav from '../common/Nav.jsx';

let loading;

class Single extends migi.Component {
  constructor(...data) {
    super(...data);
    this.name = this.props.works.name;
    this.title = this.props.works.title;
    this.inspiration = this.props.works.inspiration;
    this.content = this.props.works.content;
    this.relate = this.props.works.relate;
    this.refer = this.props.works.refer;
    this.history = this.props.works.history;
    this.isOwn = this.props.isOwn;
  }
  @bind name
  @bind title
  @bind inspiration
  @bind content
  @bind relate
  @bind refer
  @bind history
  @bind editMode
  edit() {
    this.editMode = !this.editMode;
  }
  submit() {
    let self = this;
    if(loading) {
      return;
    }
    if(!this.name) {
      alert('请输入你的作者名');
      return;
    }
    if(!this.title) {
      alert('请输入此作品的名字');
      return;
    }
    if(!this.inspiration) {
      alert('请填写你的创作文案或灵感');
      return;
    }
    if(!this.content) {
      alert('请在此填写作品内容');
      return;
    }
    loading = true;
    $net.postJSON('/jsgm/update', {
      id: self.props.works.id,
      name: self.name,
      title: self.title,
      inspiration: self.inspiration,
      content: self.content,
      relate: self.relate,
      refer: self.refer,
      history: self.history,
    }, function(res) {
      if(res.success) {
        alert('提交更新成功');
        self.editMode = false;
      }
      else {
        alert(res.message || $util.ERROR_MESSAGE);
      }
      loading = false;
    }, function(res) {
      alert(res.message || $util.ERROR_MESSAGE);
      loading = false;
    });
  }
  render() {
    return <div class="single">
      <Nav/>
      <div class="line">
        <label><b>*</b>投稿者作者名：</label>
        <input type="text"
               placeholder="请输入你的作者名"
               maxLength="32"
               value={ this.name }
               readOnly={ !this.editMode }/>
      </div>
      <div class="line">
        <label><b>*</b>投稿歌曲名：</label>
        <input type="text"
               placeholder="请输入此作品的名字"
               maxLength="32"
               value={ this.title }
               readOnly={ !this.editMode }/>
      </div>
      <div class="line">
        <label><b>*</b>创作文案/灵感：</label>
        <textarea placeholder="请填写你的创作文案或灵感。"
                  maxLength="65535"
                  readOnly={ !this.editMode }>{ this.inspiration }</textarea>
      </div>
      <div class="line">
        <label><b>*</b>投稿歌词内容：</label>
        <textarea placeholder="请在此填写作品内容。作品主题需与朝代或城市相关，历史文化、人物事件、风土人情等皆可。"
                  maxLength="65535"
                  readOnly={ !this.editMode }>{ this.content }</textarea>
      </div>
      <div class={ 'line' + (this.relate || this.isOwn ? '' : ' fn-hide') }>
        <label>作品相关内容：</label>
        <textarea placeholder="可填写作品涉及的关联人物或历史事件等。"
                  maxLength="65535"
                  readOnly={ !this.editMode }>{ this.relate }</textarea>
      </div>
      <div class={ 'line' + (this.refer || this.isOwn ? '' : ' fn-hide') }>
        <label>参考曲目：</label>
        <textarea placeholder="备注参考曲目歌名即可。"
                  maxLength="255"
                  readOnly={ !this.editMode }>{ this.refer }</textarea>
      </div>
      <div class={ 'line' + (this.history || this.isOwn ? '' : ' fn-hide') }>
        <label>过往作品：</label>
        <textarea placeholder="可填写过往已发布作品链接，每行填写一个。或者直接填写过往作品歌词内容。"
                  maxLength="255"
                  readOnly={ !this.editMode }>{ this.history }</textarea>
      </div>
      <div class="btn">
      {
        this.isOwn
          ? <button onClick={ this.edit }>{ this.editMode ? '取消编辑' : '开始编辑' }</button>
          : ''
      }
      {
        this.editMode
          ? <button onClick={ this.submit }>提交更新</button>
          : ''
      }
      </div>
    </div>;
  }
}

export default Single;
