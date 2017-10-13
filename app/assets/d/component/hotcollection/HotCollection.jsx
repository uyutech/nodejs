/**
 * Created by army8735 on 2017/9/18.
 */

class HotCollection extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  @bind dataList = []
  clickPrev(e) {
    e.preventDefault();
  }
  clickNext(e) {
    e.preventDefault();
  }
  render() {
    return <div class="cp-hotcollection">
      <h4>{ this.props.title }</h4>
      <div class="empty"/>
    </div>;
  }
}

export default HotCollection;
