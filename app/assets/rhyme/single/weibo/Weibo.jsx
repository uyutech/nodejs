/**
 * Created by army8735 on 2017/8/27.
 */

class Weibo extends migi.Component {
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
    return <div class="main weibo">
      <p>异世的大门已经开启！</p>
      <p>门的另一侧，是为大家准备已久的惊喜~</p>
      <p>请点击下面的微博认证按钮，之前已进行过微博预约的大家可以查看自己的预约序号。</p>
      <p>序号为66、100、1000、2000、3000、4000的用户将会获得随机一位大神（慕寒、河图、Midaho、司夏）签名手帐一份。</p>
      <p>预约序号为666的用户，将会获得四位大神联合签名手帐一份。</p>
      <p>赶紧点击认证按钮，看看自己是不是那个幸运儿吧！</p>
      <a href={ window.LOGIN_URL || '#' } class="wb"/>
    </div>;
  }
}

export default Weibo;
