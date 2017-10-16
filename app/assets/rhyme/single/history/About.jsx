/**
 * Created by army8735 on 2017/8/26.
 */

class About extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  show() {
    $(this.element).removeClass('fn-hide');
  }
  hide() {
    $(this.element).addClass('fn-hide');
  }
  render() {
    return <div class="main history">
      <div class="con">
        <h3><span>•<br/>感谢<br/>•</span></h3>
        <div class="c">
          <p>“人间梦我，我梦人间裁。”</p>
          <p>二次元世界就好似平行于三次元的一个梦幻世界。在这里，二次元优秀的创作者、众人青睐的大神们也有梦可造，有念可说。异世谣的初衷便是把这个网络世界幻想化，用奇幻动人的故事将大神们的所思所想与心境感悟表达出来，并分享给大家。</p>
          <p>感谢众多的男神女神支持并参与这个系列的创作，我们会竭尽全力将大家一起创造的这个世界用美妙的音乐、精美的绘画、精彩的视频以及其他各种形式呈现给大家！</p>
          <p>也要特别感谢 <a href="http://weibo.com/p/1005056259241863" target="_blank">@转圈circling</a> 的程序员小哥哥们为我们提供的技术支持，让我们能够通过各种方式和异世以及异世的大神们进行互动。</p>
          <p>异世里的故事会随着更多好听的新歌曲放出，详情请关注我们的官网与官博、官微哟。</p>
          <p class="end">—— <a href="#characterjiemeng">结梦团队</a> <a href="http://weibo.com/u/6276065571" target="_blank">@结梦谷</a></p>
          <p class="end">丁酉年 戊申月 丙戌日</p>
        </div>
        <div class="scroll fn-hide">
          <span class="bar"/>
        </div>
      </div>
    </div>;
  }
}

export default About;
