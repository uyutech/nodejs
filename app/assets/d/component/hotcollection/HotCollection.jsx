/**
 * Created by army8735 on 2017/9/18.
 */

import util from '../../common/util';

class HotCollection extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    if(self.props.dataList) {
      self.dataList = self.props.dataList;
    }
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
      {
        this.dataList && this.dataList.length
          ? <ul class="list fn-clear">
            {
              this.dataList.map(function(item) {
                return <li>
                  <b class="bg"/>
                  <a href={ `/works/${item.WorksID}` } class="pic">
                    <img src={ util.autoSsl(util.img144_144(item.cover_Pic)) || '//zhuanquan.xin/img/blank.png' }/>
                  </a>
                  <a href={ `/works/${item.WorksID}` } class="txt">{ item.Title }</a>
                </li>;
              })
            }
          </ul>
          : <div class="empty"/>
      }
    </div>;
  }
}

export default HotCollection;
