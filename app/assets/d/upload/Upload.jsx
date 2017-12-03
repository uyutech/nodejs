/**
 * Created by army8735 on 2017/10/15.
 */

'use strict';

let Spark = require('spark-md5');

class Upload extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      let $input = $(self.element).find('input');
    });
  }
  change(e) {
    let file = e.target.files[0];
    let size = file.size;
    if(size && size !== 0 && size < 2048 * 2048 * 100) {
      let fileReader = new FileReader();
      fileReader.onload = function() {
        let spark = new Spark.ArrayBuffer();
        spark.append(fileReader.result);
        let md5 = spark.end();
        console.log(md5);
      };
      fileReader.readAsArrayBuffer(file);
    }
  }
  render() {
    return <div>
      <input type="file" onChange={ this.change } value=""/>
    </div>;
  }
}

export default Upload;
