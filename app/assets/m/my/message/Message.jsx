/**
 * Created by army8735 on 2017/11/18.
 */

'use strict';

import net from '../../../d/common/net';
import util from '../../../d/common/util';
import Messages from '../../../d/component/messages/Messages.jsx';
import SubCmt from '../../../d/component/subcmt/SubCmt.jsx';

let take = 10;
let skip = take;
let loading;

class Message extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.message = '正在加载...';
    self.on(migi.Event.DOM, function() {
      let $window = $(window);
      $window.on('scroll', function() {
        self.checkMore($window);
      });
      self.read(self.props.messages.data);

      let messages = self.ref.messages;
      let subCmt = self.ref.subCmt;
      messages.on('comment', function(mid, rid, cid, name, type, tid) {
        subCmt.readOnly = false;
        subCmt.to = name;
        self.messageID = mid;
        self.rootID = rid;
        self.parentID = cid;
        self.type = type;
        self.targetID = tid;
        subCmt.focus();
      });
      subCmt.on('submit', function(content) {
        subCmt.invalid = true;
        let rootID = self.rootID;
        let parentID = self.parentID;
        let url = '';
        if(self.type === 1) {
          url = '/api/author/addComment';
        }
        else if(self.type === 2) {
          url = '/api/works/addComment';
        }
        else if(self.type === 3 || self.type === 4) {
          url = '/api/post/addComment';
        }
        net.postJSON(url, {
          parentID: parentID,
          rootID: rootID,
          worksID: self.targetID,
          authorID: self.targetID,
          postID: self.targetID,
          content,
        }, function(res) {
          if(res.success) {
            subCmt.value = '';
            messages.appendChild(content, self.messageID);
          }
          else if(res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
            subCmt.invalid = false;
          }
          else {
            alert(res.message || util.ERROR_MESSAGE);
            subCmt.invalid = false;
          }
        }, function(res) {
          alert(res.message || util.ERROR_MESSAGE);
          subCmt.invalid = false;
        });
      });
    });
  }
  @bind message
  checkMore($window) {
    let self = this;
    let WIN_HEIGHT = $window.height();
    let HEIGHT = $(document.body).height();
    let bool;
    bool = $window.scrollTop() + WIN_HEIGHT + 30 > HEIGHT;
    if(!self.loading && !self.loadEnd && bool) {
      self.load();
    }
  }
  load() {
    let self = this;
    self.loading = true;
    self.message = '正在加载...';
    net.postJSON('/api/my/message', { skip, take }, function(res) {
      if(res.success) {
        let data = res.data;
        skip += take;
        self.ref.messages.appendData(data.data);
        if(!data.data.length || data.data.length < take) {
          self.loadEnd = true;
          self.message = '已经到底了';
        }
      }
      else {
        alert(res.message || util.ERROR_MESSAGE);
      }
      self.loading = false;
    }, function(res) {
      alert(res.message || util.ERROR_MESSAGE);
      self.loading = false;
    });
  }
  read(data) {
    let ids = (data || []).filter(function(item) {
      return !item.ISRead;
    }).map(function(item) {
      return item.NotifyID;
    });
    if(ids.length) {
      net.postJSON('/api/my/readMessage', { ids }, function(res) {
        if(res.success) {
          migi.eventBus.emit('READ_MESSAGE_NUM', ids.length);
        }
        else {
          alert(res.message || util.ERROR_MESSAGE);
        }
      }, function(res) {
        alert(res.message || util.ERROR_MESSAGE);
      });
    }
  }
  render() {
    return <div class="message fn-clear">
      <Messages ref="messages" data={ this.props.messages.data }/>
      <div class="message">{ this.message }</div>
      <SubCmt ref="subCmt" readOnly={ true } placeholder="请选择留言回复"
              subText="发送" tipText="-${n}"/>
    </div>;
  }
}

export default Message;
