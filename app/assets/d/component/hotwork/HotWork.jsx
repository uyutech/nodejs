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
    let authorId = this.props.authorId;
    return <div class="cp-hotwork">
      <h3>{ this.props.title }<small>未来会根据你的口味进行精准智能的推送！>3&lt;</small></h3>
      <b class="line"/>
      <div class="fn fn-clear">
        <a href="#" class="change" onClick={ this.clickChange }>换一批</a>
      </div>
      {
        this.dataList && this.dataList.length
          ? <ul class="list fn-clear">
              {
                this.dataList.map(function(item) {
                  return <li worksID={ item.WorksID }>
                    <a href={ `/works/${item.WorksID}` } class="pic">
                      <img src={ util.autoSsl(util.img144_144(item.cover_Pic)) || '//zhuanquan.xin/img/blank.png' }/>
                      <div class="ath">{ '' }</div>
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

export default HotWork;
