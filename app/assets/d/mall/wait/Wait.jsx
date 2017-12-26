/**
 * Created by army8735 on 2017/12/26.
 */

'use strict';

import net from '../../common/net';

class Wait extends migi.Component {
  constructor(...data) {
    super(...data);
    this.productList = this.props.productList || [];
  }
  @bind productList
  click(e, vd, tvd) {
    let $button = $(tvd.element);
    if($button.hasClass('loading')) {
      return;
    }
    $button.addClass('loading');
    let cartID = tvd.props.rel;
    let idx = tvd.props.idx;
    let self = this;
    net.postJSON('/api/my/cancelPrize', { cartID }, function(res) {
      if(res.success) {
        // self.productList.splice(idx, 1);
        // location.href = '/mall/new';
        parent.setHash('/mall/new');
      }
      else {
        alert(res.message || util.ERROR_MESSAGE);
      }
      $button.removeClass('loading');
    }, function(res) {
      alert(res.message || util.ERROR_MESSAGE);
      $button.removeClass('loading');
    });
  }
  render() {
    return <div class="wait">
      <ul class="type">
        <li><a href="/mall">圈商城</a></li>
        <li><a href="/mall/new">新福利</a></li>
        <li><a href="/mall/wait" class="cur">等待收货</a></li>
      </ul>
      <p>本次发货时间为：12月20-27日的一周。<br/>考虑到邮件到付邮费较贵，并且可能导致在校学生很难收到，因此临时决定邮费统一由转圈平台垫付，之后会开通付邮费的方式~</p>
      <ul class="list" onClick={ { button: this.click } }>
        {
          (this.productList || []).map(function(item, i) {
            if(item.State !== 2) {
              return <li>{ item.ProductName }<span>已发货</span></li>;
            }
            return <li>{ item.ProductName }<button rel={ item.ID } idx={ i } class="cancel">取消发货</button></li>;
          })
        }
      </ul>
    </div>;
  }
}

export default Wait;
