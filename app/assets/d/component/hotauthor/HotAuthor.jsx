/**
 * Created by army8735 on 2017/8/9.
 */

import util from '../../common/util';

class HotAuthor extends migi.Component {
  constructor(...data) {
    super(...data);
    this.dataList = this.props.dataList;
  }
  @bind dataList = []
  clickPrev(e) {
    e.preventDefault();
  }
  clickNext(e) {
    e.preventDefault();
  }
  render() {
    return <div class="cp-hotauthor">
      <h3>{ this.props.title }<small>我们会邀请更多作者入驻！也诚邀你在转圈发布作品、交流创作>3&lt;</small></h3>
      <b class="line"/>
      <div class="fn fn-clear fn-hide">
        <a href="#" class="prev" onClick={ this.clickPrev }>上一页</a>
        <a href="#" class="next" onClick={ this.clickNext }>下一页</a>
      </div>
      {
        this.dataList && this.dataList.length
          ? <ul class="list fn-clear">
              {
                this.dataList.map(function(item) {
                  let types = item.WorksType || [];
                  return <li authorID={ item.AuthorID }>
                    <a href={ `/author/${item.AuthorID}` } class="pic">
                      <img src={ util.autoSsl(util.img144_144(item.Head_url)) || '//zhuanquan.xin/img/f59284bd66f39bcfc70ef62eee10e186.png' }/>
                      {
                        types.slice(0, 2).map(function(item) {
                          return <b class={ `cp-author_type${item}` }/>;
                        })
                      }
                    </a>
                    <a href={ `/author/${item.AuthorID}` } class="txt">{ item.AuthorName }</a>
                    <div class="info">合作{ item.CooperationTimes }次</div>
                  </li>;
                })
              }
            </ul>
          : <div class="empty"/>
      }
    </div>;
  }
}

export default HotAuthor;
