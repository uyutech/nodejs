/**
 * Created by army8735 on 2017/8/8.
 */

import util from '../../common/util';
import AuthorType from '../author/AuthorType.jsx';

class HotWork extends migi.Component {
  constructor(...data) {
    super(...data);
    this.dataList = this.props.dataList || [];
  }
  @bind dataList = []
  clickPrev(e) {
    e.preventDefault();
  }
  clickNext(e) {
    e.preventDefault();
  }
  clickChange(e) {
    e.preventDefault();
    this.emit('change');
  }
  render() {
    return <div class="cp-hotwork">
      <h4>{ this.props.title }<small>未来会根据你的口味进行精准智能的推送！>3&lt;</small></h4>
      {
        this.dataList && this.dataList.length
          ? <ul class="list fn-clear">
              {
                this.dataList.map(function(item) {
                  let url = item.WorkType === 5 ? `/musicalbum/${item.WorksID}` : `/works/${item.WorksID}`;
                  return <li>
                    <a href={ url } class="pic">
                      <img src={ util.autoSsl(util.img144_144(item.cover_Pic)) || '//zhuanquan.xin/img/blank.png' }/>
                    </a>
                    <a href={ url } class="txt">{ item.Title }</a>
                  </li>;
                })
              }
            </ul>
          : <div class="empty"/>
      }
    </div>;
  }
}

export default HotWork;
