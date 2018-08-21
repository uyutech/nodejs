/**
 * Created by army8735 on 2017/9/21.
 */

import util from '../common/util';

class Title extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  clickAdd() {
    if(!$CONFIG.isLogin) {
      migi.eventBus.emit('NEED_LOGIN');
      return;
    }
    migi.eventBus.emit('add-label');
  }
  clickEdit() {
    migi.eventBus.emit('edit', 'title', this.title, this.subTitle);
  }
  render() {
    let self = this;
    let info = self.props.info;
    return <div class="mod mod-title">
      <img
        class="pic"
        src={ util.img(info.cover, 200, 200, 80) || '//zhuanquan.xin/img/blank.png' }/>
      <div class="txt">
        <h3>{ info.typeName }</h3>
        <h1 class={ info.title ? '' : 'empty' }>{ info.title || '待揭秘' }</h1>
        <h2 class={ info.subTitle ? '' : 'fn-hide' }>{ info.subTitle }</h2>
      </div>
      <div class="plus">
      {
        info.state === 1
          ? ''
          : <span class="state">{ info.stateName }</span>
      }
      </div>
    </div>;
  }
}

export default Title;
