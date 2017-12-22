/**
 * Created by army8735 on 2017/12/22.
 */

'use strict';

import util from "../../../d/common/util";
import net from "../../../d/common/net";

class New extends migi.Component {
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
    net.postJSON('/api/my/sendPrize', { cartID }, function(res) {
      if(res.success) {
        // self.productList.splice(idx, 1);
        location.href = '/mall/wait';
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
    return <div class="new">
      <ul class="type">
        <li><a href="/mall">圈商城</a></li>
        <li><a href="/mall/new" class="cur">新福利</a></li>
        <li><a href="/mall/wait">等待收货</a></li>
      </ul>
      <div class="private"><a href="/my/private">编辑收货地址<small>(圈儿会为你保密哦)</small></a></div>
      <p>本次发货时间为：12月20-27日的一周。<br/>考虑到邮件到付邮费较贵，并且可能导致在校学生很难收到，因此临时决定邮费统一由转圈平台垫付，之后会开通付邮费的方式~</p>
      <ul class="list" onClick={ { button: this.click } }>
        {
          (this.productList || []).map(function(item, i) {
            return <li>{ item.ProductName }<button rel={ item.ID } idx={ i }>发货</button></li>;
          })
        }
      </ul>
    </div>;
  }
}

export default New;
