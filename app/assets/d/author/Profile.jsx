/**
 * Created by army8735 on 2017/8/8.
 */

import net from '../common/net';
import util from '../common/util';
import authorTemplate from '../component/author/authorTemplate';

class Profile extends migi.Component {
  constructor(...data) {
    super(...data);
    this.authorID = this.props.authorID;
    this.authorName = this.props.authorDetail.AuthorName;
    this.sign = this.props.authorDetail.Sign;
    this.headUrl = this.props.authorDetail.Head_url;
    this.fansNumber = this.props.authorDetail.FansNumber;
    this.isLike = this.props.authorDetail.IsLike;
    this.type = this.props.authorDetail.Authortype;
  }
  @bind authorID
  @bind authorName
  @bind sign
  @bind authorType = []
  @bind headUrl
  @bind fansNumber
  @bind isLike
  @bind loading = false
  set type(v) {
    v = v || [];
    let hash = {};
    v.forEach(function(item) {
      let css = authorTemplate.code2Data[item.AuthorTypeID].css;
      hash[css] = true;
    });
    this.authorType = Object.keys(hash);
  }
  click(e) {
    e.preventDefault();
    let self = this;
    self.loading = true;
    if(self.isLike) {
      net.postJSON('/api/author/unFollow', { authorID: self.authorID }, function(res) {
        if(res.success) {
          self.isLike = false;
          self.fansNumber = res.data.followCount;
          alert('取关成功');
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
    else {
      net.postJSON('/api/author/follow', { authorID: self.authorID } , function(res) {
        if(res.success) {
          self.isLike = true;
          self.fansNumber = res.data.followCount;
          alert('关注成功');
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
  render() {
    return <div class="profile fn-clear">
      <div class="pic">
        <img src={ this.headUrl || '//zhuanquan.xin/img/c370ff3fa46f4273d0f73147459a43d8.png' }/>
        <b class="v"/>
      </div>
      <div class="txt">
        <div class="n">
          <h3>{ this.authorName || '&nbsp;' }</h3>
          {
            this.authorType.map(function(item) {
              return <span class={ `cp-author-type-${item}` }/>;
            })
          }
        </div>
        <div class="rel">
          <label>粉丝</label>
          <span>{ this.fansNumber || '0' }</span>
          <a href="#" class={ (this.isLike ? 'un-follow' : 'follow') + (this.loading ? ' loading' : '') } onClick={ this.click }>{ this.isLike ? '取关' : '关注' }</a>
        </div>
        <p class="intro">{ this.sign }</p>
      </div>
    </div>;
  }
}

export default Profile;
