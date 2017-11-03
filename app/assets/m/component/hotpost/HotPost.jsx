/**
 * Created by army8735 on 2017/10/30.
 */

'use strict';

import util from '../../../d/common/util';

class HotPost extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    if(self.props.dataList) {
      self.dataList = self.props.dataList;
    }
    self.on(migi.Event.DOM, function() {
      self.autoWidth();
    });
  }
  @bind dataList = []
  autoWidth() {
    let $list = $(this.ref.list.element);
    let $c = $list.find('.c');
    $c.css('width', '9999rem');
    let $ul = $c.find('ul');
    $c.css('width', $ul.width() + 1);
  }
  render() {
    return <div class="cp-hotpost">
      <h4>{ this.props.title }</h4>
      <div class="list" ref="list">
        <div class="c">
          {
            this.dataList && this.dataList.length
              ? <ul>
                {
                  this.dataList.map(function(item) {
                    return <li>
                      <a href={ `/post/${item.ID}` } class="pic">
                        <img src={ util.autoSsl(util.img200_200_80(item.Taglist[0].TagCover)) || '//zhuanquan.xin/img/blank.png' }/>
                      </a>
                      <a href={ `/post/${item.ID}` } class="txt">{ item.Taglist[0].TagName }</a>
                    </li>;
                  })
                }
              </ul>
              : <div class="empty"/>
          }
        </div>
      </div>
    </div>;
  }
}

export default HotPost;
