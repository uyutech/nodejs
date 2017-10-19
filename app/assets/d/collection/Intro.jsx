/**
 * Created by army8735 on 2017/10/19.
 */

'use strict';

class Intro extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  render() {
    return <div class="intro" style={ 'background-image:url(' + this.props.cover + ')'}/>;
  }
}

export default Intro;
