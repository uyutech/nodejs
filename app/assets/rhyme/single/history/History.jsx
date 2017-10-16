/**
 * Created by army8735 on 2017/8/26.
 */

class History extends migi.Component{
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
        <h3><span>•<br/>异世纪年<br/>•</span></h3>
        <div class="c">
          <p>“物生谓之化，物极谓之变。”</p>
          <p class="end">——《素问·天元纪大论》</p>
          <p>混沌初开，乾坤始明，方先出蒙昧世界，灵与物的重叠之处便是异世。在异世亿万年的演化中，日升月落，斗转星移，沧海桑田，由简到繁演化出了世间万物，这个演化一直持续着，直到出现了自我意识。部分生灵开始按照自己的意志认识并改造世界。自此，这世间一切开始有了名字，而他们则自称人类。</p>
          <p>万物有灵，天地河海日月山川之灵谓之灵气，鸟兽鱼虫花草树木之灵谓之灵魂。</p>
          <p>天地灵气累积，行阴阳八卦之道，于机缘巧合下生出了仙灵。长此以往，万物又在天地灵气的滋养下，修炼出强大的灵力，化为妖。</p>
          <p>而随着人类历史的不断演变，世间生灵的情感不断碰撞，最终发展到极致，凝聚为多种强大的信仰，信仰之极则生灵力，灵力之极则生精魄，有了自己的意识。这些强大的灵力与信仰在世间结成小部分灵域，使各个灵域中的人类进化变异，变化出新的特征与特质，成为异人。</p>
          <p>To be continued...</p>
        </div>
        <div class="scroll fn-hide">
          <span class="bar"/>
        </div>
      </div>
    </div>;
  }
}

export default History;
