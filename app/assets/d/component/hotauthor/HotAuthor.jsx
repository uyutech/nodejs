/**
 * Created by army8735 on 2017/8/9.
 */

import util from '../../common/util';

class HotAuthor extends migi.Component {
  constructor(...data) {
    super(...data);
    this.dataList = this.props.dataList;
  }
  @bind dataList
  clickPrev(e) {
    e.preventDefault();
  }
  clickNext(e) {
    e.preventDefault();
  }
  render() {
    return <div class="cp-hotauthor">
      <h4>{ this.props.title }<small>{ '我们会邀请更多作者入驻！也诚邀你在转圈发布作品、交流创作>3<' }</small></h4>
      {
        this.dataList && this.dataList.length
          ? <ul class="list fn-clear">
              {
                this.dataList.map(function(item) {
                  let types = item.WorksType || [];
                  return <li authorID={ item.AuthorID }>
                    <a href={ `/author/${item.AuthorID}` } class="pic">
                      <img src={ util.autoSsl(util.img144_144_80(item.Head_url || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png')) }/>
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
