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
      <h4>我的收藏</h4>
      <ul class="list fn-clear">
        {
          (this.list || []).map(function(item) {
            return <li>
              <a href={ '/works/' + item.WorksID } class="pic">
                <img src={ item.cover_Pic || '//zhuanquan.xin/img/blank.png' }/>
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
