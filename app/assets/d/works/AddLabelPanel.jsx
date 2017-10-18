/**
 * Created by army8735 on 2017/10/18.
 */

'use strict';

class AddLabelPanel extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      let $list = $(self.ref.list.element);
      let $has = $(self.ref.has.element);
    });
  }
  show() {
    $(this.element).removeClass('fn-hide');
  }
  hide() {
    $(this.element).addClass('fn-hide');
  }
  clickOK(e) {
    this.hide();
  }
  render() {
    return <div class="add-label fn-hide">
      <div class="c">
        <label class="l1">添加标签</label>
        <p>风格</p>
        <ul class="list fn-clear" ref="list">
          <li>标签</li>
          <li>标签</li>
          <li>标签</li>
          <li>标签</li>
          <li>标签</li>
          <li>标签</li>
          <li>标签</li>
          <li>标签</li>
          <li>标签</li>
          <li>标签</li>
          <li>标签</li>
          <li>标签</li>
          <li>标签</li>
          <li>标签</li>
          <li>标签</li>
        </ul>
        <b class="line"/>
        <label class="l2">已选标签</label>
        <ul class="has fn-clear" ref="has">
          <li>标签</li>
          <li>标签</li>
          <li>标签</li>
          <li>标签</li>
          <li>标签</li>
        </ul>
        <button onClick={ this.clickOK }>选好啦！</button>
      </div>
    </div>;
  }
}

export default AddLabelPanel;
