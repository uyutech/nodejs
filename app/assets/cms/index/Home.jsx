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

function sendLetter(idList, content, cb) {
  net.postJSON('/cms/sendLetter', { idList, content }, function(res) {
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
  @bind userId
  @bind letter
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
  sendLetter(e) {
    e.preventDefault();
    let self = this;
    let idList = (self.userId || '').trim().split(/\s+/);
    for(let i = 0; i < idList.length; i++) {
      if(!/^2018\d{12}$/.test(idList[i])) {
        alert('用户id不合法：' + idList[i]);
        return;
      }
    }
    if(!self.letter) {
      alert('内容不合法：');
      return;
    }
    sendLetter(idList, self.letter, function(res) {
      res = res || {};
      if(res.success) {
        alert('成功');
      }
      else {
        alert(res.message || util.ERROR_MESSAGE);
      }
    });
  }
  sendLetter2All(e) {
    e.preventDefault();
    let self = this;
    if(!self.letter) {
      alert('内容不合法：');
      return;
    }
    if(!window.confirm('全部发送数据量巨大，确定吗？')) {
      return;
    }
    net.postJSON('/cms/allUser', function(res) {
      if(res.success) {
        let list = res.data;
        load(list, list.length, self.letter);
      }
      else {
        alert(res.message || util.ERROR_MESSAGE);
      }
    }, function(res) {
      alert(res.message || util.ERROR_MESSAGE);
    });
    function load(list, total, content) {
      if(list.length) {
        self.message = '正在处理：' + (total - list.length) + '/' +  total;
        let idList = list.splice(0, 100);
        sendLetter(idList, content, function() {
          load(list, total, content);
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
      <form onSubmit={ this.sendLetter }>
        <h3>向一些人发私信</h3>
        <textarea style="width:100%;height:200px;">{ this.letter }</textarea>
        <br/>
        <label>用户id（多人以空格隔开）：</label>
        <input type="text" value={ this.userId }/>
        <input type="submit"/>
      </form>
      <form onSubmit={ this.sendLetter2All }>
        <h3>向所有人发私信</h3>
        <input type="submit"/>
      </form>
    </div>;
  }
}

export default Home;
