/**
 * Created by army on 2017/6/18.
 */
 
class Link extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self._5SingUrl = self.props.authorDetail._5SingUrl;
    self._BilibiliUrl = self.props.authorDetail._BilibiliUrl;
    self._BaiduUrl = self.props.authorDetail._BaiduUrl;
    self._WangyiUrl = self.props.authorDetail._WangyiUrl;
    self._WeiboUrl = self.props.authorDetail._WeiboUrl;
    self.on(migi.Event.DOM, function() {
      self.autoWidth();
    });
  }
  autoWidth() {
    let $root = $(this.element);
    let $c = $root.find('.c');
    $c.css('width', '9999rem');
    let $ul = $c.find('ul');
    $c.css('width', $ul.width() + 1);
  }
  @bind _5SingUrl
  @bind _BilibiliUrl
  @bind _BaiduUrl
  @bind _WangyiUrl
  @bind _WeiboUrl
  render() {
    return <div class="link">
      <div class="c">
        <ul>
          <li><a target="_blank" href={ this._5SingUrl } class={ this._5SingUrl ? '' : 'fn-hide' }><span>5sing</span></a></li>
          <li><a target="_blank" href={ this._BilibiliUrl } class={ this._BilibiliUrl ? 'bili' : 'fn-hide' }><span>b站</span></a></li>
          <li><a target="_blank" href={ this._BaiduUrl } class={ this._BaiduUrl ? 'baidu' : 'fn-hide' }><span>百度</span></a></li>
          <li><a target="_blank" href={ this._WangyiUrl } class={ this._WangyiUrl ? 'wangyi' : 'fn-hide' }><span>网易</span></a></li>
          <li><a target="_blank" href={ this._WeiboUrl } class={ this._WeiboUrl ? 'weibo' : 'fn-hide' }><span>微博</span></a></li>
        </ul>
      </div>
    </div>;
  }
}

export default Link;