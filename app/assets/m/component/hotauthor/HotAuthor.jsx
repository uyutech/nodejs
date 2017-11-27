/**
 * Created by army8735 on 2017/8/9.
 */

import util from '../../../d/common/util';

class HotAuthor extends migi.Component {
  constructor(...data) {
    super(...data);
    this.dataList = this.props.dataList;
    this.on(migi.Event.DOM, function() {
      this.autoWidth();
    });
  }
  @bind dataList
  autoWidth() {
    let $list = $(this.ref.list.element);
    let $c = $list.find('.c');
    $c.css('width', '9999rem');
    let $ul = $c.find('ul');
    $c.css('width', $ul.width() + 1);
  }
  render() {
    return <div class="cp-hotauthor">
      <h4>{ this.props.title }</h4>
      <div class="list" ref="list">
        <div class="c">
          {
            this.dataList && this.dataList.length
              ? <ul>
                {
                  this.dataList.map(function(item) {
                    let types = item.WorksType || [];
                    return <li>
                      <a href={ `/author/${item.AuthorID}` } class="pic">
                        <img src={ util.autoSsl(util.img120_120_80(item.Head_url || '//zhuanquan.xin/img/head/8fd9055b7f033087e6337e37c8959d3e.png')) }/>
                      </a>
                      <a href={ `/author/${item.AuthorID}` } class="txt">
                        <span class="name">{ item.AuthorName }</span>
                        <span class="fans">{ item.FansNumber || 0 }</span>
                        <span class="comment">{ item.Popular || 0 }</span>
                      </a>
                      <div class="info">合作{ item.CooperationTimes }次</div>
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

export default HotAuthor;
