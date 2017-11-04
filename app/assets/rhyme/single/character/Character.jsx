/**
 * Created by army8735 on 2017/8/26.
 */

import Comment from './Comment.jsx';

let skip = 0;
let take = 10;
let sortType = 0;
let myComment = 0;
let currentCount = 0;
let loadingMore;
let ajax;
let HASH = {
  'hetu': {
    skip: 0,
    authorId: window.HETU_ID,
    state: window.FOLLOW.FOLLOW_HETU,
    img: `//zhuanquan.xyz/rhymesland/hetu_a.png`,
    w: 367,
    h: 580,
    n: 181
  },
  'sixia': {
    skip: 0,
    authorId: window.SIXIA_ID,
    state: window.FOLLOW.FOLLOW_SIXIA,
    // img: `//192.168.0.7/sixia_a.png`,
    img: `//zhuanquan.xyz/rhymesland/sixia_a.png`,
    w: 400,
    h: 600,
    n: 181
  },
  'muhan': {
    skip: 0,
    authorId: window.MUHAN_ID,
    state: window.FOLLOW.FOLLOW_MUHAN,
    // img: `//192.168.0.7/muhan_a.png`,
    img: `//zhuanquan.xyz/rhymesland/muhan_a.png`,
    w: 400,
    h: 600,
    n: 181
  },
  'mi': {
    skip: 0,
    authorId: window.MI_ID,
    state: window.FOLLOW.FOLLOW_MI,
    // img: '//192.168.0.7/mi_a.png',
    img: `//zhuanquan.xyz/rhymesland/mi_a.png`,
    w: 400,
    h: 600,
    n: 181
  },
  'jiemeng': {
    skip: 0,
    authorId: window.JIEMENG_ID,
    state: window.FOLLOW.FOLLOW_JIEMENG,
  }
};
let index = 0;
let showAnimate;
let $wrap;
let $cp;

