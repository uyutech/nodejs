/**
 * Created by army8735 on 2017/9/22.
 */

class Author extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  render() {
    return <div class="author">
      <div class="info fn-clear">
        <div class="bg" style={ `background-image:url('//zhuanquan.xin/img/8476e8a946918ca008f91704fe3049f5.png')` }/>
        <div class="pic">
          <img src={ '//zhuanquan.xin/img/8476e8a946918ca008f91704fe3049f5.png' }/>
        </div>
        <div class="txt">
          <h3>昵称</h3>
          <ul class="num fn-clear">
            <li>
              <strong>66666</strong>
              <span>粉丝</span>
            </li>
          </ul>
        </div>
        <div class="label">公众身份</div>
      </div>
    </div>;
  }
}

export default Author;
