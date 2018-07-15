/**
 * Created by army8735 on 2018/7/10.
 */

'use strict';

import $net from '../../d/common/net';
import $util from '../../d/common/util';
import Nav from '../common/Nav.jsx';

let loading;

class Join extends migi.Component {
  constructor(...data) {
    super(...data);
    this.name = this.props.nickname || '';
  }
  @bind name
  @bind title
  @bind inspiration
  @bind content
  @bind relate
  @bind refer
  @bind history
  submit() {
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
    $net.postJSON('/jsgm/add', {
      name: this.name,
      title: this.title,
      inspiration: this.inspiration,
      content: this.content,
      relate: this.relate,
      refer: this.refer,
      history: this.history,
    }, function(res) {
      if(res.success) {
        alert('提交新作品成功');
        location.href = '/jsgm/works/' + res.data.id;
      }
      else {
        alert(res.message || $util.ERROR_MESSAGE);
        loading = false;
      }
    }, function(res) {
      alert(res.message || $util.ERROR_MESSAGE);
      loading = false;
    });
  }
  render() {
    return <div class="join">
      <Nav/>
      <div class="line">
        <label><b>*</b>投稿者作者名：</label>
        <input type="text"
               placeholder="请输入你的作者名"
               maxLength="32"
               value={ this.name }/>
      </div>
      <div class="line">
        <label><b>*</b>投稿歌曲名：</label>
        <input type="text"
               placeholder="请输入此作品的名字"
               maxLength="32"
               value={ this.title }/>
      </div>
      <div class="line">
        <label><b>*</b>创作文案/灵感：</label>
        <textarea placeholder="请填写你的创作文案或灵感。"
                  maxLength="65535">{ this.inspiration }</textarea>
      </div>
      <div class="line">
        <label><b>*</b>投稿歌词内容：</label>
        <textarea placeholder="请在此填写作品内容。作品主题需与朝代或城市相关，历史文化、人物事件、风土人情等皆可。"
                  maxLength="65535">{ this.content }</textarea>
      </div>
      <div class="line">
        <label>作品相关内容：</label>
        <textarea placeholder="可填写作品涉及的关联人物或历史事件等。"
                  maxLength="65535">{ this.relate }</textarea>
      </div>
      <div class="line">
        <label>参考曲目：</label>
        <textarea placeholder="备注参考曲目歌名即可。"
                  maxLength="255">{ this.refer }</textarea>
      </div>
      <div class="line">
        <label>过往作品：</label>
        <textarea placeholder="可填写过往已发布作品链接，每行填写一个。或者直接填写过往作品歌词内容。"
                  maxLength="255">{ this.history }</textarea>
      </div>
      <button onClick={ this.submit }>提交</button>
    </div>;
  }
}

export default Join;
