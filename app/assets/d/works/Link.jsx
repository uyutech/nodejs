/**
 * Created by army8735 on 2017/10/17.
 */

'use strict';

class Link extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  show() {
    $(this.element).removeClass('fn-hide');
  }
  hide() {
    $(this.element).addClass('fn-hide');
  }
  render() {
    return <div class="link fn-hide1">
      <ul class="list fn-clear">
        <li class="sing5">
          <h6>5sing</h6>
          <a href={'#'}>链接</a>
        </li>
        <li class="bilibili">
          <h6>bilibili</h6>
          <a href={'#'}>链接</a>
        </li>
        <li class="wangyi">
          <h6>网易云音乐</h6>
          <a href={'#'}>链接</a>
        </li>
        <li class="baidu">
          <h6>百度音乐人</h6>
          <a href={'#'}>链接</a>
        </li>
      </ul>
    </div>;
  }
}

export default Link;
