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
  setData(data) {
    this.dataList = data;
  }
  render() {
    return <div class="cp-hotwork">
      {
        this.dataList && this.dataList.length
          ? <ul class="list fn-clear">
              {
                this.dataList.map(function(item) {
                  return <li>
                    <a href={ `/works/${item.WorksID}` } class="pic">
                      <img src={ util.autoSsl(util.img288_288_80(item.cover_Pic)) || '//zhuanquan.xin/img/blank.png' }/>
                      <span class="num">{ item.Popular }</span>
                      {
                        item.WorkState === 2 || item.WorkState === 3
                          ? <span class="state">填坑中</span>
                          : ''
                      }
                    </a>
                    <a href={ `/works/${item.WorksID}` } class="txt">
                      <span>{ item.Title }</span>
                      <span class="author">{ (item.SingerName || []).join(' ') }</span>
                    </a>
                  </li>;
                })
              }
            </ul>
          : <div class="empty">暂无数据</div>
      }
    </div>;
  }
}

export default HotWork;
