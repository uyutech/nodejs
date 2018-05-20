/**
 * Created by army8735 on 2018/5/20.
 */

'use strict';

import util from '../../d/common/util';
import net from '../../d/common/net';

function authorSkillWorks(id, cb) {
  net.postJSON('/cms/authorSkillWorks', { id }, function(res) {
    cb && cb(res);
  }, function(res) {
    cb && cb(res);
  });
}

class Home extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  @bind message
  @bind authorId
  authorSkillWorks(e) {
    e.preventDefault();
    let self = this;
    if(!/^2017\d{12}$/.test(self.authorId)) {
      alert('作者id不合法');
      return;
    }
    authorSkillWorks(self.authorId, function(res) {
      res = res || {};
      if(res.success) {
        alert('成功');
      }
      else {
        alert(res.message || util.ERROR_MESSAGE);
      }
    });
  }
  allAuthorSkillWorks(e) {
    e.preventDefault();
    let self = this;
    if(!window.confirm('全部生成数据量巨大，确定吗？')) {
      return;
    }
    net.postJSON('/cms/allAuthor', function(res) {
      if(res.success) {
        let list = res.data;
        load(list, list.length);
      }
      else {
        alert(res.message || util.ERROR_MESSAGE);
      }
    }, function(res) {
      alert(res.message || util.ERROR_MESSAGE);
    });
    function load(list, total) {
      if(list.length) {
        self.message = '正在处理：' + (total - list.length) + '/' +  total;
        let id = list.shift();
        authorSkillWorks(id, function() {
          load(list, total);
        });
      }
      else {
        self.message = '完成：' + total;
      }
    }
  }
  render() {
    return <div class="home">
      <p class="message">{ this.message }</p>
      <form onSubmit={ this.authorSkillWorks }>
        <h3>生成作者页技能作品</h3>
        <label>作者id：</label>
        <input type="text" value={ this.authorId }/>
        <input type="submit"/>
      </form>
      <form onSubmit={ this.allAuthorSkillWorks }>
        <h3>生成全部作者页技能作品</h3>
        <input type="submit"/>
      </form>
    </div>;
  }
}

export default Home;
