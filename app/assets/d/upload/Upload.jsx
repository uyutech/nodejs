/**
 * Created by army8735 on 2017/10/15.
 */

'use strict';

let Spark = require('spark-md5');

class Upload extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.worksTypeList = self.props.worksTypeList;
    self.worksType = 1;
    self.professionList = self.worksTypeList[0].professionList;
    self.workTypeList = self.worksTypeList[0].workTypeList;
    self.on(migi.Event.DOM, function() {
    });
  }
  @bind curWorksType
  @bind worksType
  @bind worksTypeList
  @bind worksName
  @bind worksDesc
  @bind professionList
  @bind workTypeList
  change(e) {
    let file = e.target.files[0];
    let size = file.size;
    if(size && size !== 0 && size < 2048 * 2048 * 100) {
      let fileReader = new FileReader();
      fileReader.onload = function() {
        let spark = new Spark.ArrayBuffer();
        spark.append(fileReader.result);
        let md5 = spark.end();
      };
      fileReader.readAsArrayBuffer(file);
    }
  }
  clickWorksType(e, vd, tvd) {
    if(tvd.props.rel === this.curWorksType) {
      return;
    }
    this.curWorksType = tvd.props.rel;
  }
  next() {
    this.worksType = this.curWorksType;
    for(let i = 0; i < this.worksTypeList.length; i++) {
      if(this.worksTypeList[i].id === this.worksType) {
        this.professionList = this.worksTypeList[i].professionList;
        break;
      }
    }
  }
  render() {
    return <div class="upload">
      <div class={ (this.worksType ? 'fn-hide' : '')  }>
        <h3>请选择大作品类型</h3>
        <ul class="works-type"
            onClick={ { label: this.clickWorksType } }>
          {
            (this.worksTypeList || []).map((item) => {
              return <li class={ this.curWorksType === item.id ? 'cur' : '' }>
                <label rel={ item.id }>
                  <input type="radio" name="worksType"/>
                  <span>{ item.name }</span>
                </label>
              </li>;
            })
          }
        </ul>
        <button class="next"
                disabled={ !this.curWorksType }
                onClick={ this.next }>下一步</button>
      </div>
      <div class={ 'con' + (this.worksType ? '' : ' fn-hide') }>
        <div class="line">
          <label class="required">作品名</label>
          <input type="text" value={ this.worksName } placeholder="请输入作品名"/>
        </div>
        <div class="line">
          <label>作品简介</label>
          <textarea placeholder="请输入作品简介">{ this.worksDesc }</textarea>
        </div>
        <div class="poster">
          <input type="file" ref="file"/>
        </div>
        {
          (this.professionList || []).map((item) => {
            return <div class="line">
              <label class={ item.required ? 'required' : '' }>{ item.name }</label>
              <input type="text" value={ item.value }
                     placeholder={ '请输入' + item.name }/>
            </div>;
          })
        }
        <ul class="add-more">
          {
            (this.worksTypeList || []).map((item) => {
              return <li>{ item.name }</li>;
            })
          }
        </ul>
      </div>
    </div>;
  }
}

export default Upload;
