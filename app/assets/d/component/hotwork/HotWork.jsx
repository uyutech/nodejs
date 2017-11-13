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
      <h4>{ this.props.title }<small>{ '未来会根据你的口味进行精准智能的推送！>3<' }</small></h4>
      {
        this.dataList && this.dataList.length
          ? <ul class="list fn-clear">
              {
                this.dataList.map(function(item) {
                  return <li>
                    <a href={ `/works/${item.WorksID}` } class="pic">
                      <img src={ util.autoSsl(util.img288_288_80(item.cover_Pic)) || '//zhuanquan.xin/img/blank.png' }/>
                      <span class="type">音乐</span>
                      <span class="num">{ item.Popular }</span>
                    </a>
                    <a href={ `/works/${item.WorksID}` } class="txt">
                      <span>{ item.Title }</span>
                      <span class="author">{ (item.SingerName || []).join(' ') }</span>
                    </a>
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
