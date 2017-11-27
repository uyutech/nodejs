/**
 * Created by army8735 on 2017/11/13.
 */

'use strict';

import net from '../../../d/common/net';
import util from '../../../d/common/util';

let take = 30;
let skip = take;

class PostList extends migi.Component {
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
          location.href = $(this).parent().closest('li').find('.time').attr('href');
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
  encode(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/#(\S.*?)#/g, `<strong>#$1#</strong>`)
      .replace(/(http(?:s)?:\/\/[\w-]+\.[\w]+\S*)/gi, '<a href="$1" target="_blank">$1</a>');
  }
  genItem(item) {
    let len = item.Content.length;
    let id = item.ID;
    let maxLen = 144;
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
            <img src={ util.autoSsl(util.img208_208_80(item.SendUserHead_Url || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png')) }/>
          </a>
          <div class="txt">
            <a href={ '/author/' + item.AuthorID } class="name">{ item.SendUserNickName }</a>
            <a class="time" href={ '/post/' + id }>{ util.formatDate(item.Createtime) }</a>
          </div>
          <div class="circle">
            <ul>
              {
                (item.Taglist || []).map(function(item) {
                  return <li><a href={ '/circle/' + item.TagID }>{ item.TagName }圈</a></li>;
                })
              }
            </ul>
          </div>
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
              ? <ul class={ 'imgs fn-clear' + (item.Image_Post.length > 4 ? '' : (' n' + item.Image_Post.length)) }>
                {
                  item.Image_Post.length > 9
                    ? item.Image_Post.slice(0, 9).map(function(item, i) {
                      if(i === 8) {
                        return <li class="all" style={ 'background-image:url(' + util.autoSsl(util.img172_172_80(item.FileUrl)) + ')' }>
                          <img src={ util.autoSsl(util.img172_172_80(item.FileUrl)) }/>
                          <a href={ '/post/' + id }>查看全部</a>
                        </li>;
                      }
                      return <li style={ 'background-image:url(' + util.autoSsl(util.img172_172_80(item.FileUrl)) + ')' }>
                        <img src={ util.autoSsl(util.img172_172_80(item.FileUrl)) }/>
                      </li>;
                    })
                    : item.Image_Post.map(function(item) {
                      return <li style={ 'background-image:url(' + util.autoSsl(util.img172_172_80(item.FileUrl)) + ')' }>
                        <img src={ util.autoSsl(util.img172_172_80(item.FileUrl)) }/>
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
          <ul class="btn">
            <li class={ 'favor' + (item.ISFavor ? ' has' : '') } rel={ id }><b/><span>{ item.FavorCount }</span></li>
            <li class={ 'like' + (item.ISLike ? ' has' : '') } rel={ id }><b/><span>{ item.LikeCount }</span></li>
            <li class="comment" rel={ id }><b/><span>{ item.CommentCount }</span></li>
            { item.IsOwn ? <li class="del" rel={ id }><b/></li> : '' }
          </ul>
        </div>
      </li>;
    }
    return <li>
      <div class="profile fn-clear">
        <a class="pic" href={ '/user/' + item.SendUserID }>
          <img src={ util.autoSsl(util.img208_208_80(item.SendUserHead_Url || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png')) }/>
        </a>
        <div class="txt">
          <a class="name" href={ '/user/' + item.SendUserID }>{ item.SendUserNickName }</a>
          <a class="time" href={ '/post/' + id }>{ util.formatDate(item.Createtime) }</a>
        </div>
        <div class="circle">
          <ul>
            {
              (item.Taglist || []).map(function(item) {
                return <li><a href={ '/circle/' + item.TagID }>{ item.TagName }圈</a></li>;
              })
            }
          </ul>
        </div>
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
            ? <ul class={ 'imgs fn-clear' + (item.Image_Post.length > 4 ? '' : (' n' + item.Image_Post.length)) }>
              {
                item.Image_Post.length > 9
                  ? item.Image_Post.slice(0, 9).map(function(item, i) {
                    if(i === 8) {
                      return <li class="all" style={ 'background-image:url(' + util.autoSsl(util.img172_172_80(item.FileUrl)) + ')' }>
                        <img src={ util.autoSsl(util.img172_172_80(item.FileUrl)) }/>
                        <a href={ '/post/' + id }>查看全部</a>
                      </li>;
                    }
                    return <li style={ 'background-image:url(' + util.autoSsl(util.img172_172_80(item.FileUrl)) + ')' }>
                      <img src={ util.autoSsl(util.img172_172_80(item.FileUrl)) }/>
                    </li>;
                  })
                  : item.Image_Post.map(function(item) {
                    return <li style={ 'background-image:url(' + util.autoSsl(util.img172_172_80(item.FileUrl)) + ')' }>
                      <img src={ util.autoSsl(util.img172_172_80(item.FileUrl)) }/>
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
        <ul class="btn">
          <li class={ 'favor' + (item.ISFavor ? ' has' : '') } rel={ id }><b/><span>{ item.FavorCount }</span></li>
          <li class={ 'like' + (item.ISLike ? ' has' : '') } rel={ id }><b/><span>{ item.LikeCount }</span></li>
          <li class="comment" rel={ id }><b/><span>{ item.CommentCount }</span></li>
          { item.IsOwn ? <li class="del" rel={ id }><b/></li> : '' }
        </ul>
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
    let params = self.props.params || {};
    params.skip = skip;
    params.take = take;
    net.postJSON(self.props.url || '/api/circle/list', params, function(res) {
      if(res.success) {
        let data = res.data;
        skip += take;
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
    return <div class="cp-hotpost">
      {
        this.props.data && this.props.data.length
          ? <ol class="list" ref="list" dangerouslySetInnerHTML={ this.html }/>
          : <div class="empty">暂无内容</div>
      }
      <div class="message">{ this.message }</div>
    </div>;
  }
}

export default PostList;