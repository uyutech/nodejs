/**
 * Created by army8735 on 2017/9/22.
 */

class User extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  render() {
    return <div class="user">
      <div class="info fn-clear">
        <div class="bg" style={ `background-image:url(${window.$CONFIG.userPic || '//zhuanquan.xin/img/blank.png'})` }/>
        <div class="pic">
          <img src={ window.$CONFIG.userPic || '//zhuanquan.xin/img/blank.png' }/>
        </div>
        <div class="txt">
          <h3>{ window.$CONFIG.userName }</h3>
          <p>签名</p>
          <ul class="num fn-clear">
            <li>
              <strong>66666</strong>
              <span>感兴趣</span>
            </li>
            <li>
              <strong>66666</strong>
              <span>喜欢</span>
            </li>
          </ul>
        </div>
        <div class="label">个人身份</div>
      </div>
      <ul class="type fn-clear">
        <li><a href="#" class="finance">我的财产</a></li>
        <li><a href="#" class="success">我的成就</a></li>
        <li><a href="#" class="follow">我的关注</a></li>
        <li><a href="#" class="favor">我的收藏</a></li>
      </ul>
    </div>;
  }
}

export default User;
