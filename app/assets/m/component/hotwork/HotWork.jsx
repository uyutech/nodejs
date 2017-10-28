/**
 * Created by army8735 on 2017/8/8.
 */

import util from '../../../d/common/util';
import AuthorType from '../../../d/component/author/AuthorType.jsx';

class HotWork extends migi.Component {
  constructor(...data) {
    super(...data);
    this.dataList = this.props.dataList || [];
    this.on(migi.Event.DOM, function() {
      this.autoWidth();
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
    return <div class="cp-hotwork">
      <h4>{ this.props.title }</h4>
      <div class="list" ref="list">
        <div class="c">
          {
            this.dataList && this.dataList.length
              ? <ul>
                {
                  this.dataList.map(function(item) {
                    let url = item.WorkType === 5 ? `/musicalbum/${item.WorksID}` : `/works/${item.WorksID}`;
                    return <li>
                      <a href={ url } class="pic">
                        <img src={ util.autoSsl(util.img100_100(item.cover_Pic)) || '//zhuanquan.xin/img/blank.png' }/>
                      </a>
                      <a href={ url } class="txt">{ item.Title }</a>
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

export default HotWork;
