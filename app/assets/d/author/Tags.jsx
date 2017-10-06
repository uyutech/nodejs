/**
 * Created by army8735 on 2017/9/22.
 */

class Tags extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  click(e, vd, tvd) {
    let $ul = $(this.element);
    let $li = $(tvd.element);
    if($li.hasClass('cur')) {
      return;
    }
    $ul.find('.cur').removeClass('cur');
    $li.addClass('cur');
    this.emit('change', $li.attr('rel'));
  }
  render() {
    return <ul class="tags" onClick={ { li: this.click } }>
        <li class="item home cur" rel="0"><span>主页</span></li>
        <li class="item works" rel="1"><span>作品</span></li>
        <li class="item comment" rel="2"><span>留言</span></li>
      </ul>;
  }
}

export default Tags;
