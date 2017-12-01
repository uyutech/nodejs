/**
 * Created by army8735 on 2017/8/8.
 */

import util from '../../../d/common/util';
import AuthorType from '../../../d/component/author/AuthorType.jsx';

class HotWork extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    if(self.props.dataList) {
      self.dataList = self.props.dataList;
    }
  }
  @bind dataList = []
  setData(data) {
    this.dataList = data;
  }
  render() {
    return <div class="cp-hotwork">
      {
        this.dataList && this.dataList.length
          ? <ul>
            {
              this.dataList.map(function(item) {
                return <li>
                  <a href={ `/works/${item.WorksID}` } class="pic">
                    <img src={ util.autoSsl(util.img200_200_80(item.cover_Pic)) || '//zhuanquan.xin/img/blank.png' }/>
                    <span class="type">原创音乐</span>
                    <span class="num">{ util.abbrNum(item.Popular) }</span>
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
