/**
 * Created by army8735 on 2017/8/13.
 */

export default function(workType) {
  switch (workType) {
    case 1111:
      return {
        bigType: 'audio',
        name: '原创音乐',
      };
    case 1131:
      return {
        bigType: 'audio',
        name: '原创伴奏',
      };
    case 2111:
      return {
        bigType: 'video',
        name: '原创视频',
      };
    case 3120:
      return {
        bigType: 'poster',
        name: '海报',
      };
    case 4110:
      return {
        bigType: 'text',
        name: '文案',
      };
    case 4211:
      return {
        bigType: 'lyric',
        name: '原创歌词',
        display: '歌词',
      };
    default:
      return {
      };
  }
};
