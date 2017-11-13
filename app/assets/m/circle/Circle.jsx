/**
 * Created by army8735 on 2017/11/5.
 */

'use strict';

import Title from './Title.jsx';
import SubCmt from '../../d/component/subcmt/SubCmt.jsx';
import HotPost from '../component/hotpost/HotPost.jsx';

class Circle extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      let subCmt = self.ref.subCmt;
      subCmt.on('click', function() {
        location.href = '/circle/post?circleID=' + $CONFIG.circleID;
      });
    });
  }
  render() {
    return <div class="circle fn-clear">
      <Title circleDetail={ this.props.circleDetail }/>
      <div class="warn">
        <div class="t fn-clear">
          <img class="pic" src="//zhuanquan.xyz/temp/f3bcae7e2f60d9729a0e205dfb39ca6e.jpg"/>
          <div class="txt">
            <div>
              <span class="name">圈儿</span>
              <small class="time">刚刚</small>
            </div>
          </div>
        </div>
        <div class="c">
          <pre>#画个圈# 功能暂时开放啦~不过目前个别手机机型会有无法加载图片的问题，程序员小哥哥们正在尽快解决。
在此之前，大家可以尝试用电脑，或更换手机浏览器发布图片。
这个问题解决之后，我们会公布新的福利活动！敬请期待哦~~</pre>
          <b class="arrow"/>
        </div>
      </div>
      <HotPost ref="hotPost" datas={ this.props.postList }/>
      <SubCmt ref="subCmt"
              tipText="-${n}"
              subText="发送"
              readOnly={ true }
              placeholder={ '在' + this.props.circleDetail.TagName +'圈画个圈吧' }/>
    </div>;
  }
}

export default Circle;
