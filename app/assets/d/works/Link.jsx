/**
 * Created by army8735 on 2017/10/17.
 */

'use strict';

import net from '../common/net';
import util from '../common/util';

class Link extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  @bind hasContent
  @bind loading
  @bind url
  show() {
    $(this.element).removeClass('fn-hide');
  }
  hide() {
    $(this.element).addClass('fn-hide');
  }
  submit(e) {
    e.preventDefault();
    let self = this;
    if(self.hasContent && !self.loading) {
      let workID = self.ref.select.element.value;
      let url = self.url.trim();
      if(!/^https?:\/\/\w+\.\w+/.test(url)) {
        alert('请输入合法的地址！');
        return;
      }
      self.loading = true;
      net.postJSON('/api/works/addTempLink', {
        worksID: self.props.worksID,
        workID,
        url,
        name: $(self.ref.list.element).find('.cur').attr('rel'),
      }, function(res) {
        if(res.success) {
          alert('提交成功，感谢您的参与。');
          self.url = '';
        }
        else {
          alert(res.message || util.ERROR_MESSAGE);
        }
        self.loading = false;
      }, function(res) {
        alert(res.message || util.ERROR_MESSAGE);
      });
    }
  }
  input(e, vd) {
    let v = vd.element.value.trim();
    this.hasContent = !!v.length;
  }
  click(e, vd, tvd) {
    let $li = $(tvd.element);
    if(!$li.hasClass('cur')) {
      $(vd.element).find('.cur').removeClass('cur');
      $li.addClass('cur');
    }
  }
  render() {
    let audioData = this.props.audioData;
    let videoData = this.props.videoData;
    let workList = [];
    (audioData || []).concat(videoData || []).forEach(function(item) {
      workList.push({
        id: item.ItemID,
        name: item.ItemName + (item.Tips || ''),
      });
    });
    return <div class="link fn-hide">
      <ul ref="list" class="list fn-clear" onClick={ { li: this.click } }>
        <li class="sing5 cur" rel="5sing">
          <h6>5sing</h6>
        </li>
        <li class="bilibili" rel="bili">
          <h6>bilibili</h6>
        </li>
        <li class="wangyi" rel="163">
          <h6>网易云音乐</h6>
        </li>
        <li class="baidu" rel="baidu">
          <h6>百度音乐人</h6>
        </li>
      </ul>
      <form onSubmit={ this.submit }>
        <p>添加站外链接</p>
        <select ref="select">
          {
            workList.map(function(item) {
              return <option value={ item.id }>{ item.name }</option>;
            })
          }
        </select>
        <input type="text" ref="txt" class="txt" placeholder="请输入站外链接" onInput={ this.input } value={ this.url }/>
        <input type="submit" class={ 'sub' + (this.hasContent && !this.loading ? '' : ' dis') } value="确定"/>
      </form>
    </div>;
  }
}

export default Link;
