/**
 * Created by army8735 on 2017/9/22.
 */

class Follow extends migi.Component {
  constructor(...data) {
    super(...data);
    this.list = this.props.list;
  }
  @bind list
  render() {
    return <div class="follow">
      <h4>我的关注</h4>
      <ul class="list fn-clear">
        {
          (this.list || []).map(function(item) {
            return <li>
              <a href={ '/author/' + item.AuthorID } class="pic">
                <img src={ item.Head_url }/>
              </a>
              <a href="#" class="txt">{ item.AuthorName }</a>
              <div class="info">{ item.FansNumber }粉丝</div>
            </li>;
          })
        }
      </ul>
    </div>;
  }
}

export default Follow;
