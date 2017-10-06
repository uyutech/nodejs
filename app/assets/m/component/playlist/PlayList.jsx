/**
 * Created by army on 2017/7/1.
 */

import util from '../../common/util';

class PlayList extends migi.Component {
  constructor(...data) {
    super(...data);
    this.dataList = this.props.dataList || [];
  }
  @bind dataList = [];
  render() {
    return <div class="cp-playlist">
      <ul class="list" ref="list">
        {
          this.dataList.map(function(item) {
            return <li>
              <a href={ `/works/${item.WorksID}` } class="pic">
                <img src={ util.img100_100(item.cover_Pic) || '//zhuanquan.xin/img/blank.png' }/>
              </a>
              <div class="txt" worksId={ item.WorksID || item.WorkID }>
                <a href={ `/works/${item.WorksID}` } class="name">{ item.Title }</a>
                <p class="intro">{ item.sub_Title }</p>
              </div>
            </li>;
          })
        }
      </ul>
    </div>;
  }
}

export default PlayList;
