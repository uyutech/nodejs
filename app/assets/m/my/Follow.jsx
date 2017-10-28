/**
 * Created by army8735 on 2017/10/27.
 */

'use strict';

class Follow extends migi.Component {
  constructor(...data) {
    super(...data);
    this.list = this.props.list;
    this.on(migi.Event.DOM, function() {
      this.autoWidth();
    });
  }
  @bind list
  autoWidth() {
    let $list = $(this.ref.list.element);
    let $c = $list.find('.c');
    $c.css('width', '9999rem');
    let $ul = $c.find('ul');
    $c.css('width', $ul.width() + 1);
  }
  render() {
    return <div class="cp-hotauthor follow">
      <h4>我的关注</h4>
      <div class="list" ref="list">
        <div class="c">
          <ul>
            {
              (this.list || []).map(function(item) {
                return <li>
                  <a href={ '/author/' + item.AuthorID } class="pic">
                    <img src={ item.Head_url || '//zhuanquan.xin/head/0d90e4f2e6f7ef48992df6b49f54cf40.png' }/>
                  </a>
                  <a href="#" class="txt">{ item.AuthorName }</a>
                  <div class="info">{ item.FansNumber }粉丝</div>
                </li>;
              })
            }
          </ul>
        </div>
      </div>
    </div>;
  }
}

export default Follow;
