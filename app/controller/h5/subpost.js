/**
 * Created by army8735 on 2017/12/3.
 */

'use strict';

let hash = {
  '1': '一',
  '2': '二',
  '3': '三',
  '4': '四',
  '5': '五',
  '6': '六',
  '0': '七'
};

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let activityLabel = {
        '0': [
          {
            name: '日记',
            value: '#日记# ' + (new Date().getMonth() + 1) + '月' + new Date().getDate() + '日 星期' + hash[new Date().getDay()] + '\n'
          },
          {
            name: '岁慕天寒',
            value: '#岁慕天寒#'
          },
          {
            name: '难忘的漫展',
            value: '#难忘的漫展#'
          },
          {
            name: '我最期待的漫展形式',
            value: '#我最期待的漫展形式#'
          }
        ],
        '2019000000000037': [
          {
            name: '印象深刻的动漫',
            value: '#印象深刻的动漫#'
          },
          {
            name: '最爱的动漫人物',
            value: '#最爱的动漫人物#'
          }
        ],
        '2019000000000007': [
          {
            name: '我喜欢的CV',
            value: '#我喜欢的CV#'
          },
          {
            name: '最想被念出来的书',
            value: '#最想被念出来的书#'
          }
        ],
        '2019000000000041': [
          {
            name: '正在玩的游戏',
            value: '#正在玩的游戏#'
          },
          {
            name: '沉迷过的游戏',
            value: '#沉迷过的游戏#'
          },
          {
            name: '记忆中的第一款游戏',
            value: '#记忆中的第一款游戏#'
          }

        ],
        '2019000000000032': [
          {
            name: '每日练字打卡',
            value: [
              {
                key: 'Day 1',
                value:'#每日练字打卡# #31天画圈挑战# Day1 #我在转圈上听的第一首歌#'
              },
              {
                key: 'Day 2',
                value: '#每日练字打卡# #31天画圈挑战# Day2 #你的名字#'
              },
              {
                key: 'Day 3',
                value: '#每日练字打卡# #31天画圈挑战# Day3 #手写诗词歌赋飞花令# 主题：#花#'
              },
              {
                key: 'Day 4',
                value: '#每日练字打卡# #31天画圈挑战#  Day4  #我喜爱的CV#'
              },
              {
                key: 'Day 5',
                value: '#每日练字打卡# #31天画圈挑战#  Day5  #国漫崛起#'
              },
              {
                key: 'Day 6',
                value: '#每日练字打卡# #31天画圈挑战#  Day6  #网文推荐#'
              },
              {
                key: 'Day 7',
                value: '#每日练字打卡# #31天画圈挑战#  Day7  #手抄古风歌词飞花令# 主题：#雪#'
              },
              {
                key: 'Day 8',
                value: '#每日练字打卡# #31天画圈挑战#  Day8  #手写诗词歌赋飞花令# 主题：#茶#'
              },
              {
                key: 'Day 9',
                value: '#每日练字打卡# #31天画圈挑战#  Day9  #手抄古风歌词飞花令# 主题：#酒#'
              },
              {
                key: 'Day 10',
                value: '#每日练字打卡# #31天画圈挑战#  Day10  #难忘的漫展#'
              },
              {
                key: 'Day 11',
                value: '#每日练字打卡# #31天画圈挑战#  Day11  #我的家乡#'
              },
              {
                key: 'Day 12',
                value: '#每日练字打卡# #31天画圈挑战# Day 12 #我喜爱的二次元商品# #买买买#'
              },
              {
                key: 'Day 13',
                value: '#每日练字打卡# #31天画圈挑战# Day 13 #爱我中华# #手写诗词歌赋#'
              },
              {
                key: 'Day 14',
                value: '#每日练字打卡# #31天画圈挑战# Day 14 #我喜欢的古装影视剧#'
              },
              {
                key: 'Day 15',
                value: '#每日练字打卡# #31天画圈挑战# Day 15 #我喜欢的书法碑帖#'
              },
              {
                key: 'Day 16',
                value: '#每日练字打卡# #31天画圈挑战# Day 16 #我喜欢的一篇古文#'
              }
            ]
          },
          {
            name: '个人书法展',
            value: '#个人书法展#',
          }
        ],
        '2019000000000072': [
          {
            name: '汉服种草活动',
            value: '#汉服种草活动#'
          },
          {
            name: '传统文化之美',
            value: '#传统文化之美#'
          }
        ],
        '2019000000000001': [
          {
            name: '每日荐歌',
            value: [
              {
                key: 'Day 1',
                value: '#每日荐歌# #31天画圈挑战# Day1 #一首让我入坑的歌#'
              },
              {
                key: 'Day 2',
                value: '#31天画圈挑战# #每日荐歌# Day2 #一首让你少女心爆棚甜到掉牙的歌#'
              },
              {
                key: 'Day 3',
                value: '#每日荐歌# #31天画圈挑战# Day3 #那首歌曾戳中我的泪点#'
              },
              {
                key: 'Day 4',
                value: '#每日荐歌# #31天画圈挑战# Day4 #我喜欢的CV#唱的歌'
              },
              {
                key: 'Day 5',
                value: '#每日荐歌# #31天画圈挑战# Day5 #那首歌真的超逗的#'
              },
              {
                key: 'Day 6',
                value: '#每日荐歌# #31天画圈挑战# Day6 #播放列表No.3#'
              },
              {
                key: 'Day 7',
                value: '#每日荐歌# #31天画圈挑战# Day7 #一首带雪字的歌#'
              },
              {
                key: 'Day 8',
                value: '#每日荐歌# #31天画圈挑战# Day8 #那首歌带我到想去的地方#'
              },
              {
                key: 'Day 9',
                value: '#每日荐歌# #31天画圈挑战# Day9 #我想去听TA的演唱会#'
              },
              {
                key: 'Day 10',
                value: '#每日荐歌# #31天画圈挑战# Day10 #那首歌叫我起床#'
              },
              {
                key: 'Day 11',
                value: '#每日荐歌# #31天画圈挑战# Day11 #教练我想学那件乐器！#'
              },
              {
                key: 'Day 12',
                value: '#每日荐歌# #31天画圈挑战# Day12 #那些让我惊叹的超高音#'
              },
              {
                key: 'Day 13',
                value: '#每日荐歌# #31天画圈挑战# Day13 #一首带给我正能量的歌#'
              },
              {
                key: 'Day 14',
                value: '#每日荐歌# #31天画圈挑战# Day14 #如耳语般苏到迷幻的低音#'
              },
              {
                key: 'Day 15',
                value: '#每日荐歌# #31天画圈挑战# Day15 #我想学习的那项技能#'
              },
              {
                key: 'Day 16',
                value: '#每日荐歌# #31天画圈挑战# Day16 #如果去KTV，我想和TA一起唱#'
              }
            ]
          },
          {
            name: '记忆里的歌',
            value: '#记忆里的歌#'
          },
          {
            name: '那些年追过的歌手',
            value: '#那些年追过的歌手#'
          }
        ],
        '2019000000000020': [
          {
            name: '印象深刻的书',
            value: '#印象深刻的书#'
          },
          {
            name: '喜爱的诗词作者',
            value: '#喜爱的诗词作者#'
          }
        ],
        '2019000000000015': [
          {
            name: '手机摄影大赛',
            value: '#手机摄影大赛#'
          },
          {
            name: '每日美食打卡',
            value: '#每日美食打卡#'
          },
          {
            name: '每周最美味推荐',
            value: '#每周最美味推荐#'
          }
        ],
        '2019000000000171': [
          {
            name: '异世同人图',
            value: '#异世同人图#'
          },
          {
            name: '异世同人文',
            value: '#异世同人文#'
          }
        ]
      };

      let uid = ctx.session.uid;
      let hotCircleList = [];
      let res = yield ctx.helper.postServiceJSON('api/find/GetPost', {
        uid,
        Skip: 0,
        Take: 6,
      });
      hotCircleList = res.data.data;
      ctx.body = ctx.helper.okJSON({
        activityLabel,
        hotCircleList,
      });
    }
  }
  return Controller;
};
