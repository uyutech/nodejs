/**
 * Created by army8735 on 2017/9/23.
 */

class Grid extends migi.Component {
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
    return <div class="main grid">
      <div class="con">
        <ul class="fn-clear">
          <li>
            <a href="#work2015000000000001">
              <img src="http://zhuanquan.xyz/rhymesland/src/single/grid/1.jpg"/>
              <span>《皎然记》</span>
            </a>
          </li>
          <li>
            <a href="#work2015000000000002">
              <img src="http://zhuanquan.xyz/rhymesland/src/single/grid/2.jpg"/>
              <span>《说梦》</span>
            </a>
          </li>
          <li>
            <a href="#work2015000000001329">
              <img src="http://zhuanquan.xyz/pic/e45a131fe3e858af6226958c4931f25b.jpg"/>
              <span>《黄粱梦》</span>
            </a>
          </li>
          <li>
            <a href="#work2015000000001331">
              <img src="http://zhuanquan.xyz/pic/25fbb4c756a8e2c8f4175e8f53065b69.jpg"/>
              <span>《梦黄粱》</span>
            </a>
          </li>
        </ul>
      </div>
    </div>;
  }
}

export default Grid;
