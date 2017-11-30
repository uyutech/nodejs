/**
 * Created by army8735 on 2017/10/29.
 */

'use strict';

import util from '../../../d/common/util';

class HotMusicAlbum extends migi.Component {
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
    return <div class="cp-hotmusicalbum">
      <div class="list" ref="list">
        <div class="c">
          {
            this.dataList && this.dataList.length
              ? <ul>
                {
                  this.dataList.map(function(item) {
                    let url = `/works/${item.WorksID}`;
                    return <li>
                      <b class="bg"/>
                      <a href={ url } class="pic">
                        <img src={ util.autoSsl(util.img200_200_80(item.cover_Pic)) || '//zhuanquan.xin/img/blank.png' }/>
                        <span class="num">{ util.abbrNum(item.Popular) }</span>
                      </a>
                      <a href={ url } class="txt">
                        <span>{ item.Title }</span>
                        <span class="author">{ (item.SingerName || []).join(' ') }</span>
                      </a>
                    </li>;
                  })
                }
              </ul>
              : <div class="empty">暂无数据</div>
          }
        </div>
      </div>
    </div>;
  }
}

export default HotMusicAlbum;
