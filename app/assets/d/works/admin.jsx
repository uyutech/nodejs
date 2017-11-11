/**
 * Created by army8735 on 2017/11/6.
 */

'use strict';

class EditTitle extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  @bind title
  @bind subTitle
  show() {
    $(this.element).removeClass('fn-hide');
    parent.upZIndex && parent.upZIndex();
  }
  hide() {
    $(this.element).addClass('fn-hide');
  }
  clickSub() {
    this.hide();
  }
  render() {
    return <div class="cp-edit edit-title">
      <div class="c">
        <h3>编辑标题</h3>
        <label>主标题</label>
        <input class="text" type="text" value={ this.title }/>
        <label>副标题</label>
        <input type="text" value={ this.subTitle }/>
        <button class="sub" onClick={ this.clickSub }>提交</button>
      </div>
    </div>;
  }
}

let editTitle;

migi.eventBus.on('edit', function(type) {
  switch(type) {
    case 'title':
      if(!editTitle) {
        editTitle = migi.render(
          <EditTitle/>,
          document.body
        );
      }
      editTitle.show();
      break;
  }
});
