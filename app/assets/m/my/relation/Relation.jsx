/**
 * Created by army8735 on 2017/12/1.
 */

'use strict';

import util from "../../../d/common/util";
import net from "../../../d/common/net";

let take = 15;
let skip = take;
let skip2 = take;
let skip3 = take;
let skip4 = take;
let loading;
let loading2;
let loading3;
let loading4;
let loadEnd;
let loadEnd2;
let loadEnd3;
let loadEnd4;

class Relation extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.tag = self.props.tag || '';
    loadEnd = self.props.userFriends.Size <= take;
    loadEnd2 = self.props.userFollows.Size <= take;
    loadEnd3 = self.props.userFollowers.Size <= take;
    loadEnd4 = self.props.follows.Size <= take;
    if(!self.props.userFriends.Size) {
      self.message = '暂无数据';
    }
    if(!self.props.userFollows.Size) {
      self.message2 = '暂无数据';
    }
    if(!self.props.userFollowers.Size) {
      self.message3 = '暂无数据';
    }
    if(!self.props.follows.Size) {
      self.message4 = '暂无数据';
    }
    self.on(migi.Event.DOM, function() {
      let $window = $(window);
      if(!loadEnd || !loadEnd2 || !loadEnd3 || !loadEnd4) {
        $window.on('scroll', function() {
          self.checkMore($window);
        });
        self.checkMore($window);
      }
    });
  }
  @bind tag
  @bind message
  @bind message2
  @bind message3
  @bind message4
  clickType(e, vd, tvd) {
    e.preventDefault();
    let $a = $(tvd.element);
    if(!$a.hasClass('cur')) {
      $(vd.element).find('.cur').removeClass('cur');
      $a.addClass('cur');
      let rel = $a.attr('rel');
      history.replaceState(null, '', '?tag=' + rel);
      this.tag = rel;
      this.checkMore($(window));
    }
  }
  checkMore($window) {
    let self = this;
    if(self.tag === 'follow') {
      if(loading2 || loadEnd2) {
        return;
      }
      let WIN_HEIGHT = $window.height();
      let HEIGHT = $(document.body).height();
      let bool;
      bool = $window.scrollTop() + WIN_HEIGHT + 30 > HEIGHT;
      if(bool) {
        self.load2();
      }
    }
    else if(self.tag === 'follower') {
      if(loading3 || loadEnd3) {
        return;
      }
      let WIN_HEIGHT = $window.height();
      let HEIGHT = $(document.body).height();
      let bool;
      bool = $window.scrollTop() + WIN_HEIGHT + 30 > HEIGHT;
      if(bool) {
        self.load3();
      }
    }
    else if(self.tag === 'author') {
      if(loading4 || loadEnd4) {
        return;
      }
      let WIN_HEIGHT = $window.height();
      let HEIGHT = $(document.body).height();
      let bool;
      bool = $window.scrollTop() + WIN_HEIGHT + 30 > HEIGHT;
      if(bool) {
        self.load4();
      }
    }
    else {
      if(loading || loadEnd) {
        return;
      }
      let WIN_HEIGHT = $window.height();
      let HEIGHT = $(document.body).height();
      let bool;
      bool = $window.scrollTop() + WIN_HEIGHT + 30 > HEIGHT;
      if(bool) {
        self.load();
      }
    }
  }
  load() {
    let self = this;
    if(loading || loadEnd) {
      return;
    }
    loading = true;
    self.message = '正在加载...';
    net.postJSON('/api/my/friendList', { skip, take }, function(res) {
      if(res.success) {
        let data = res.data;
        skip += take;
        let s = '';
        data.data.forEach(function(item) {
          s += self.genItem(item);
        });
        $(self.ref.userFriends.element).append(s);
        if(skip >= data.Size) {
          loadEnd = true;
          self.message = '已经到底了';
        }
        else {
          self.message = '';
        }
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
  load2() {
    let self = this;
    if(loading2 || loadEnd2) {
      return;
    }
    loading2 = true;
    self.message2 = '正在加载...';
    net.postJSON('/api/my/followList', { skip: skip2, take }, function(res) {
      if(res.success) {
        let data = res.data;
        skip2 += take;
        let s = '';
        data.data.forEach(function(item) {
          s += self.genItem(item);
        });
        $(self.ref.userFollows.element).append(s);
        if(skip2 >= data.Size) {
          loadEnd2 = true;
          self.message2 = '已经到底了';
        }
        else {
          self.message2 = '';
        }
      }
      else {
        alert(res.message || util.ERROR_MESSAGE);
      }
      loading2 = false;
    }, function(res) {
      alert(res.message || util.ERROR_MESSAGE);
      loading2 = false;
    });
  }
  load3() {
    let self = this;
    if(loading3 || loadEnd3) {
      return;
    }
    loading3 = true;
    self.message3 = '正在加载...';
    net.postJSON('/api/my/followerList', { skip: skip3, take }, function(res) {
      if(res.success) {
        let data = res.data;
        skip3 += take;
        let s = '';
        data.data.forEach(function(item) {
          s += self.genItem(item);
        });
        $(self.ref.userFollowers.element).append(s);
        if(skip3 >= data.Size) {
          loadEnd3 = true;
          self.message = '已经到底了';
        }
        else {
          self.message = '';
        }
      }
      else {
        alert(res.message || util.ERROR_MESSAGE);
      }
      loading3 = false;
    }, function(res) {
      alert(res.message || util.ERROR_MESSAGE);
      loading3 = false;
    });
  }
  load4() {
    let self = this;
    if(loading4 || loadEnd4) {
      return;
    }
    loading4 = true;
    self.message4 = '正在加载...';
    net.postJSON('/api/my/followerAuthor', { skip: skip4, take }, function(res) {
      if(res.success) {
        let data = res.data;
        skip4 += take;
        let s = '';
        data.data.forEach(function(item) {
          s += self.genAuthor(item);
        });
        $(self.ref.author.element).append(s);
        if(skip4 >= data.Size) {
          loadEnd4 = true;
          self.message4 = '已经到底了';
        }
        else {
          self.message4 = '';
        }
      }
      else {
        alert(res.message || util.ERROR_MESSAGE);
      }
      loading4 = false;
    }, function(res) {
      alert(res.message || util.ERROR_MESSAGE);
      loading4 = false;
    });
  }
  genItem(item) {
    return <li>
      <a href={ `/user/${item.UserID}` } class="pic">
        <img src={ util.autoSsl(util.img120_120_80(item.User_HeadUrl
          || '//zhuanquan.xin/img/head/8fd9055b7f033087e6337e37c8959d3e.png')) }/>
      </a>
      <a href={ `/user/${item.UserID}` } class="txt">
        <span class="name">{ item.UserNickName }</span>
      </a>
    </li>;
  }
  genAuthor(item) {
    return <li>
      <a href={ `/author/${item.AuthorID}` } class="pic">
        <img src={ util.autoSsl(util.img120_120_80(item.Head_url
          || '//zhuanquan.xin/img/head/8fd9055b7f033087e6337e37c8959d3e.png')) }/>
      </a>
      <a href={ `/author/${item.AuthorID}` } class="txt">
        <span class="name">{ item.AuthorName }</span>
      </a>
    </li>;
  }
  render() {
    return <div class={ 'relation ' + this.tag }>
      <ul class="type" onClick={ { a: this.clickType } }>
        <li><a class={ 'friend'
        + (this.tag !== 'follow' && this.tag !== 'follower' && this.tag !== 'author' ? ' cur' : '') }
               href="?tag=friend" rel="friends">圈友</a></li>
        <li><a class={ 'follow' + (this.tag === 'follow' ? ' cur' : '') }
               href="?tag=follow" rel="follow">我关注的</a></li>
        <li><a class={ 'follower' + (this.tag === 'follower' ? ' cur' : '') }
               href="?tag=follower" rel="follower">关注我的</a></li>
        <li><a class={ 'author' + (this.tag === 'author' ? ' cur' : '') }
               href="?tag=author" rel="author">关注作者</a></li>
      </ul>
      <div class="friend">
        {
          this.props.userFriends.Size
            ? <ul class="fn-clear" ref="userFriends">
              {
                this.props.userFriends.data.map(function(item) {
                  return this.genItem(item);
                }.bind(this))
              }
            </ul>
            : ''
        }
        <div class="cp-message">{ this.message }</div>
      </div>
      <div class="follow">
        {
          this.props.userFollows.Size
            ? <ul class="fn-clear" ref="userFollows">
              {
                this.props.userFollows.data.map(function(item) {
                  return this.genItem(item);
                }.bind(this))
              }
            </ul>
            : ''
        }
        <div class="cp-message">{ this.message2 }</div>
      </div>
      <div class="follower">
        {
          this.props.userFollowers.Size
            ? <ul class="fn-clear" ref="userFollowers">
              {
                this.props.userFollowers.data.map(function(item) {
                  return this.genItem(item);
                }.bind(this))
              }
            </ul>
            : ''
        }
        <div class="cp-message">{ this.message3 }</div>
      </div>
      <div class="author">
        {
          this.props.follows.Size
            ? <ul class="fn-clear" ref="author">
              {
                this.props.follows.data.map(function(item) {
                  return this.genAuthor(item);
                }.bind(this))
              }
            </ul>
            : ''
        }
        <div class="cp-message">{ this.message4 }</div>
      </div>
    </div>;
  }
}

export default Relation;
