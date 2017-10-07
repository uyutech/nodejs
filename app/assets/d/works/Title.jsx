/**
 * Created by army8735 on 2017/9/21.
 */

class Title extends migi.Component {
  constructor(...data) {
    super(...data);
    this.title = this.props.worksDetail.Title;
    this.subTitle = this.props.worksDetail.sub_Title;
  }
  @bind title
  @bind subTitle
  render() {
    return <div class="title">
      <div class="t">
        <span>类型</span>
        <h1>{ this.title }</h1>
        <h2 class={ this.subTitle ? '' : 'fn-hide' }>{ this.subTitle }</h2>
      </div>
      <div class="c">
        <ul class="tags fn-clear">
          <li>标签</li>
        </ul>
        <ul class="authors fn-clear">
          <li>标签</li>
        </ul>
      </div>
    </div>;
  }
}

export default Title;
