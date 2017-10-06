/**
 * Created by army8735 on 2017/9/21.
 */

import authorTemplate from '../component/author/authorTemplate';

class Author extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.setAuthor(self.props.authorList);
  }
  @bind list = []
  setAuthor(data) {
    let list = [];
    data.forEach(function(item) {
      let temp = [];
      let last = -1;
      let lastTips = '';
      item.forEach(function(item) {
        if(item.WorksAuthorType !== last || item.Tips !== lastTips) {
          let type = authorTemplate.code2Data[item.WorksAuthorType];
          let label = item.Tips || type.display;
          temp.push(<li class="label">{ label }</li>);
        }
        last = item.WorksAuthorType;
        lastTips = item.Tips;
        temp.push(<li class="item" id={ item.ID }><a href={ `/author/${item.ID}` }>{ item.AuthName }</a></li>);
      });
      list.push(temp);
    });
    this.list = list;
  }
  clickPrev(e) {
    e.preventDefault();
  }
  clickNext(e) {
    e.preventDefault();
  }
  render() {
    return <div class="author">
      <div class="fn fn-clear fn-hide">
        <a class="prev" href="#" onClick={ this.clickPrev }>查看上页</a>
        <a class="next" href="#" onClick={ this.clickNext }>查看下页</a>
      </div>
      <div class="c" ref="c">
        {
          this.list.map(function(item) {
            return <ul>{ item }</ul>;
          })
        }
      </div>
    </div>;
  }
}

export default Author;
