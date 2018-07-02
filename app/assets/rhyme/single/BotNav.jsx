/**
 * Created by army8735 on 2017/8/25.
 */

class BotNav extends migi.Component {
  constructor(...data) {
    super(...data);
    this.on(migi.Event.DOM, function() {
      let $cloud = $(this.ref.cloud.element);
      let $window = $(window);
      $window.on('mousemove', function(e) {
        let x = e.pageX;
        let y = e.pageY;
        $cloud.css('-webkit-transform', `translate3d(${x/50}px,${-y/50}px,0)`);
        $cloud.css('transform', `translate3d(${x/50}px,${-y/50}px,0)`);
      });
    });
  }
  show() {
    $(this.element).removeClass('fn-hide');
  }
  hide() {
    $(this.element).addClass('fn-hide');
  }
  click(e, vd, tvd) {
    // e.preventDefault();
    let li = tvd.parent;
    let $li = $(li.element);
    if(!$li.hasClass('cur')) {
      $(vd.element).find('.cur').removeClass('cur');
      $li.addClass('cur');
    }
  }
  clear() {
    $(this.element).find('.cur').removeClass('cur');
  }
  clickLogo() {
    $(this.ref.list.element).toggleClass('alt');
  }
  showMenu() {
    $(this.ref.list.element).removeClass('alt');
  }
  hideMenu() {
    $(this.ref.list.element).addClass('alt');
  }
  hl(cn) {
    $(this.ref.list.element).find('.cur').removeClass('cur');
    if(cn) {
      if(cn.charAt(0) === '#') {
        cn = cn.slice(1);
      }
      $(this.ref.list.element).find('.' + cn).addClass('cur');
    }
  }
  showBall() {
    $(this.ref.logo.element).removeClass('fn-hide');
  }
  hideBall() {
    $(this.ref.logo.element).addClass('fn-hide');
  }
  render() {
    return <div class="bot-nav fn-hide">
      <ul ref="list" class="fn-clear" onClick={ { a: this.click } }>
        <li class="geography"><a href="#geography" title="世界地理">世界地理</a></li>
        <li class="history"><a href="#history" title="历史故事">历史故事</a></li>
        <li class="logo">
          <a href="#" class="cloud" ref="cloud" title="首页">首页</a>
        </li>
        <li class="legend"><a href="#legend" title="异闻传记">异闻传记</a></li>
        <li class="rhyme"><a href="#rhyme" title="浮世歌谣">浮世歌谣</a></li>
        <li class="about"><a href="#about" title="关于异世">关于异世</a></li>
      </ul>
      <div class="logo" ref="logo" onClick={ this.clickLogo }/>
    </div>;
  }
}

export default BotNav;
