/**
 * Created by army8735 on 2017/9/21.
 */

import util from '../common/util';
import WorksTypeEnum from './WorksTypeEnum';
import worksState from './worksState';

class Title extends migi.Component {
  constructor(...data) {
    super(...data);
    this.title = this.props.detail.Title;
    this.subTitle = this.props.detail.sub_Title;
    this.type = this.props.detail.WorkType;
    this.popular = this.props.detail.Popular;
    this.tags = this.props.detail.ReturnTagData;
  }
  @bind title
  @bind subTitle
  @bind type
  @bind tags
  @bind popular
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
    let hasCover = this.props.detail.cover_Pic;
    return <div class={ 'mod mod-title' + (hasCover ? '' : ' no-cover') }>
      {
        hasCover
          ? <div class="pic">
              <img src={ util.autoSsl(util.img200_200_80((this.props.detail.cover_Pic))) }/>
            </div>
          : ''
      }
      <div class="txt">
        <h3>{ WorksTypeEnum.NAME[this.type] }</h3>
        <h1 class={ this.title ? '' : 'empty' }>{ this.title || '待揭秘' }</h1>
        <h2 class={ this.subTitle ? '' : 'fn-hide' }>{ this.subTitle }</h2>
        <ul class={ 'tags fn-clear' }>
          {
            (this.tags || []).map(function(item) {
              return <li rel={ item.ID }>{ item.Tag_Name }</li>;
            })
          }
        </ul>
      </div>
      <div class="plus">
        <span class="state">{ worksState.getStateStr(this.props.worksType, this.props.detail.WorkState) }</span>
      </div>
    </div>;
  }
}

export default Title;
