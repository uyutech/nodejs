/**
 * Created by army8735 on 2017/10/28.
 */

'use strict';

const TYPE = {
  originMusic: 1,
  gaiBian: 2,
  fanChang: 3,
  musicAlbum: 5,
  recite: 8,
  photoAlbum: 11,
};

const NAME = {};
NAME[TYPE.originMusic] = '原创音乐';
NAME[TYPE.gaiBian] = '改编音乐';
NAME[TYPE.fanChang] = '翻唱';
NAME[TYPE.musicAlbum] = '音乐专辑';
NAME[TYPE.photoAlbum] = '相册';
NAME[TYPE.recite] = '朗诵';

const NEWTYPE = {
  1: '原创音乐',
  2: '翻唱',
  3: '填词翻唱',
  4: '改编音乐',
  5: '音乐专辑',
  6: '视频',
  7: '图片',
  8: '广播剧',
  9: '有声小说',
  10: '小说',
  11: '相册',
  12: '漫画',
  13: '动画',
  14: '电影',
  15: '电视剧',
  16: '游戏',
  17: '文集',
  18: '歌单',
  19: '朗诵',
  20: '演奏',
  21: '图册',
  22: '绘画',
  23: '摄影',
  24: 'Cosplay',
  25: '设计',
  26: '音乐视频',
  27: '微电影',
  28: '动态漫画',
  29: '诗词',
  30: '戏剧',
  31: '散文',
  32: '故事',
  33: '图书',
  34: '演唱会',
  35: '音乐剧',
  36: '书法',
};

export default {
  TYPE,
  NAME,
  NEWTYPE,
};
