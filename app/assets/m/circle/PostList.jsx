/**
 * Created by army8735 on 2017/11/5.
 */

'use strict';

import net from '../../d/common/net';
import util from '../../d/common/util';

let skip = 20;
let take = 20;

class PostList extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    if(self.props.datas.Size) {
      let html = '';
      self.props.datas.data.forEach(function(item) {
        html += self.genItem(item);
      });
      self.html = html;
      self.on(migi.Event.DOM, function() {
        let $list = $(this.ref.list.element);
        $list.on('click', '.like', function() {
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
              $li.text(data.LikeCount);
            }
            else {
              alert(res.message || util.ERROR_MESSAGE);
            }
            $li.removeClass('loading');
          }, function() {
            alert(res.message || util.ERROR_MESSAGE);
            $li.removeClass('loading');
          });
        });
        $list.on('click', '.con,.imgs', function() {
          location.href = $(this).closest('li').find('.more').attr('href');
        });
        $list.on('click', '.comment', function() {
          location.href = $(this).closest('.wrap').find('.more').attr('href');
        });
        $list.on('click', '.del', function() {
          if(window.confirm('确认删除吗？')) {
            let postID = $(this).attr('rel');
            let $li = $(this).closest('.wrap').closest('li');
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

        let $window = $(window);
        $window.on('scroll', function() {
          self.checkMore($window);
        });
      });
    }
  }
  @bind loading
  @bind loadEnd
  @bind message
  genItem(item) {
    let len = item.Content.length;
    let maxLen = 144;
    if(item.IsAuthor) {
      return <li class="author">
        <div class="profile fn-clear">
          <img class="pic" src={ util.autoSsl(util.img96_96_80(item.SendUserHead_Url || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png')) }/>
          <div class="txt">
            <a href={ '/author/' + item.AuthorID } class="name">{ item.SendUserNickName }</a>
            <a class="time" href={ '/post/' + item.ID }>{ util.formatDate(item.Createtime) }</a>
          </div>
        </div>
        <div class="wrap">
          {
            item.Title
              ? <a href={ '/post/' + item.ID } class="t">{ item.Title }</a>
              : ''
          }
          <pre class="con">
            { len > maxLen ? (item.Content.slice(0, maxLen) + '...') : item.Content }
            <a href={ '/post/' + item.ID } class={ 'more' + (len > maxLen ? '' : ' fn-hide') }>查看全部</a>
          </pre>
          {
            item.Image_Post
              ? <ul class="imgs fn-clear">
                {
                  item.Image_Post.map(function(item) {
                    return <li style={ 'background-image:url(' + util.autoSsl(util.img120_120_80(item.FileUrl)) + ')' }/>;
                  })
                }
              </ul>
              : ''
          }
          <ul class="btn fn-clear">
            <li class={ 'like' + (item.ISLike ? ' has' : '') } rel={ item.ID }>{ item.LikeCount }</li>
            <li class="comment" rel={ item.ID }>{ item.CommentCount }</li>
            {
              item.IsOwn ? <li class="del" rel={ item.ID }/> : ''
            }
          </ul>
          <b class="arrow"/>
        </div>
      </li>;
    }
    return <li>
      <div class="profile fn-clear">
        <img class="pic" src={ util.autoSsl(util.img96_96_80(item.SendUserHead_Url || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png')) }/>
        <div class="txt">
          <span class="name">{ item.SendUserNickName }</span>
          <a class="time" href={ '/post/' + item.ID }>{ util.formatDate(item.Createtime) }</a>
        </div>
      </div>
      <div class="wrap">
        {
          item.Title
            ? <a href={ '/post/' + item.ID } class="t">{ item.Title }</a>
            : ''
        }
        <pre class="con">
          { len > maxLen ? (item.Content.slice(0, maxLen) + '...') : item.Content }
          <a href={ '/post/' + item.ID } class={ 'more' + (len > maxLen ? '' : ' fn-hide') }>查看全部</a>
        </pre>
        {
          item.Image_Post
            ? <ul class="imgs fn-clear">
              {
                item.Image_Post.map(function(item) {
                  return <li style={ 'background-image:url(' + util.autoSsl(util.img120_120_80(item.FileUrl)) + ')' }/>;
                })
              }
            </ul>
            : ''
        }
        <ul class="btn fn-clear">
          <li class={ 'like' + (item.ISLike ? ' has' : '') } rel={ item.ID }>{ item.LikeCount }</li>
          <li class="comment" rel={ item.ID }>{ item.CommentCount }</li>
          {
            item.IsOwn ? <li class="del" rel={ item.ID }/> : ''
          }
        </ul>
        <b class="arrow"/>
      </div>
    </li>;
  }
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
    net.postJSON('/api/circle/list', { circleID: $CONFIG.circleID, skip, take }, function(res) {
      if(res.success) {
        let data = res.data;
        skip += data.Size;
        self.setData(data.data);
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
  setData(data) {
    let self = this;
    let html = '';
    data.forEach(function(item) {
      html += self.genItem(item);
    });
    $(self.ref.list.element).append(html);
  }
  render() {
    return <div class="post-list">
      {
        this.props.datas.Size
          ? <ol ref="list" dangerouslySetInnerHTML={ this.html }/>
          : <div class="empty">暂无内容</div>
      }
      <div class="message">{ this.message }</div>
    </div>;
  }
}

export default PostList;
