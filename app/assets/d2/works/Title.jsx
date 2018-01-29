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
    let worksInfo = self.props.worksInfo;
    return <div class="mod mod-title">
      <img
        class="pic"
        src={ util.autoSsl(util.img200_200_80(worksInfo.worksCover || '//zhuanquan.xin/img/blank.png')) }/>
      <div class="txt">
        <h3>{ worksInfo.worksTypeName }</h3>
        <h1 class={ worksInfo.worksTitle ? '' : 'empty' }>{ worksInfo.worksTitle || '待揭秘' }</h1>
        <h2 class={ worksInfo.worksSubTitle ? '' : 'fn-hide' }>{ worksInfo.worksSubTitle }</h2>
      </div>
      <div class="plus">
        {
          worksInfo.worksState === 1
            ? ''
            : <span class="state">{ worksInfo.worksStateName }</span>
        }
      </div>
    </div>;
  }
}

export default Title;
