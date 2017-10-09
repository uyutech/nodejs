/**
 * Created by army8735 on 2017/8/13.
 */

export default function(workType) {
  switch (workType) {
    case 1111:
      return {
        bigType: 'audio',
        typeName: '原创音乐',
      };
    case 1131:
      return {
        bigType: 'audio',
        typeName: '原创伴奏',
      };
    case 2111:
      return {
        bigType: 'video',
        typeName: '原创视频',
      };
    case 4110:
      return {
        bigType: 'text',
        typeName: '文案',
      };
    default:
      return {
      };
  }
};
