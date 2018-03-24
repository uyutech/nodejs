/**
 * Created by army8735 on 2017/8/26.
 */

'use strict';

import net from '../../common/net';
import util from '../../common/util';

const NOT_LOADED = 0;
const IS_LOADING = 1;
const HAS_LOADED = 2;
let subLoadHash = {};
let subSkipHash = {};
let $last;
let take = 10;
let ajax;

class Comment extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    let html = '';
    (self.props.data || []).forEach(function(item) {
      html += self.genComment(item);
    });
    self.html = html;
    if(self.props.message !== undefined) {
      self.message = self.props.message;
    }
    if(self.props.data && self.props.data.length === 0) {
      self.empty = true;
    }

    self.on(migi.Event.DOM, function() {
      let $root = $(self.element);
      $root.on('click', '.like', function() {
        let $elem = $(this);
        let commentID = $elem.attr('cid');
        net.postJSON(self.props.zanUrl, { commentID }, function(res) {
          if(res.success) {
            let data = res.data;
            if(data.State === 'likeWordsUser') {
              $elem.addClass('liked');
            }
            else {
              $elem.removeClass('liked');
            }
            $elem.text(data.LikeCount);
          }
          else if(res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
          }
          else {
            alert(res.message || util.ERROR_MESSAGE);
          }
        });
      });
      $root.on('click', '.slide .sub, .slide span', function() {
        self.slide($(this).closest('li'));
      });
      $root.on('click', '.list>li>.c>pre', function() {
        self.slide($(this).closest('li'));
      });
      $root.on('click', '.list2 pre, .slide2 .sub', function() {
        let $this = $(this);
        let $li = $this.closest('li');
        if($li.hasClass('on')) {
          $li.removeClass('on');
          let $slide = $last.find('.slide');
          self.emit('chooseSubComment', $slide.attr('rid'), $slide.attr('cid'), $slide.attr('name'));
        }
        else {
          $li.parent().find('.on').removeClass('on');
          $li.addClass('on');
          self.emit('chooseSubComment', $this.attr('rid'), $this.attr('cid'), $this.attr('name'));
        }
      });
      $root.on('click', '.more', function() {
        let $message = $(this);
        let cid = $message.attr('cid');
        $message.removeClass('more').text('读取中...');
        ajax = net.postJSON(self.props.subUrl, { rootID: cid, skip: subSkipHash[cid], take }, function(res) {
          if(res.success) {
            let data = res.data;
            if(data.data.length) {
              subSkipHash[cid] += data.data.length;
              let s = '';
              data.data.forEach(function (item) {
                s += self.genChildComment(item);
              });
              let $ul = $message.prev();
              $ul.append(s);
              if(data.data.length < take) {
                $message.addClass('fn-hide');
              }
              else {
                $message.addClass('more').text('点击加载更多');
              }
            }
            else {
              $message.addClass('fn-hide');
            }
          }
          else {
            $message.addClass('more').text(res.message || util.ERROR_MESSAGE);
          }
        }, function(res) {
          $message.addClass('more').text(res.message || util.ERROR_MESSAGE);
        });
      });
      $root.on('click', '.remove', function() {
        let $btn = $(this);
        if(window.confirm('会删除子留言哦，确定要删除吗？')) {
          let cid = $btn.attr('cid');
          net.postJSON(self.props.delUrl, {commentID: cid}, function(res) {
            if(res.success) {
              $btn.closest('li').remove();
              self.empty = !$(self.ref.list.element).children('li').length;
            }
            else if(res.code === 1000) {
              migi.eventBus.emit('NEED_LOGIN');
            }
            else {
              alert(res.message || util.ERROR_MESSAGE);
            }
          }, function(res) {
            alert(res.message || util.ERROR_MESSAGE);
          });
        }
      });
      migi.eventBus.on('subCmtDelTo', function() {
        if($last && $last.hasClass('on')) {
          self.hideLast();
          self.emit('closeSubComment');
        }
      });
    });
  }
  @bind message
  @bind empty
  slide($li) {
    let self = this;
    if(ajax) {
      ajax.abort();
    }
    let $slide = $li.find('.slide');
    let $list2 = $li.find('.list2');
    let $ul = $list2.find('ul');
    let $message = $list2.find('.message');
    let cid = $slide.attr('cid');
    let rid = $slide.attr('rid');
    if($last && $last[0] !== $li[0] && $last.hasClass('on')) {
      self.hideLast();
    }
    if($li.hasClass('on')) {
      $li.removeClass('on');
      $li.find('li.on').removeClass('on');
      $list2.css('height', 0);
      self.emit('closeSubComment');
      $last = null;
      if(subLoadHash[cid] === IS_LOADING) {
        subLoadHash[cid] = NOT_LOADED;
      }
    }
    else {
      $last = $li;
      $li.addClass('on');
      self.emit('chooseSubComment', $slide.attr('rid'), $slide.attr('cid'), $slide.attr('name'), $slide.find('.sub').text());
      let state = subLoadHash[cid];
      if(state === HAS_LOADED || state === IS_LOADING) {
        $list2.css('height', 'auto');
      }
      else {
        $list2.css('height', 'auto');
        subLoadHash[cid] = IS_LOADING;
        ajax = net.postJSON(self.props.subUrl, { rootID: cid, skip: 0, take }, function(res) {
          if(res.success) {
            subLoadHash[cid] = HAS_LOADED;
            let s = '';
            let data = res.data;
            data.data.forEach(function(item) {
              s += self.genChildComment(item);
            });
            $ul.append(s);
            if(data.data.length >= data.Size) {
              $message.addClass('fn-hide');
            }
            else {
              $message.addClass('more').text('点击加载更多');
              subSkipHash[cid] = data.data.length;
            }
            $ul.removeClass('fn-hide');
            $list2.css('height', 'auto');
          }
          else {
            subLoadHash[cid] = NOT_LOADED;
            $message.text(res.message || util.ERROR_MESSAGE);
          }
        }, function(res) {
          subLoadHash[cid] = NOT_LOADED;
          $message.text(res.message || util.ERROR_MESSAGE);
        });
      }
    }
  }
  slideOn(cid) {
    let $slide = $(this.element).find('#comment_' + cid).find('.slide');
    if(!$slide.hasClass('on')) {
      $slide.find('.sub').click();
    }
  }
  clearData() {
    if(ajax) {
      ajax.abort();
    }
    this.message = '';
    this.setData();
    subLoadHash = {};
    subSkipHash = {};
    $last = null;
  }
  setData(data) {
    let self = this;
    let s = '';
    (data || []).forEach(function(item) {
      s += self.genComment(item);
    });
    $(self.ref.list.element).html(s);
    self.empty = !s;
  }
  appendData(data) {
    let self = this;
    let s = '';
    (data || []).forEach(function(item) {
      s += self.genComment(item);
    });
    $(self.ref.list.element).append(s);
    if(s) {
      self.empty = false;
    }
  }
  prependData(item) {
    this.genComment(item).prependTo(this.ref.list.element);
    this.empty = false;
  }
  prependChild(item, parentID) {
    this.prependData(item);
    let $comment = $('#comment_' + item.RootID);
    let $list2 = $comment.find('.list2');
    let $ul = $list2.find('ul');
    let state = subLoadHash[item.RootID];
    if(state === HAS_LOADED || state === IS_LOADING) {
      let li = this.genChildComment(item);
      li.prependTo($ul[0]);
    }
    if($ul.closest('li').find('.slide').hasClass('on')) {
      $list2.css('height', $ul.height());
    }
    let $num = $comment.find('.slide small.sub');
    $num.text((parseInt($num.text()) || 0) + 1);
    // if(item.RootID !== parentID) {
    //   let $num = $('#comment_' + parentID).find('small.sub');
    //   $num.text((parseInt($num.text()) || 0) + 1);
    // }
  }
  genComment(item) {
    let id = item.ID;
    let url = item.IsAuthor ? '/author.html?authorId=' + item.SendUserID : '/user.html?userID=' + item.SendUserID;
    return <li class="user" id={ 'comment_' + id }>
      <div class="t fn-clear">
        <div class="profile fn-clear">
          <div class="pic" href={ url } title={ item.SendUserNickName }>
            <img class="pic" src={ util.autoSsl(util.img60_60_80(item.SendUserHead_Url || '/src/common/head.png')) }/>
          </div>
          <div class="txt">
            <div class="name" href={ url } title={ item.SendUserNickName }>{ item.SendUserNickName }</div>
            <small class="time" rel={ item.CreateTime }>{ util.formatDate(item.CreateTime) }</small>
          </div>
        </div>
        <b class="fn" own={ item.IsOwn } userId={ item.SendUserID }/>
      </div>
      <div class="c">
        {
          item.ParentContent
            ? <p class="quote">
              <label>回复@{ item.ParentSendUserNickName }：</label>
              <span>{ item.ParentContent }</span>
            </p>
            : ''
        }
        <pre>{ item.LContent }<span class="placeholder"/></pre>
        <div class="slide" cid={ id } rid={ item.RootID } name={ item.SendUserNickName }>
          <small cid={ id } class={ 'like' + (item.ISLike ? ' liked' : '') }></small>
          <small class="sub">{ item.CommentCountRaw || '' }</small>
          <span>收起</span>
        </div>
        <b class="arrow"/>
      </div>
      <div class="list2">
        <ul class="fn-hide"/>
        <p class="message" cid={ id } rid={ item.RootID }>读取中...</p>
      </div>
    </li>;
  }
  genChildComment(item) {
    if(item.IsAuthor) {
      return <li class="author" id={ 'comment_' + item.Send_ID }>
        <div class="t fn-clear">
          <div class="profile fn-clear" cid={ item.Send_ID } rid={ item.RootID } name={ item.Send_AuthorName }>
            <a class="pic" href={ '/author/' + item.AuthorID }>
              <img class="pic" src={ util.autoSsl(util.img60_60_80(item.Send_AuthorHeadUrl || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png')) }/>
            </a>
            <div class="txt">
              <small class="time" rel={ item.Send_Time }>{ util.formatDate(item.Send_Time) }</small>
              <a class="name" href={ '/author/' + item.AuthorID }>{ item.Send_AuthorName }</a>
            </div>
          </div>
          <div class="fn fn-clear">
            {
              item.ISOwn ? <span cid={ item.Send_ID } class="remove">删除</span> : ''
            }
          </div>
        </div>
        <div class="c">
          {
            item.Content
              ? <p class="quote">
                  <label>回复@{ item.Send_ToUserName }：</label>
                  <span>{ item.Content }</span>
                </p>
              : ''
          }
          <pre cid={ item.Send_ID } rid={ item.RootID } name={ item.Send_AuthorName }>{ item.Send_Content }</pre>
          <div class="slide2">
            <small cid={ item.Send_ID } class={ 'like' + (item.IsLike ? ' liked' : '') }>{ item.LikeCount }</small>
            <small class="sub" cid={ item.Send_ID } rid={ item.RootID } name={ item.Send_AuthorName }>回复</small>
          </div>
          <b class="arrow"/>
        </div>
      </li>;
    }
    return <li id={ 'comment_' + item.Send_ID }>
      <div class="t fn-clear">
        <div class="profile fn-clear" cid={ item.Send_ID } rid={ item.RootID } name={ item.Send_UserName }>
          <a class="pic" href={ '/user/' + item.Send_UserID }>
            <img class="pic" src={ util.autoSsl(util.img60_60_80(item.Send_UserHeadUrl || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png')) }/>
          </a>
          <div class="txt">
            <small class="time" rel={ item.Send_Time }>{ util.formatDate(item.Send_Time) }</small>
            <a class="name" href={ '/user/' + item.Send_UserID }>{ item.Send_UserName }</a>
          </div>
        </div>
        <div class="fn fn-clear">
          {
            item.ISOwn ? <span cid={ item.Send_ID } class="remove">删除</span> : ''
          }
        </div>
      </div>
      <div class="c">
        {
          item.Content
            ? <p class="quote">
              <label>回复@{ item.Send_ToUserName }：</label>
              <span>{ item.Content }</span>
            </p>
            : ''
        }
        <pre cid={ item.Send_ID } rid={ item.RootID } name={ item.Send_UserName }>{ item.Send_Content }</pre>
        <div class="slide2">
          <small cid={ item.Send_ID } class={ 'like' + (item.IsLike ? ' liked' : '') }>{ item.LikeCount }</small>
          <small class="sub" cid={ item.Send_ID } rid={ item.RootID } name={ item.Send_UserName }>回复</small>
        </div>
        <b class="arrow"/>
      </div>
    </li>;
  }
  hideLast() {
    if($last && $last.hasClass('on')) {
      $last.removeClass('on').find('.list2').css('height', 0).find('li.on').removeClass('on');
    }
    $last = null;
  }
  render() {
    return <div class="cp-comment">
      <ul class="list" ref="list" dangerouslySetInnerHTML={ this.html }/>
      <p class={ 'empty' + (this.empty ? '' : ' fn-hide') }>这儿空空的，需要你的留言噢(* ॑꒳ ॑* )</p>
      <p class={ 'message' + (this.message ? '' : ' fn-hide') }>{ this.message }</p>
    </div>;
  }
}

export default Comment;
