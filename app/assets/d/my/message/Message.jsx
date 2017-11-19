/**
 * Created by army8735 on 2017/11/17.
 */

'use strict';

import net from '../../common/net';
import util from '../../common/util';
import Messages from '../../component/messages/Messages.jsx';
import Page from '../../component/page/Page.jsx';
import SubCmt from '../../component/subcmt/SubCmt.jsx';

let take = 10;
let skip = take;
let loading;

class Message extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      let page = self.ref.page;
      let page2 = self.ref.page2;
      if(page) {
        page.on('page', function(i) {
          page2.index = i;
          self.load(i);
        });
      }
      if(page2) {
        page2.on('page', function(i) {
          page.index = i;
          self.load(i);
        });
      }
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
  load(i) {
    if(loading) {
      return;
    }
    loading = true;
    let self = this;
    skip = (i - 1) * take;
    net.postJSON('/api/my/message', { skip, take }, function(res) {
      if(res.success) {
        self.ref.messages.setData(res.data.data);
        self.read(res.data.data);
      }
      else {
        alert(res.message || util.ERROR_MESSAGE);
      }
      loading = false;
    }, function(res) {
      alert(res.message || util.ERROR_MESSAGE);
      loading = false;
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
          if(parent && parent.readMessage) {
            parent.readMessage(ids.length);
          }
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
    if(this.props.messages.Size > take) {
      return <div class="message fn-clear">
        <div class="main">
          <Page ref="page" total={ Math.ceil(this.props.messages.Size / take) }/>
          <Messages ref="messages" data={ this.props.messages.data }/>
          <Page ref="page2" total={ Math.ceil(this.props.messages.Size / take) }/>
        </div>
        <SubCmt ref="subCmt" readOnly={ true } placeholder="请选择留言回复"/>
      </div>;
    }
    return <div class="message fn-clear">
      <div class="main">
        <Page ref="page" total={ Math.ceil(this.props.messages.Size / take) }/>
        <Messages ref="messages" data={ this.props.messages.data }/>
      </div>
      <SubCmt ref="subCmt" readOnly={ true } placeholder="请选择留言回复"/>
    </div>;
  }
}

export default Message;
