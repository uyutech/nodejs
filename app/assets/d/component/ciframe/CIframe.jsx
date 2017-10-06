/**
 * Created by army8735 on 2017/9/20.
 */

class CIframe extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  render() {
    return <iframe class="cp-ciframe" src="about:blank" frameBorder="0" scrolling="auto" allowfullscreen="allowfullscreen"/>;
  }
}

export default CIframe;
