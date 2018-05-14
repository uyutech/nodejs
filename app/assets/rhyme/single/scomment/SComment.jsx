/**
 * Created by army8735 on 2017/8/31.
 */

import Comment from '../character/Comment.jsx';

let ajax;
let authorId;

class SComment extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  show() {
    $(this.element).removeClass('fn-hide');
    this.load();
  }
  hide() {
    $(this.element).addClass('fn-hide');
    if(ajax) {
      ajax.abort();
    }
  }
  load() {
    let self = this;
    self.ref.comment.message = '读取中...';
    if(ajax) {
      ajax.abort();
    }
    ajax = util.postJSON('/api/author/singleComment', { commentID: window.cid }, function(res) {
      if(res.success) {
        let data = res.data;
        self.rootId = self.replayId = data.Send_ID;
        authorId = data.AuthorID;
        self.ref.comment.message = '';
        self.ref.comment.showComment([data]);
        $(self.ref.comment.element).find('.slide').click();
      }
      else {
        self.ref.comment.showComment();
        self.ref.comment.message = res.message || util.ERROR_MESSAGE;
      }
    }, function(res) {
      self.ref.comment.showComment();
      self.ref.comment.message = res.message || util.ERROR_MESSAGE;
    });
  }
  @bind hasContent
  @bind sending
  @bind rootId = null
  @bind replayId = null
  input(e, vd) {
    let v = $(vd.element).val().trim();
    this.hasContent = v.length > 0;
  }
  click(e) {
    e.preventDefault();
    let self = this;
    if(self.hasContent) {
      let $input = $(this.ref.input.element);
      let content = $input.val();
      let parentID = self.replayId !== null ? self.replayId : -1;
      let rootID = self.rootId !== null ? self.rootId : -1;
      self.sending = true;
      if(ajax) {
        ajax.abort();
      }
      ajax = util.postJSON('/api/author/addComment', {
        parentID,
        rootID,
        content,
        authorID: authorId,
      }, function(res) {
        if(res.success) {
          $input.val('');
          self.hasContent = false;
          if(rootID === -1) {
            self.ref.comment.addNew(res.data);
            self.ref.comment.message = '';
          }
          else {
            self.ref.comment.addChild(res.data);
          }
        }
        else {
          alert(res.message || util.ERROR_MESSAGE);
        }
        self.sending = false;
      }, function(res) {
        alert(res.message || util.ERROR_MESSAGE);
        self.sending = false;
      });
    }
  }
  render() {
    return <div class="main scomment">
      <div class="con">
        <div class="c">
          <div class="wrap">
            <Comment ref="comment" zanUrl="/api/author/likeComment" subUrl="/api/author/subCommentList" delUrl="/api/author/deleteComment"/>
          </div>
          <div class="form">
            <div class="inputs">
              <input ref="input" maxlength="1000" type="text" placeholder="留言..." onInput={ this.input }/>
            </div>
            <button onClick={ this.click } class={ this.hasContent && !this.sending ? '' : 'dis' }>确定</button>
          </div>
        </div>
      </div>
    </div>;
  }
}

export default SComment;
