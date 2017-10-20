/**
 * Created by army8735 on 2017/10/20.
 */

'use strict';

class Guide extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  render() {
    return <div class="guide">
      <pre>欢迎从异世来到转圈！我是圈娘~
“转圈”是一款仍在开发中的平台，感谢您参与我们的内测活动，我们联合各位大大为您准备了各种福利，活动详情在活动详情页中查看哦！也欢迎随时在转圈右下角和圈儿互动！

此外我们特别为从异世而来的你准备了一份超大惊喜！
请点击右侧的播放按钮收听哦~
异世谣相关的福利活动可以点击右侧活动页面查看~
福利多多，大家加油哦！

下面的内容中不知可有您喜欢的呢？
勾选喜欢的标签和作者可以帮助圈儿更好的了解你哦~</pre>
    </div>;
  }
}

export default Guide;
