/**
 * Created by army8735 on 2017/9/21.
 */

class Title extends migi.Component {
  constructor(...data) {
    super(...data);
    this.title = this.props.worksDetail.Title;
    this.subTitle = this.props.worksDetail.sub_Title;
    this.popular = this.props.worksDetail.Popular;
    this.tags = this.props.worksDetail.ReturnTagData;
  }
  @bind title
  @bind subTitle
  @bind tags
  @bind popular
  render() {
    return <div class="title">
      <div class="t">
        <span>原创音乐</span>
        <h1>{ this.title }</h1>
        <h2 class={ this.subTitle ? '' : 'fn-hide' }>{ this.subTitle }</h2>
        <small class="pop">{ this.popular }</small>
      </div>
      <div class="c">
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
