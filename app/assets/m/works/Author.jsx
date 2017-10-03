/**
 * Created by army8735 on 2017/9/1.
 */

import authorTemplate from '../component/author/authorTemplate';

class Author extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.setAuthor(self.props.authorList);
    self.on(migi.Event.DOM, function() {
      self.autoWidth();
    });
  }
  @bind list = []
  setAuthor(data) {
    let temp = [];
    data.forEach(function(item) {
      item.forEach(function(item2) {
        let type = authorTemplate.code2Data[item2.type];
        let label = item2.type === '141' ? item2.list[0].Tips : type.display;
        temp.push(<li class="label">{ label }</li>);
        item2.list.forEach(function(item3) {
          temp.push(<li class="item"><a href={ `/author/${item3.ID}` }>{ item3.AuthName }</a></li>);
        });
      });
    });
    this.list = temp;
  }
  autoWidth() {
    let $c = $(this.ref.c.element);
    $c.css('width', '9999rem');
    let $ul = $c.find('ul');
    $c.css('width', $ul.width() + 1);
  }
  clickAuthor(e, vd, tvd) {
    let id = tvd.props.id;
    util.goto(`/author/${id}`)
  }
  render() {
    return <div class="author">
      <div class="c" ref="c">
        <ul>
          {
            this.list
          }
        </ul>
      </div>
    </div>;
  }
}

export default Author;
