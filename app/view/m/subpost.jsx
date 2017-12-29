/**
 * Created by army8735 on 2017/12/26.
 */

'use strict';

import SubPost from '../../assets/m/subpost/SubPost.jsx';

export default function(data) {
  migi.resetUid();

  let circleID = data.circleID;
  let circleDetail = data.circleDetail;
  let myCircleList = data.myCircleList;
  let tagList = data.tagList;
  let activityLabel = data.activityLabel;
  let tags = data.tags;

  let subPost = migi.preRender(
    <SubPost circleID={ circleID } circleDetail={ circleDetail }
             placeholder={ '在' + (circleDetail.TagName || '转圈') +'圈画个圈吧' }
             to={ myCircleList } tagList={ tagList } activityLabel={ activityLabel }
             tags={ tags }/>
  );

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getMHead({ title: '画圈' })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/msubpost.css')}"/>
</head>
<body>
<div id="page">${subPost}</div>
${data.helper.getMTopNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.circleID = ${data.helper.stringify(circleID)};
  $CONFIG.circleDetail = ${data.helper.stringify(circleDetail)};
  $CONFIG.myCircleList = ${data.helper.stringify(myCircleList)};
  $CONFIG.tagList = ${data.helper.stringify(tagList)};
  $CONFIG.activityLabel = ${data.helper.stringify(activityLabel)};
  $CONFIG.tags = ${data.helper.stringify(tags)};
</script>
<script src="${data.helper.getAssetUrl('/mcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/msubpost.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
