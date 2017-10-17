/**
 * Created by army8735 on 2017/9/21.
 */

import util from '../common/util';

const TYPE_NAME = {
  1: '原创音乐',
  5: '音乐专辑',
  11: '相册',
};

class Title extends migi.Component {
  constructor(...data) {
    super(...data);
    this.title = this.props.worksDetail.Title;
    this.subTitle = this.props.worksDetail.sub_Title;
    this.type = this.props.worksDetail.WorkType;
    this.popular = this.props.worksDetail.Popular;
    this.tags = this.props.worksDetail.ReturnTagData;
  }
  @bind title
  @bind subTitle
  @bind type
  @bind tags
  @bind popular
  render() {
    let hasCover = this.props.worksDetail.cover_Pic;
    return <div class={ 'title' + (hasCover ? '' : ' no-cover') }>
      {
        hasCover
          ? <div class="pic">
              <img src={ util.autoSsl(util.img100_100(this.props.worksDetail.cover_Pic)) }/>
            </div>
          : ''
      }
      <div class="txt">
        <h3>{ TYPE_NAME[this.type] }</h3>
        <h1>{ this.title }</h1>
        <h2 class={ this.subTitle ? '' : 'fn-hide' }>{ this.subTitle }</h2>
        <small class="pop">{ this.popular }</small>
        <ul class={ 'tags fn-clear' + (this.tags && this.tags.length ? '' : ' fn-hide') }>
          {
            (this.tags || []).map(function(item) {
              return <li rel={ item.ID }>{ item.Tag_Name }</li>;
            })
          }
        </ul>
      </div>
    </div>;
  }
}

export default Title;
