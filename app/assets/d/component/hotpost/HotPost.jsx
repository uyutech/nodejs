/**
 * Created by army8735 on 2017/10/30.
 */

'use strict';

import util from '../../common/util';
import net from '../../common/net';

class HotPost extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    if(self.props.datas && self.props.datas.data && self.props.datas.data.length) {
      let html = '';
      self.props.datas.data.forEach(function(item) {
        html += self.genItem(item);
      });
      self.html = html;
      self.on(migi.Event.DOM, function() {
        let $list = $(this.ref.list.element);
        $list.on('click', '.con a', function(e) {
          e.stopPropagation();
          e.stopImmediatePropagation();
        });
        $list.on('click', '.like', function() {
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
        $list.on('click', '.comment', function() {
          let postID = $(this).attr('rel');
          if(parent && parent.setHash) {
            parent.setHash('/post/' + postID);
          }
          else {
            location.href = '/post/' + postID;
          }
        });
        $list.on('click', '.con,.imgs', function() {
          $(this).closest('li').find('.comment').click();
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
      });
    }
  }
  genItem(item) {
    let len = item.Content.length;
    let id = item.ID;
    let maxLen = 256;
    let imgLen = item.Image_Post.length;
    let html = len > maxLen ? (item.Content.slice(0, maxLen) + '...') : item.Content;
    html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/#(\S.*?)#/g, `<strong>#$1#</strong>`)
      .replace(/(http(?:s)?:\/\/[\w-]+\.[\w]+\S*)/gi, '<a href="$1" target="_blank">$1</a>');
    if(item.IsAuthor) {
      return <li class="author">
        <div class="profile fn-clear">
          <img class="pic" src={ util.autoSsl(util.img96_96_80(item.SendUserHead_Url || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png')) }/>
          <div class="txt">
            <a href={ '/author/' + item.AuthorID } class="name">{ item.SendUserNickName }</a>
            <a class="time" href={ '/post/' + id }>{ util.formatDate(item.Createtime) }</a>
          </div>
          <ul class="circle">
            {
              (item.Taglist || []).map(function(item) {
                return <li>{ item.TagName }圈</li>;
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
          <p class="con" dangerouslySetInnerHTML={ html }/>
          {
            item.Image_Post && imgLen
              ? <ul class={ 'imgs fn-clear' + (item.Image_Post.length > 4 ? '' : (' n' + item.Image_Post.length)) }>
                {
                  item.Image_Post.length > 4
                    ? item.Image_Post.slice(0, 4).map(function(item, i) {
                      if(i === 3) {
                        return <li class="all" style={ 'background-image:url(' + util.autoSsl(util.img480_480_80(item.FileUrl)) + ')' }>
                          <a href={ '/post/' + id }>查看全部</a>
                        </li>;
                      }
                      return <li style={ 'background-image:url(' + util.autoSsl(util.img480_480_80(item.FileUrl)) + ')' }/>;
                    })
                    : item.Image_Post.map(function(item) {
                      return <li style={ 'background-image:url(' + util.autoSsl(imgLen === 1 ? util.img980_980_80(item.FileUrl) : util.img480_480_80(item.FileUrl)) + ')' }/>;
                    })
                }
              </ul>
              : ''
          }
          <ul class="btn fn-clear">
            <li class={ 'like' + (item.ISLike ? ' has' : '') } rel={ id }>{ item.LikeCount }</li>
            <li class="comment" rel={ id }>{ item.CommentCount }</li>
            {
              item.IsOwn ? <li class="del" rel={ id }/> : ''
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
          <a class="time" href={ '/post/' + id }>{ util.formatDate(item.Createtime) }</a>
        </div>
        <ul class="circle">
          {
            (item.Taglist || []).map(function(item) {
              return <li>{ item.TagName }圈</li>;
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
        <p class="con" dangerouslySetInnerHTML={ html }/>
        {
          item.Image_Post && imgLen
            ? <ul class={ 'imgs fn-clear' + (item.Image_Post.length > 4 ? '' : (' n' + item.Image_Post.length)) }>
              {
                item.Image_Post.length > 4
                  ? item.Image_Post.slice(0, 4).map(function(item, i) {
                    if(i === 3) {
                      return <li class="all" style={ 'background-image:url(' + util.autoSsl(util.img480_480_80(item.FileUrl)) + ')' }>
                        <a href={ '/post/' + id }>查看全部</a>
                      </li>;
                    }
                    return <li style={ 'background-image:url(' + util.autoSsl(util.img480_480_80(item.FileUrl)) + ')' }/>;
                  })
                  : item.Image_Post.map(function(item) {
                    return <li style={ 'background-image:url(' + util.autoSsl(imgLen === 1 ? util.img980_980_80(item.FileUrl) : util.img480_480_80(item.FileUrl)) + ')' }/>;
                  })
              }
            </ul>
            : ''
        }
        <ul class="btn fn-clear">
          <li class={ 'like' + (item.ISLike ? ' has' : '') } rel={ id }>{ item.LikeCount }</li>
          <li class="comment" rel={ id }>{ item.CommentCount }</li>
          {
            item.IsOwn ? <li class="del" rel={ id }/> : ''
          }
        </ul>
        <b class="arrow"/>
      </div>
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
  render() {
    return <div class="cp-hotpost">
      {
        this.props.datas.data && this.props.datas.data.length
          ? <ol class="list" ref="list" dangerouslySetInnerHTML={ this.html }/>
          : <div class="empty">暂无内容</div>
      }
    </div>;
  }
}

export default HotPost;
