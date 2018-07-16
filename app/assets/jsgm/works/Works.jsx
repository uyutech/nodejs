/**
 * Created by army8735 on 2018/7/10.
 */

'use strict';

import $net from '../../d/common/net';
import $util from '../../d/common/util';
import Nav from '../common/Nav.jsx';
import Page from '../../d/component/page/Page.jsx';

let ajax;

class Works extends migi.Component {
  constructor(...data) {
    super(...data);
    this.list = this.props.list || [];
  }
  @bind list
  page(i) {
    if(ajax) {
      ajax.abort();
    }
    let self = this;
    ajax = $net.postJSON('worksList', { offset: (i - 1) * 10 }, function(res) {
      if(res.success) {
        self.list = res.data;
      }
      else {
        alert(res.message || $util.ERROR_MESSAGE);
      }
    }, function(res) {
      alert(res.message || $util.ERROR_MESSAGE);
    });
  }
  render() {
    return <div class="works">
      <a name="head"/>
      <Nav index={ 2 }/>
      {
        this.list.count
          ? ''
          : <img class="wait"
                 src="//zhuanquan.xin/img/f65a43134bfaf972bff5e06f5c51982c.png"/>
      }
      <ul class="list fn-clear">
      {
        this.list.data.map((item) => {
          return <li>
            <a class="pic" href={ '/jsgm/works/' + item.id + '#head' }>
              <img src={ $util.img(item.user.headUrl || '//zhuanquan.xin/img/blank.png', 480, 480, 80) }/>
              <span>No.{ item.id }</span>
            </a>
            <div class="txt">
              <p>{ item.name }</p>
              <p>{ item.title }</p>
              <p>{ item.inspiration }</p>
            </div>
          </li>;
        })
      }
      </ul>
      <Page index={ 1 }
            total={ Math.ceil(this.list.count / 10) }
            on-page={ this.page }/>
    </div>;
  }
}

export default Works;