class Character extends migi.Component{
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      $wrap = $(self.ref.wrap.element);
      $cp = $wrap.find('.cp_comment');
      $wrap.on('scroll', function() {
        self.checkMore();
      });
      self.ref.comment.on('chooseSubComment', function(rid, cid, name) {
        self.rootId = rid;
        self.replayId = cid;
        self.replayName = name;
      });
      self.ref.comment.on('noSubComment', function() {
        self.clickReplay();
      });
      self.ref.comment.on('copy', function(url) {
        migi.eventBus.emit('share', url);
      });
    });
  }
  @bind sname
  @bind showComment
  @bind rootId = null
  @bind replayId = null
  @bind replayName
  @bind hasContent
  @bind loading
  user(name) {
    let self = this;
    self.sname = name;
    let hash = HASH[name];
    showAnimate = true;
    index = 0;
    this.ref.img.element.removeAttribute('style');
    if(hash.animate) {
      hash.animate();
    }
    else if(hash.img) {
      let bg = self.ref.img.element;
      let img = new Image();
      img.onload = function() {
        if(self.sname !== name) {
          return;
        }
        function anm() {
          if(!showAnimate) {
            return;
          }
          let x = hash.w * (index % 20);
          let y = hash.h * Math.floor(index / 20);
          bg.style.backgroundImage = `url(${hash.img})`;
          bg.style.backgroundPosition = `${-x}px ${-y}px`;
          bg.style.backgroundSize = 'auto';
          index++;
          if(index >= hash.n) {
            index = 0;
          }
          // requestAnimationFrame(anm);
          setTimeout(anm, 20);
        }
        hash.animate = anm;
        anm();
      };
      img.src = hash.img;
    }
  }
  show() {
    let self = this;
    $(self.element).removeClass('fn-hide');
    $(this.ref.left.element).removeClass('on');
    $(this.ref.right.element).removeClass('on');
    setTimeout(function() {
      $(self.ref.left.element).addClass('on');
      $(self.ref.right.element).addClass('on');
    }, 100);
  }
  hide() {
    $(this.element).addClass('fn-hide');
    $(this.ref.left.element).removeClass('on');
    $(this.ref.right.element).removeClass('on');
    this.rootId = null;
    this.replayId = null;
    this.replayName = null;
    this.showComment = false;
    this.ref.comment.abort();
    this.ref.comment.showComment();
    skip = 0;
    currentCount = 0;
    Object.keys(HASH).forEach(function(key) {
      HASH[key].skip = 0;
      HASH[key].end = false;
    });
    showAnimate = false;
    this.ref.img.element.removeAttribute('style');
  }
  clickFollow(e, vd) {
    e.preventDefault();
    let self = this;
    if(HASH[self.sname].state === 1) {
      util.postJSON('/api/author/unFollow', { authorID: HASH[self.sname].authorId }, function(res) {
        if(res.success) {
          HASH[self.sname].state = 0;
          self.sname = self.sname;
          alert('取关成功');
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
    else {
      util.postJSON('/api/author/follow', { authorID: HASH[self.sname].authorId }, function(res) {
        if(res.success) {
          HASH[self.sname].state = 1;
          self.sname = self.sname;
          alert('关注成功');
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
  }
  clickComment(e) {
    e.preventDefault();
    this.showComment = true;
    this.load();
  }
  clickClose(e) {
    e.preventDefault();
    $wrap.scrollTop(0);
    this.showComment = false;
    if(ajax) {
      ajax.abort();
    }
    this.ref.comment.abort();
    this.ref.comment.showComment();
    skip = 0;
    currentCount = 0;
    HASH[this.sname].skip = 0;
    HASH[this.sname].end = false;
    this.rootId = null;
    this.replayId = null;
    this.replayName = null;
  }
  load() {
    let self = this;
    self.ref.comment.message = '读取中...';
    if(ajax) {
      ajax.abort();
    }
    self.loading = true;
    ajax = util.postJSON('/api/author/commentList', { authorID: HASH[self.sname].authorId , skip, take, sortType, myComment, currentCount }, function(res) {
      if(res.success) {
        let data = res.data;
        // currentCount = data.Size;
        skip += take;
        if(data.Size) {
          self.ref.comment.message = '';
          self.ref.comment.showComment(res.data.data);
        }
        else {
          self.ref.comment.showComment(res.data.data);
          self.ref.comment.message = '暂无评论';
        }
      }
      else {
        if(res.code === 1000) {
          migi.eventBus.emit('NEED_LOGIN');
        }
        self.ref.comment.showComment();
        self.ref.comment.message = res.message || util.ERROR_MESSAGE;
      }
      self.loading = false;
    }, function(res) {
      self.ref.comment.showComment();
      self.ref.comment.message = res.message || util.ERROR_MESSAGE;
      self.loading = false;
    });
  }
  checkMore() {
    let self = this;
    if(self.showComment && !loadingMore && !HASH[self.sname].end && $wrap.scrollTop() + $wrap.height() + 30 > $cp.height()) {
      loadingMore = true;
      if(ajax) {
        ajax.abort();
      }
      ajax = util.postJSON('/api/author/commentList', { authorID: HASH[self.sname].authorId, skip, take, sortType, myComment, currentCount }, function(res) {
        if(res.success) {
          let data = res.data;
          // currentCount = data.Size;
          skip += take;
          if(data.data.length) {
            self.ref.comment.addMore(data.data);
            if(data.data.length < take) {
              self.ref.comment.message = '';
              HASH[self.sname].end = true;
            }
          }
          else {
            self.ref.comment.message = '';
            HASH[self.sname].end = true;
          }
        }
        else {
          self.ref.comment.message = res.message || util.ERROR_MESSAGE;
        }
        loadingMore = false;
      }, function(res) {
        self.ref.comment.message = res.message || util.ERROR_MESSAGE;
        loadingMore = false;
      });
    }
  }
  clickReplay() {
    this.replayId = null;
    this.replayName = null;
    this.rootId = null;
  }
  input(e, vd) {
    let v = $(vd.element).val().trim();
    this.hasContent = v.length > 0;
    if(!window.IS_LOGIN) {
      migi.eventBus.emit('NEED_LOGIN');
    }
  }
  focus() {
    if(!window.IS_LOGIN) {
      migi.eventBus.emit('NEED_LOGIN');
    }
  }
  click(e) {
    e.preventDefault();
    let self = this;
    if(self.hasContent) {
      let $input = $(this.ref.input.element);
      let content = $input.val();
      let parentID = self.replayId !== null ? self.replayId : -1;
      let rootID = self.rootId !== null ? self.rootId : -1;
      self.loading = true;
      if(ajax) {
        ajax.abort();
      }
      ajax = util.postJSON('/api/author/addComment', {
        parentID,
        rootID,
        content,
        authorID: HASH[self.sname].authorId,
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
        else if(res.code === 1000) {
          migi.eventBus.emit('NEED_LOGIN');
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
  }
  switchType(e, vd) {
    let $ul = $(vd.element);
    $ul.toggleClass('alt');
    $ul.find('li').toggleClass('cur');
    let rel = $ul.find('.cur').attr('rel');
    HASH[this.sname].skip = 0;
    HASH[this.sname].end = false;
    currentCount = 0;
    sortType = rel;
    skip = 0;
    this.ref.comment.showComment();
    this.ref.comment.abort();
    this.load();
  }
  switchType2(e, vd) {
    let $ul = $(vd.element);
    $ul.toggleClass('alt');
    $ul.find('li').toggleClass('cur');
    let rel = $ul.find('.cur').attr('rel');
    HASH[this.sname].skip = 0;
    HASH[this.sname].end = false;
    currentCount = 0;
    myComment = rel;
    skip = 0;
    this.ref.comment.showComment();
    this.ref.comment.abort();
    this.load();
  }
  clickShare(e) {
    e.preventDefault();
    migi.eventBus.emit('share', location.href);
  }
  render() {
    return <div class={ 'main character ' + this.sname }>
      <div class="con">
        <div class="img" ref="img"/>
        <ul class="btn fn-clear">
          <li><a href="#" onClick={ this.clickFollow }><span>{ HASH[this.sname] && HASH[this.sname].state === 1 ? '取关' : '关注' }</span></a></li>
          <li><a href="#" class="comment" onClick={ this.clickComment }><span>{ this.sname === 'jiemeng' ? '留言' : '表白' }</span></a></li>
          <li><a href="#" class="share" onClick={ this.clickShare }><span>分享</span></a></li>
        </ul>
        <div class="left" ref="left"/>
        <div class="right" ref="right"/>
      </div>
      <div class={ 'comments' + (this.showComment ? '' : ' fn-hide') } ref="comments">
        <div class="c">
          <div class="wrap" ref="wrap">
            <Comment ref="comment" zanUrl="/api/author/likeComment" subUrl="/api/author/subCommentList" delUrl="/api/author/delComment"/>
          </div>
          <a href="#" class="close" onClick={ this.clickClose }/>
          <ul class="type2 fn-clear" onClick={ { li: this.switchType2 } }>
            <li class="cur" rel="0"><span>全部</span></li>
            <li rel="1"><span>我的</span></li>
          </ul>
          <ul class="type fn-clear" onClick={ { li: this.switchType } }>
            <li class="cur" rel="0"><span>最新</span></li>
            <li rel="1"><span>最热</span></li>
          </ul>
          <div class="form">
            <div class={ 'reply' + (this.replayId ? '' : ' fn-hide') } onClick={ this.clickReplay }>{ this.replayName }</div>
            <div class="inputs">
              <input ref="input" maxlength="1000" type="text" placeholder="留言..." onInput={ this.input } onFocus={ this.focus }/>
            </div>
            <button onClick={ this.click } class={ this.hasContent && !this.loading ? '' : 'dis' }>确定</button>
          </div>
        </div>
      </div>
    </div>;
  }
}

export default Character;
