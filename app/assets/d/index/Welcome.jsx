/**
 * Created by army8735 on 2017/10/26.
 */

'use strict';

import net from '../common/net';
import util from '../common/util';

class Welcome extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.step = self.props.userInfo.User_Reg_Stat;
    self.authorID = self.props.userInfo.AuthorID;
    self.on(migi.Event.DOM, function() {
      if(self.step === 10) {
        self.load();
      }
      let $tags = $(self.ref.tags.element);
      $tags.on('click', 'li', function(e) {
        let $li = $(this);
        $li.toggleClass('cur');
      });
      let $authors = $(self.ref.authors.element);
      $authors.on('click', 'li', function(e) {
        let $li = $(this);
        $li.toggleClass('cur');
      });
    });
  }
  @bind step
  @bind tags
  @bind authors
  @bind dis
  clickEnterPublic(e) {
    let self = this;
    net.postJSON('/api/user/settle', { settle: true, public: true, authorID: this.authorID }, function(res) {
      if(res.success) {
        self.step = $CONFIG.userInfo.User_Reg_Stat = 10;
        self.load();
      }
      else {
        alert(res.message || util.ERROR_MESSAGE);
      }
    }, function(res) {
      alert(res.message || util.ERROR_MESSAGE);
    });
  }
  clickEnterShadow(e) {
    let self = this;
    net.postJSON('/api/user/settle', { settle: true, public: false, authorID: this.authorID }, function(res) {
      if(res.success) {
        self.step = $CONFIG.userInfo.User_Reg_Stat = 1;
      }
      else {
        alert(res.message || util.ERROR_MESSAGE);
      }
    }, function(res) {
      alert(res.message || util.ERROR_MESSAGE);
    });
  }
  clickNotEnter(e) {
    let self = this;
    net.postJSON('/api/user/settle', { settle: false }, function(res) {
      if(res.success) {
        self.step = $CONFIG.userInfo.User_Reg_Stat = 10;
        self.load();
      }
      else {
        alert(res.message || util.ERROR_MESSAGE);
      }
    }, function(res) {
      alert(res.message || util.ERROR_MESSAGE);
    });
  }
  clickNickName(e) {
    let self = this;
    let nickName = $(self.ref.name.element).val().trim();
    let length = nickName.length;
    if(length < 4 || length > 8) {
      alert('昵称长度需要在4~8个字之间哦！');
      return;
    }
    net.postJSON('/api/user/settleShadowName', { nickName }, function(res) {
      if(res.success) {
        self.step = $CONFIG.userInfo.User_Reg_Stat = 10;
        $CONFIG.userInfo.userName = nickName;
        self.load();
      }
      else {
        alert(res.message || util.ERROR_MESSAGE);
      }
    }, function(res) {
      alert(res.message || util.ERROR_MESSAGE);
    });
  }
  load() {
    let self = this;
    net.postJSON('/api/user/guideSuggest', function(res) {
      if(res.success) {
        let data = res.data;
        self.tags = data.tags.data;
        self.authors = data.authors.data;
      }
      else {
        alert(res.message || util.ERROR_MESSAGE);
      }
    }, function(res) {
      alert(res.message || util.ERROR_MESSAGE);
    });
  }
  change(e) {
    this.dis = !e.target.checked;
  }
  clickOK(e, vd) {
    let self = this;
    if(!self.dis) {
      let $tags = $(self.ref.tags.element);
      let $authors = $(self.ref.authors.element);
      let tags = [];
      let authors = [];
      $tags.find('li.cur').each(function(i, o) {
        tags.push($(o).attr('rel'));
      });
      $authors.find('li.cur').each(function(i, o) {
        authors.push($(o).attr('rel'));
      });
      net.postJSON('/api/user/guideSave', { tags, authors }, function(res) {
        if(res.success) {
          self.step = $CONFIG.userInfo.User_Reg_Stat = 99;
          self.hide();
        }
        else {
          alert(res.message || util.ERROR_MESSAGE);
        }
      }, function(res) {
        alert(res.message || util.ERROR_MESSAGE);
      });
    }
  }
  hide() {
    $(this.element).addClass('fn-hide');
  }
  render() {
    let userInfo = this.props.userInfo;
    let authorInfo = this.props.authorInfo;
    if($CONFIG.isAuthor) {
      let authorTip = `啊……圈儿眼拙，才发现您就是传说中的<strong>${ userInfo.AuthorName }</strong>!<br/>`;
      if(authorInfo.Hot_Works_Items && authorInfo.Hot_Works_Items.length) {
        authorTip += `作为一只立志成为创作圈百科全书的兔，圈儿欣赏过您参与创作的`;
        authorTip += authorInfo.Hot_Works_Items.map(function(item) {
          return <strong>{ item.Title }</strong>;
        });
        authorTip += '！<br/>';
      }
      if(authorInfo.AuthorToAuthor && authorInfo.AuthorToAuthor.length) {
        authorTip += `您合作过的`;
        authorTip += authorInfo.AuthorToAuthor.map(function(item) {
          return <strong>{ item.AuthorName }</strong>;
        });
        authorTip += '等作者也入驻了转圈哦。<br/>';
      }
      authorTip += `不知您是否愿意在转圈入驻？<br/>
入驻之后将开启您的个人作者页面，之后您将可以上传、编辑、您的作品，未来还会有一系列粉丝互动及约稿接稿功能！`;
      return <div class="welcome">
        <div class={ 'c step' + this.step }>
          <h3><img src="//zhuanquan.xin/img/f59284bd66f39bcfc70ef62eee10e186.png"/>圈儿</h3>
          <div class="step step0">
            <div class="con">
              <p dangerouslySetInnerHTML={ authorTip }/>
              <b class="arrow"/>
            </div>
            <button onClick={ this.clickEnterPublic }>我要公开入驻</button>
            <br/>
            <button onClick={ this.clickEnterShadow }>我要入驻，但是我想披个马甲</button>
            <br/>
            <small>（您依然可以进行作者相关的操作，但将以普通用户的身份进行评论等互动，别人不会知道你就是{ userInfo.AuthorName }）</small>
            <br/>
            <button onClick={ this.clickNotEnter }>我放弃入驻</button>
          </div>
          <div class="step step1">
            <div class="con">
              <p>给马甲想个名字吧！</p>
              <b class="arrow"/>
            </div>
            <input ref="name" class="name" type="text" placeholder="请输入昵称" maxLength="8"/>
            <button onClick={ this.clickNickName }>就这个啦！</button>
          </div>
          <div class="step step10">
            <div class="con">
              <pre>欢迎从异世来到转圈！我是圈娘~
“转圈”是一款仍在开发中的平台，感谢您参与我们的内测活动，我们联合各位大大为您准备了各种福利，活动详情在活动详情页中查看哦！也欢迎随时在转圈右下角和圈儿互动！

此外我们特别为从异世而来的你准备了一份超大惊喜！
请点击右侧的播放按钮收听哦~
异世谣相关的福利活动可以点击右侧活动页面查看~
福利多多，大家加油哦！

下面的内容中不知可有您喜欢的呢？
勾选喜欢的标签和作者可以帮助圈儿更好的了解你哦~</pre>
              <b class="arrow"/>
            </div>
            <h4>风格</h4>
            <ul class="tags fn-clear" ref="tags">
              {
                (this.tags || []).map(function(item) {
                  return <li rel={ item.ID }>{ item.Tag_Name }</li>;
                })
              }
            </ul>
            <h4>作者</h4>
            <ul class="tags fn-clear" ref="authors">
              {
                (this.authors || []).map(function(item) {
                  return <li rel={ item.AuthorID }>{ item.AuthorName }</li>;
                })
              }
            </ul>
            <label><input type="checkbox" checked="checked" onChange={ this.change }/>我已阅读并同意转圈用户规约</label>
            <button class={ 'center' + (this.dis ? ' dis' : '') } onClick={ this.clickOK }>好的~我要开始转圈啦！</button>
          </div>
        </div>
      </div>;
    }

    // 非作者初始情况转换为10，0为初始值，1为作者改昵称，有可能在1的时候变为非作者
    if(this.step === 0 || this.step === 1) {
      this.step = 10;
    }
    return <div class="welcome">
      <div class={ 'c step' + this.step }>
        <h3><img src="//zhuanquan.xin/img/f59284bd66f39bcfc70ef62eee10e186.png"/>圈儿</h3>
        <div class="step step10">
          <div class="con">
              <pre>欢迎从异世来到转圈！我是圈娘~
“转圈”是一款仍在开发中的平台，感谢您参与我们的内测活动，我们联合各位大大为您准备了各种福利，活动详情在活动详情页中查看哦！也欢迎随时在转圈右下角和圈儿互动！

此外我们特别为从异世而来的你准备了一份超大惊喜！
请点击右侧的播放按钮收听哦~
异世谣相关的福利活动可以点击右侧活动页面查看~
福利多多，大家加油哦！

下面的内容中不知可有您喜欢的呢？
勾选喜欢的标签和作者可以帮助圈儿更好的了解你哦~</pre>
            <b class="arrow"/>
          </div>
          <h4>风格</h4>
          <ul class="tags fn-clear" ref="tags">
            {
              (this.tags || []).map(function(item) {
                return <li rel={ item.ID }>{ item.Tag_Name }</li>;
              })
            }
          </ul>
          <h4>作者</h4>
          <ul class="tags fn-clear" ref="authors">
            {
              (this.authors || []).map(function(item) {
                return <li rel={ item.AuthorID }>{ item.AuthorName }</li>;
              })
            }
          </ul>
          <label><input type="checkbox" checked="checked" onChange={ this.change }/>我已阅读并同意转圈用户规约</label>
          <button class={ 'center' + (this.dis ? ' dis' : '') } onClick={ this.clickOK }>好的~我要开始转圈啦！</button>
        </div>
      </div>
    </div>;
  }
}

export default Welcome;
