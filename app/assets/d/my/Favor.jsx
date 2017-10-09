/**
 * Created by army8735 on 2017/9/22.
 */

class Favor extends migi.Component {
  constructor(...data) {
    super(...data);
    this.list = this.props.list;
  }
  @bind list
  render() {
    return <div class="favor">
      <h3>我的收藏</h3>
      <b class="line"/>
      <div class="fn fn-clear fn-hide">
        <a href="#" class="prev">查看上页</a>
        <a href="#" class="next">查看下页</a>
      </div>
      <ul class="list fn-clear">
        {
          (this.list || []).map(function(item) {
            return <li>
              <a href={ '/works/' + item.WorksID } class="pic">
                <img src={ item.cover_Pic }/>
                <div class="ath">{ item.SingerName }</div>
              </a>
              <a href="#" class="txt">{ item.Title }</a>
            </li>;
          })
        }
      </ul>
    </div>;
  }
}

export default Favor;
