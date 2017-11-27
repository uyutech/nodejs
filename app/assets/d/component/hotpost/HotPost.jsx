/**
 * Created by army8735 on 2017/10/30.
 */

'use strict';

import util from '../../common/util';
import net from '../../common/net';
import Comment from '../comment/Comment.jsx';

let commentHash = {};
const LOADING = 0;
const LOADED = 1;
let take = 10;
let skip = take;
let $last;
let lastID;

class HotPost extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    if(self.props.take) {
      take = self.props.take;
      if(self.props.skip) {
        skip = self.props.skip;
      }
      else {
        skip = take;
      }
    }
    else if(self.props.skip) {
      skip = self.props.skip;
    }
    if(self.props.data && self.props.data.length) {
      if(self.props.take) {
        if(self.props.skip) {
          skip = self.props.skip;
        }
        else {
          skip = self.props.data.length;
        }
      }
      let html = '';
      self.props.data.forEach(function(item) {
        html += self.genItem(item);
      });
      self.html = html;
      self.on(migi.Event.DOM, function() {
        let $list = $(this.ref.list.element);
        $list.on('click', '.wrap > .con .snap', function() {
          $(this).closest('li').addClass('expand');
        });
        $list.on('click', '.wrap > .con .shrink', function() {
          let $li = $(this).closest('li');
          $li.removeClass('expand');
          $li[0].scrollIntoView(true);
        });
        $list.on('click', '.imgs', function() {
          $(this).closest('li').addClass('expand');
        });
        $list.on('click', '.imgs2', function() {
          let $li = $(this).closest('li');
          $li.removeClass('expand');
          $li[0].scrollIntoView(true);
        });
        $list.on('click', '.favor', function() {
          if(!$CONFIG.isLogin) {
            migi.eventBus.emit('NEED_LOGIN');
            return;
          }
          let $li = $(this);
          if($li.hasClass('loading')) {
            return;
          }
          $li.addClass('loading');
          let postID = $li.attr('rel');
          let url = '/api/post/favor';
          if($li.hasClass('has')) {
            url = '/api/post/unFavor';
          }
          net.postJSON(url, { postID }, function(res) {
            if(res.success) {
              let data = res.data;
              if(data.State === 'favorWork') {
                $li.addClass('has');
              }
              else {
                $li.removeClass('has');
              }
              $li.find('span').text(data.FavorCount);
            }
            else {
              alert(res.message || util.ERROR_MESSAGE);
            }
            $li.removeClass('loading');
          }, function(res) {
            alert(res.message || util.ERROR_MESSAGE);
            $li.removeClass('loading');
          });
        });
        $list.on('click', 'li > .btn .like', function() {
          if(!$CONFIG.isLogin) {
            migi.eventBus.emit('NEED_LOGIN');
            return;
          }
          let $li = $(this);
          if($li.hasClass('loading')) {
            return;
          }
          $li.addClass('loading');
          let postID = $li.attr('rel');
          net.postJSON('/api/post/like', { postID }, function(res) {
            if(res.success) {
              let data = res.data;
              if(data.ISLike) {
                $li.addClass('has');
              }
              else {
                $li.removeClass('has');
              }
              $li.find('span').text(data.LikeCount);
            }
            else {
              alert(res.message || util.ERROR_MESSAGE);
            }
            $li.removeClass('loading');
          }, function(res) {
            alert(res.message || util.ERROR_MESSAGE);
            $li.removeClass('loading');
          });
        });
        $list.on('click', '.comment', function() {
          let $this = $(this);
          let postID = $this.attr('rel');
          let $li = $this.parent().closest('li');
          let $commentList = $li.children('.comment-list');
          let commentData;
          if($commentList[0]) {
            commentData = commentHash[postID];
            $commentList.toggleClass('fn-hide');
            if($last && $last[0] && $last[0] !== $commentList[0]) {
              $last.closest('li').find('.comment.on').removeClass('on');
              $last.addClass('fn-hide');
            }
            commentHash[lastID].comment.hideLast();
          }
          else {
            if($last && $last[0]) {
              $last.closest('li').find('.comment.on').removeClass('on');
              $last.addClass('fn-hide');
              commentHash[lastID].comment.hideLast();
            }
            $commentList = $(`<div class="comment-list">
              <div class="fn">
                <ul class="type fn-clear">
                  <li class="cur" rel="0">全部<small></small></li>
                </ul>
              </div>
            </div>`);
            $li.append($commentList);
            commentData = commentHash[postID] = {
              state: LOADING,
              skip: 0,
              take,
              myComment: 0,
            };
            let comment = <Comment zanUrl="/api/post/likeComment"
                                   subUrl="/api/post/subCommentList"
                                   delUrl="/api/post/delComment"
                                   message="卖力加载中(˘•ω•˘)…"/>;
            comment.appendTo($commentList[0]);
            comment.on('chooseSubComment', function(rid, cid, name) {
              self.emit('chooseSubComment', rid, cid, name);
            });
            comment.on('closeSubComment', function() {
              self.emit('closeSubComment');
            });
            commentData.comment = comment;
            net.postJSON('/api/post/commentList', {
              uid: $CONFIG.uid,
              postID,
              skip: 0,
              take,
              myComment: 0,
            }, function(res) {
              if(res.success) {
                $commentList.find('.type small').text(res.data.Count);
                comment.appendData(res.data.data);
                if(res.data.Size) {
                  if(res.data.Size > take) {
                    $commentList.append(`<a href="/post/${postID}" class="comment-more">查看更多 ٩(ˊᗜˋ*)و</a>`);
                  }
                }
                else {
                  comment.empty = true;
                }
                commentData.skip += take;
              }
              else {
                alert(res.message || util.ERROR_MESSAGE);
              }
              commentData.state = LOADED;
            }, function(res) {
              alert(res.message || util.ERROR_MESSAGE);
              commentData.state = LOADED;
            });
          }
          if($this.hasClass('on')) {
            self.emit('closeComment');
            $last = null;
          }
          else {
            self.emit('openComment', postID, $li.find('> .profile > .txt > .name').text(), commentData.comment);
            if($last && $last[0] && $last[0] !== $commentList[0] && lastID > postID) {
              $li[0].scrollIntoView(true);
            }
            $last = $commentList;
          }
          lastID = postID;
          $this.toggleClass('on');
        });
        $list.on('click', '.del', function() {
          if(window.confirm('确认删除吗？')) {
            let postID = $(this).attr('rel');
            let $li = $(this).closest('li');
            net.postJSON('/api/post/del', { postID }, function(res) {
              if(res.success) {
                $li.remove();
              }
              else {
                alert(res.message || util.ERROR_MESSAGE);
              }
            }, function(res) {
              alert(res.message || util.ERROR_MESSAGE);
            });
          }
        });
      });
    }
  }
  encode(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/#(\S.*?)#/g, `<strong>#$1#</strong>`)
      .replace(/(http(?:s)?:\/\/[\w-]+\.[\w]+\S*)/gi, '<a href="$1" target="_blank">$1</a>');
  }
  genItem(item) {
    let len = item.Content.length;
    let id = item.ID;
    let maxLen = 256;
    let imgLen = item.Image_Post.length;
    let html = len > maxLen ? (item.Content.slice(0, maxLen) + '...') : item.Content;
    html = this.encode(html);
    if(len > maxLen) {
      html += '<span class="placeholder"></span><span class="more">查看全文</span>';
      let full = this.encode(item.Content) + '<span class="placeholder"></span><span class="shrink">收起全文</span>';
      html = '<p class="snap">' + html + '</p><p class="full">' + full + '</p>';
    }
    if(item.IsAuthor) {
      return <li class="author">
        <div class="profile fn-clear">
          <a class="pic" href={ '/author/' + item.AuthorID }>
            <img src={ util.autoSsl(util.img96_96_80(item.SendUserHead_Url || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png')) }/>
          </a>
          <div class="txt">
            <a class="name" href={ '/author/' + item.AuthorID }>{ item.SendUserNickName }</a>
            <a class="time" href={ '/post/' + id }>{ util.formatDate(item.Createtime) }</a>
          </div>
          <ul class="circle">
            {
              (item.Taglist || []).map(function(item) {
                return <li><a href={ '/circle/' + item.TagID }>{ item.TagName }圈</a></li>;
              })
            }
          </ul>
        </div>
        <div class="wrap">
          {
            item.Title
              ? <a href={ '/post/' + id } class="t">{ item.Title }</a>
              : ''
          }
          <div class="con" dangerouslySetInnerHTML={ html }/>
          {
            item.Image_Post && imgLen
              ? <ul class="imgs fn-clear">
                {
                  item.Image_Post.length > 9
                    ? item.Image_Post.slice(0, 9).map(function(item, i) {
                      if(i === 8) {
                        return <li class="all" style={ 'background-image:url(' + util.autoSsl(util.img332_332_80(item.FileUrl)) + ')' }>
                          <img src={ util.autoSsl(util.img332_332_80(item.FileUrl)) }/>
                          <a href={ '/post/' + id }>查看全部</a>
                        </li>;
                      }
                      return <li style={ 'background-image:url(' + util.autoSsl(util.img332_332_80(item.FileUrl)) + ')' }>
                        <img src={ util.autoSsl(util.img332_332_80(item.FileUrl)) }/>
                      </li>;
                    })
                    : item.Image_Post.map(function(item) {
                      return <li style={ 'background-image:url(' + util.autoSsl(util.img332_332_80(item.FileUrl)) + ')' }>
                        <img src={ util.autoSsl(util.img332_332_80(item.FileUrl)) }/>
                      </li>;
                    })
                }
              </ul>
              : ''
          }
          {
            item.Image_Post && imgLen
              ? <div class="imgs2">
                {
                  item.Image_Post.map(function(item, i) {
                    return <img src={ util.autoSsl(util.img1200__80(item.FileUrl)) } rel={ i }/>;
                  })
                }
              </div>
              : ''
          }
          <b class="arrow"/>
        </div>
        <ul class="btn fn-clear">
          <li class={ 'favor' + (item.ISFavor ? ' has' : '') } rel={ id }><b/><span>{ item.FavorCount }</span></li>
          <li class={ 'like' + (item.ISLike ? ' has' : '') } rel={ id }><b/><span>{ item.LikeCount }</span></li>
          <li class="comment" rel={ id }><b/><span>{ item.CommentCount }</span></li>
        </ul>
        { item.IsOwn ? <b class="del" rel={ id }/> : '' }
      </li>;
    }
    return <li>
      <div class="profile fn-clear">
        <a class="pic" href={ '/user/' + item.SendUserID }>
          <img src={ util.autoSsl(util.img96_96_80(item.SendUserHead_Url || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png')) }/>
        </a>
        <div class="txt">
          <a class="name" href={ '/user/' + item.SendUserID }>{ item.SendUserNickName }</a>
          <a class="time" href={ '/post/' + id }>{ util.formatDate(item.Createtime) }</a>
        </div>
        <ul class="circle">
          {
            (item.Taglist || []).map(function(item) {
              return <li><a href={ '/circle/' + item.TagID }>{ item.TagName }圈</a></li>;
            })
          }
        </ul>
      </div>
      <div class="wrap">
        {
          item.Title
            ? <a href={ '/post/' + id } class="t">{ item.Title }</a>
            : ''
        }
        <div class="con" dangerouslySetInnerHTML={ html }/>
        {
          item.Image_Post && imgLen
            ? <ul class="imgs fn-clear" rel={ id }>
              {
                item.Image_Post.length > 9
                  ? item.Image_Post.slice(0, 9).map(function(item, i) {
                    if(i === 8) {
                      return <li class="all" style={ 'background-image:url(' + util.autoSsl(util.img332_332_80(item.FileUrl)) + ')' }>
                        <img src={ util.autoSsl(util.img332_332_80(item.FileUrl)) }/>
                        <a href={ '/post/' + id }>查看全部</a>
                      </li>;
                    }
                    return <li style={ 'background-image:url(' + util.autoSsl(util.img332_332_80(item.FileUrl)) + ')' }>
                      <img src={ util.autoSsl(util.img332_332_80(item.FileUrl)) }/>
                    </li>;
                  })
                  : item.Image_Post.map(function(item) {
                    return <li style={ 'background-image:url(' + util.autoSsl(util.img332_332_80(item.FileUrl)) + ')' }>
                      <img src={ util.autoSsl(util.img332_332_80(item.FileUrl)) }/>
                    </li>;
                  })
              }
            </ul>
            : ''
        }
        {
          item.Image_Post && imgLen
            ? <div class="imgs2" rel={ id }>
              {
                item.Image_Post.map(function(item, i) {
                  return <img src={ util.autoSsl(util.img1200__80(item.FileUrl)) } rel={ i }/>;
                })
              }
            </div>
            : ''
        }
        <b class="arrow"/>
      </div>
      <ul class="btn fn-clear">
        <li class={ 'favor' + (item.ISFavor ? ' has' : '') } rel={ id }><b/><span>{ item.FavorCount }</span></li>
        <li class={ 'like' + (item.ISLike ? ' has' : '') } rel={ id }><b/><span>{ item.LikeCount }</span></li>
        <li class="comment" rel={ id }><b/><span>{ item.CommentCount }</span></li>
      </ul>
      { item.IsOwn ? <b class="del" rel={ id }/> : '' }
    </li>;
  }
  setData(data) {
    let self = this;
    let html = '';
    data.forEach(function(item) {
      html += self.genItem(item);
    });
    $(self.ref.list.element).html(html);
  }
  addData(data) {
    let self = this;
    let html = self.genItem(data);
    $(self.ref.list.element).prepend(html.toString());
  }
  clearData() {
    $(this.ref.list.element).html('');
  }
  render() {
    return <div class="cp-hotpost">
      {
        this.props.data && this.props.data.length
          ? <ol class="list" ref="list" dangerouslySetInnerHTML={ this.html }/>
          : <div class="message">暂无内容</div>
      }
    </div>;
  }
}

export default HotPost;
