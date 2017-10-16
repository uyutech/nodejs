/**
 * Created by army8735 on 2017/8/25.
 */

let pause = false;

class TopNav extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    this.on(migi.Event.DOM, function() {
      let music = this.ref.music.element;
      let i = 0;
      function play() {
        if(!pause) {
          if(++i >= 50) {
            i = 0;
          }
          music.className = 'music music' + i;
        }
      }
      setInterval(play, 40);
      migi.eventBus.on('changeTitle', function(t) {
        self.name = t;
      });
    });
  }
  show() {
    $(this.element).removeClass('fn-hide');
  }
  hide() {
    $(this.element).addClass('fn-hide');
  }
  resize() {
    // let width = $(this.ref.bg.element).width();console.log(width);
    // $(this.ref.bg.element).css('height', width);
    // $(this.ref.fg.element).css('height', width * 0.8);
  }
  @bind name
  clickLogo() {
    this.emit('clickLogo');
  }
  clickMusic(e, vd) {
    pause = !pause;
    if(pause) {
      this.ref.music.element.className = 'music';
    }
    this.emit('music', !pause);
  }
  stop() {
    pause = true;
    this.ref.music.element.className = 'music';
    this.emit('music', !pause);
  }
  play() {
    pause = false;
    this.emit('music', !pause);
  }
  clickBack() {
    this.emit('back');
  }
  showBack() {
    $(this.ref.back.element).removeClass('fn-hide');
  }
  hideBack() {
    $(this.ref.back.element).addClass('fn-hide');
  }
  render() {
    return <div class="top-nav fn-hide">
      <div class="ti">
        <b class="bg" ref="bg"/>
        <b class="fg" ref="fg"/>
        <span onClick={ this.clickLogo }>{ this.name || '首页' }</span>
      </div>
      <b ref="back" class="back fn-hide" onClick={ this.clickBack }/>
      <b ref="music" class="music" onClick={ this.clickMusic }/>
    </div>;
  }
}

export default TopNav;
