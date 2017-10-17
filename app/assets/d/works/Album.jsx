/**
 * Created by army8735 on 2017/10/17.
 */

'use strict';

import net from '../common/net';
import util from '../common/util';

let skip = 0;
let take = 12;
let sortType = 0;

class Album extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      let $l1 = $(self.ref.l1.element);
      let $l2 = $(self.ref.l2.element);
      let $l3 = $(self.ref.l3.element);
      let $l4 = $(self.ref.l4.element);
      function addWaterFall(li) {
        let $min = $l1;
        if($l2.height() < $min.height()) {
          $min = $l2;
        }
        if($l3.height() < $min.height()) {
          $min = $l3;
        }
        if($l4.height() < $min.height()) {
          $min = $l4;
        }
        li.appendTo($min[0]);
      }
      self.load(function(data) {
        let length = data.data.length;
        let i = 0;
        // 先把有高宽的直接加入流中
        for(;i < length; i++) {
          let item = data.data[i];
          if(data.Width && data.Height) {
            let li = self.genItem(item);
            addWaterFall(li);
          }
          else {
            break;
          }
        }
        //剩下的先获取高度再加入流
        let num = length - i;
        let count = 0;
        let j = i;
        for(;i < length; i++) {
          let item = data.data[i];
          self.loadImgSize(item, function() {
            count++;
            if(count === num) {
              for(;j < length; j++) {
                let item = data.data[j];
                let li = self.genItem(item);
                addWaterFall(li);
              }
            }
          });
        }
      });
      let $c = $(self.ref.c.element);
      $c.on('click', '.like', function() {
        let $b = $(this);
        if($b.hasClass('loading')) {
          return;
        }
        $b.addClass('loading');
        let id = $b.attr('itemID');
        net.postJSON('/api/works/likeWork', { workID: id }, function(res) {
          if(res.success) {
            if(res.data === 211) {
              $b.addClass('has');
            }
            else {
              $b.removeClass('has');
            }
          }
          else if(res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
          }
          else {
            alert(res.message || util.ERROR_MESSAGE);
          }
          $b.removeClass('loading');
        }, function (res) {
          alert(res.message || util.ERROR_MESSAGE);
          $b.removeClass('loading');
        });
      });
      $c.on('click', '.favor', function() {
        let $b = $(this);
        if($b.hasClass('loading')) {
          return;
        }
        $b.addClass('loading');
        let id = $b.attr('itemID');
        let url = $b.hasClass('has') ? '/api/works/unFavorWork' : '/api/works/favorWork';
        net.postJSON(url, { workID: id }, function(res) {
          if(res.success) {
            if(url === '/api/works/favorWork') {
              $b.addClass('has');
            }
            else {
              $b.removeClass('has');
            }
          }
          else if(res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
          }
          else {
            alert(res.message || util.ERROR_MESSAGE);
          }
          $b.removeClass('loading');
        }, function (res) {
          alert(res.message || util.ERROR_MESSAGE);
          $b.removeClass('loading');
        });
      });
    });
  }
  load(cb) {
    net.postJSON('/api/works/photoList', { worksID: this.props.worksID, skip, take, sortType }, function(res) {
      if(res.success) {
        let data = res.data;
        cb(data);
      }
      else {
        alert(res.message || util.ERROR_MESSAGE);
      }
    }, function (res) {
      alert(res.message || util.ERROR_MESSAGE);
    });
  }
  genItem(data) {
    if(data.Width <= 144) {
      return <li>
        <img src={ data.FileUrl } height={ data.Height }/>
        <b class={ 'like' + (data.ISLike ? ' has' : '') } itemID={ data.ItemID }/>
        <b class={ 'favor' + (data.ISFavor ? ' has' : '') } itemID={ data.ItemID }/>
      </li>;
    }
    let height = data.Height * 144 / data.Width;
    return <li>
      <img src={ data.FileUrl } height={ height }/>
      <b class={ 'like' + (data.ISLike ? ' has' : '') } itemID={ data.ItemID }/>
      <b class={ 'favor' + (data.ISFavor ? ' has' : '') } itemID={ data.ItemID }/>
    </li>;
  }
  loadImgSize(data, cb) {
    let img = document.createElement('img');
    img.className = 'temp';
    img.src = data.FileUrl;
    img.onload = function() {
      data.Width = img.width;
      data.Height = img.height;
      cb();
      document.body.removeChild(img);
    };
    document.body.appendChild(img);
  }
  render() {
    return <div class="mod album">
      <h4>相册</h4>
      <div class="fn">
        <ul class="type fn-clear" onClick={ { li: this.switchType2 } }>
          <li class="cur" rel="0">全部</li>
          <li rel="1">电脑壁纸</li>
        </ul>
        <ul class="type2 fn-clear" onClick={ { li: this.switchType } }>
          <li class="cur" rel="0">最新</li>
          <li rel="1">最热</li>
        </ul>
      </div>
      <div class="c fn-clear" ref="c">
        <ul ref="l1">
        </ul>
        <ul ref="l2">
        </ul>
        <ul ref="l3">
        </ul>
        <ul ref="l4">
        </ul>
      </div>
    </div>;
  }
}

export default Album;
