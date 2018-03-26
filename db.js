/**
 * Created by army8735 on 2018/3/24.
 */

'use strict';

const config = require('./config/config.default');
const sql = require('mssql');
const Sequelize = require('sequelize');
// const sequelize = new Sequelize(config.database.circling.name, config.database.circling.username, config.database.circling.password, {
//   host: config.database.circling.host,
const sequelize = new Sequelize('circling', 'root', '87351984@', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci'
  },
  options: {
    charset: 'utf8mb4',
  },
  define: {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
  },
});

const Author = require('./app/model/author')({ sequelizeCircling: sequelize, Sequelize });
const AuthorAlias = require('./app/model/authorAlias')({ sequelizeCircling: sequelize, Sequelize });
const AuthorNum = require('./app/model/authorNum')({ sequelizeCircling: sequelize, Sequelize });
const AuthorOutside = require('./app/model/authorOutside')({ sequelizeCircling: sequelize, Sequelize });
const Circle = require('./app/model/circle')({ sequelizeCircling: sequelize, Sequelize });
const CircleTop = require('./app/model/circleTop')({ sequelizeCircling: sequelize, Sequelize });
const CircleNum = require('./app/model/circleNum')({ sequelizeCircling: sequelize, Sequelize });
const Tag = require('./app/model/tag')({ sequelizeCircling: sequelize, Sequelize });
const TagCommentRelation = require('./app/model/tagCommentRelation')({ sequelizeCircling: sequelize, Sequelize });
const CircleTagRelation = require('./app/model/circleTagRelation')({ sequelizeCircling: sequelize, Sequelize });
const User = require('./app/model/user')({ sequelizeCircling: sequelize, Sequelize });
const UserAuthorRelation = require('./app/model/userAuthorRelation')({ sequelizeCircling: sequelize, Sequelize });
const Work = require('./app/model/work')({ sequelizeCircling: sequelize, Sequelize });
const WorkAudio = require('./app/model/workAudio')({ sequelizeCircling: sequelize, Sequelize });
const WorkVideo = require('./app/model/workVideo')({ sequelizeCircling: sequelize, Sequelize });
const WorkImage = require('./app/model/workImage')({ sequelizeCircling: sequelize, Sequelize });
const WorkText = require('./app/model/workText')({ sequelizeCircling: sequelize, Sequelize });
const WorkType = require('./app/model/workType')({ sequelizeCircling: sequelize, Sequelize });
const WorkNum = require('./app/model/workNum')({ sequelizeCircling: sequelize, Sequelize });
const WorksType = require('./app/model/worksType')({ sequelizeCircling: sequelize, Sequelize });
const Works = require('./app/model/works')({ sequelizeCircling: sequelize, Sequelize });
const MusicAlbum = require('./app/model/musicAlbum')({ sequelizeCircling: sequelize, Sequelize });
const ImageAlbum = require('./app/model/imageAlbum')({ sequelizeCircling: sequelize, Sequelize });
const WorksNum = require('./app/model/worksNum')({ sequelizeCircling: sequelize, Sequelize });
const WorksTimeline = require('./app/model/worksTimeline')({ sequelizeCircling: sequelize, Sequelize });
const WorksWorkRelation = require('./app/model/worksWorkRelation')({ sequelizeCircling: sequelize, Sequelize });
const MusicAlbumWorkRelation = require('./app/model/musicAlbumWorkRelation')({ sequelizeCircling: sequelize, Sequelize });
const ImageAlbumWorkRelation = require('./app/model/imageAlbumWorkRelation')({ sequelizeCircling: sequelize, Sequelize });
const Comment = require('./app/model/comment')({ sequelizeCircling: sequelize, Sequelize });
const CommentNum = require('./app/model/commentNum')({ sequelizeCircling: sequelize, Sequelize });
const AuthorCommentRelation = require('./app/model/authorCommentRelation')({ sequelizeCircling: sequelize, Sequelize });
const WorksCommentRelation = require('./app/model/worksCommentRelation')({ sequelizeCircling: sequelize, Sequelize });
const CircleCommentRelation = require('./app/model/circleCommentRelation')({ sequelizeCircling: sequelize, Sequelize });

(async () => {
  try {
    const pool = await sql.connect({
      user: 'sa',
      password: 'sa123#@',
      server: '192.168.0.103',
      // password: 'zhuanq2017#!',
      // server: '101.132.140.109',
      database: 'CirclingDB',
    });
    await dealAuthor(pool);
    await dealCircle(pool);
    await dealUser(pool);
    await dealWork(pool);
    await dealWorks(pool);
    await dealWorksWork(pool);
    await dealComment(pool);
    await dealWorksComment();
    console.log('======== END ========');
  } catch (err) {
    console.error(err);
  }
})();

async function dealAuthor(pool) {
  console.log('------- dealAuthor --------');
  await Author.sync();
  await AuthorAlias.sync();
  await AuthorNum.sync();
  await AuthorOutside.sync();
  let last = 2017000000005795;
  let result = await pool.request().query(`SELECT * FROM dbo.Authors_Info WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    await Author.create({
      id: item.ID,
      type: item.AuthorOrgaType,
      name: item.AuthorName,
      fans_name: item.FansName || '',
      fans_circle_name: item.FansCirclingName || '',
      head_url: item.Head_url || '',
      is_settled: !!item.ISSettled,
      sign: item.Sign || '',
      state: item.ISDel ? 1 : 0,
      create_time: item.CreateTime,
      update_time: item.CreateTime,
    });
    if(item.AuthorAliasName) {
      await AuthorAlias.create({
        author_id: item.ID,
        alias: item.AuthorAliasName,
        create_time: item.CreateTime,
        update_time: item.CreateTime,
      });
    }
    if(item.BaiduUrl) {
      await AuthorOutside.create({
        author_id: item.ID,
        type: 0,
        is_deleted: false,
        url: item.BaiduUrl,
        create_time: item.CreateTime,
        update_time: item.CreateTime,
      });
    }
    if(item.BilibiliUrl) {
      await AuthorOutside.create({
        author_id: item.ID,
        type: 1,
        is_deleted: false,
        url: item.BilibiliUrl,
        create_time: item.CreateTime,
        update_time: item.CreateTime,
      });
    }
    if(item.FiveSingUrl) {
      await AuthorOutside.create({
        author_id: item.ID,
        type: 2,
        is_deleted: false,
        url: item.FiveSingUrl,
        create_time: item.CreateTime,
        update_time: item.CreateTime,
      });
    }
    if(item.HuabanUrl) {
      await AuthorOutside.create({
        author_id: item.ID,
        type: 3,
        is_deleted: false,
        url: item.HuabanUrl,
        create_time: item.CreateTime,
        update_time: item.CreateTime,
      });
    }
    if(item.LofterUrl) {
      await AuthorOutside.create({
        author_id: item.ID,
        type: 4,
        is_deleted: false,
        url: item.LofterUrl,
        create_time: item.CreateTime,
        update_time: item.CreateTime,
      });
    }
    if(item.PCOUrl) {
      await AuthorOutside.create({
        author_id: item.ID,
        type: 5,
        is_deleted: false,
        url: item.PCOUrl,
        create_time: item.CreateTime,
        update_time: item.CreateTime,
      });
    }
    if(item.WangyiUrl) {
      await AuthorOutside.create({
        author_id: item.ID,
        type: 6,
        is_deleted: false,
        url: item.WangyiUrl,
        create_time: item.CreateTime,
        update_time: item.CreateTime,
      });
    }
    if(item.WeiboUrl) {
      await AuthorOutside.create({
        author_id: item.ID,
        type: 7,
        is_deleted: false,
        url: item.WeiboUrl,
        create_time: item.CreateTime,
        update_time: item.CreateTime,
      });
    }
    if(item.ZcoolUrl) {
      await AuthorOutside.create({
        author_id: item.ID,
        type: 8,
        is_deleted: false,
        url: item.ZcoolUrl,
        create_time: item.CreateTime,
        update_time: item.CreateTime,
      });
    }
  }
}

async function dealCircle(pool) {
  console.log('------- dealCircle --------');
  await Circle.sync();
  await CircleTop.sync();
  await CircleNum.sync();
  await Tag.sync();
  await CircleTagRelation.sync();
  await TagCommentRelation.sync();
  let last = 2019000000003990;
  let result = await pool.request().query(`SELECT * FROM dbo.Circling_Info WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    await Circle.create({
      id: item.ID,
      name: item.TagName,
      describe: item.Describe || '',
      banner: item.Banner || '',
      cover: item.CoverPic || '',
      type: item.CirclingType,
      state: item.IsOpen ? 2 : (item.ISDel ? 0 : 1),
      create_time: item.CreateTime,
      update_time: item.CreateTime,
    });
    if(item.TopPost) {
      let top = item.TopPost.split(',');
      for(let j = 0; j < top.length; j++) {
        await CircleTop.create({
          circle_id: item.ID,
          comment_id: top[j],
          weight: 0,
          update_time: item.CreateTime,
        });
      }
    }
    await CircleNum.create({
      circle_id: item.ID,
      type: 0,
      num: 0,
      update_time: item.CreateTime,
    });
    await CircleNum.create({
      circle_id: item.ID,
      type: 1,
      num: item.FansNumber,
      update_time: item.CreateTime,
    });
    await CircleNum.create({
      circle_id: item.ID,
      type: 2,
      num: item.Popular,
      update_time: item.CreateTime,
    });
    await CircleNum.create({
      circle_id: item.ID,
      type: 3,
      num: item.CommentCountRaw,
      update_time: item.CreateTime,
    });
  }
  let tagOldIdHash = {};
  last = 2021000000008340;
  result = await pool.request().query(`SELECT * FROM dbo.Tag_Info WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    let res = await Tag.create({
      name: item.TagName,
      temp_id: item.ID,
      is_deleted: false,
      create_time: item.CreateTime,
    });
    tagOldIdHash[item.ID] = res.dataValues.id;
  }
  last = 977;
  result = await pool.request().query(`SELECT * FROM dbo.Concern_Cirling_tag WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    await CircleTagRelation.create({
      circle_id: item.CirclingID,
      tag_id: tagOldIdHash[item.TagID],
      is_deleted: !!item.ISDel,
      type: item.State || 0,
      create_time: item.CreateTime,
      update_time: item.CreateTime,
    });
  }
  last = 291033;
  result = await pool.request().query(`SELECT * FROM dbo.Concern_Tag_Comment WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    await TagCommentRelation.create({
      tag_id: tagOldIdHash[item.TagID],
      comment_id: item.CommentID,
      is_deleted: !!item.ISDel,
      create_time: item.CreateTime,
      update_time: item.CreateTime,
    });
  }
}

async function dealUser(pool) {
  console.log('------- dealUser --------');
  await User.sync();
  await UserAuthorRelation.sync();
  let last = 2018000000043080;
  let result = await pool.request().query(`SELECT * FROM dbo.Users_Info WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    if(!item.User_NickName || item.User_Pwd === '2') {
      continue;
    }
    await User.create({
      id: item.ID,
      author_id: item.CurrentAuthorID || 0,
      is_deleted : item.ISDel ? 0 : 1,
      state: 0,
      reg_state: item.User_Reg_Stat || 0,
      nickname: item.User_NickName || '',
      sex: item.User_Sex || 0,
      head_url: item.User_Head_Url || '',
      sign: item.Sign || '',
      password: item.User_Pwd || '',
      coins: 0,
      create_time: item.CreateTime,
      update_time: item.CreateTime,
    });
  }
  last = 73;
  result = await pool.request().query(`SELECT * FROM dbo.Concern_Users_Author WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    await UserAuthorRelation.create({
      user_id: item.UID,
      author_id: item.AuthroID,
      type: item.UserAuthorType,
      is_deleted: !!item.ISDel,
      settle: item.UserAuthorState,
      create_time: item.CreateTime,
      update_time: item.CreateTime,
    });
  }
}

async function dealWork(pool) {
  console.log('------- dealWork --------');
  await Work.sync();
  await WorkAudio.sync();
  await WorkVideo.sync();
  await WorkImage.sync();
  await WorkText.sync();
  await WorkType.sync();
  await WorkNum.sync();
  let last = 46;
  let result = await pool.request().query(`SELECT * FROM dbo.Enum_WorkItemType WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    await WorkType.create({
      name: item.ItemTypeName,
      is_deleted: item.ISDel,
      update_time: item.CreateTime,
    });
  }
  last = 2016000000008375;
  result = await pool.request().query(`SELECT * FROM dbo.Works_Items WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    await Work.create({
      id: item.ID,
      title: item.ItemsName || '',
      class: item.BigType,
      type: item.ItemType,
      is_deleted: !!item.ISDel,
      create_time: item.CreateTime,
      update_time: item.CreateTime,
    });
    await WorkNum.create({
      work_id: item.ID,
      type: 0,
      num: 0,
      update_time: item.CreateTime,
    });
    if(item.BigType === 2) {
      await WorkAudio.create({
        id: item.ID,
        time: 0,
        cover: '',
        url: item.FileUrl || '',
        lrc: '',
      });
    }
    else if(item.BigType === 1) {
      await WorkVideo.create({
        id: item.ID,
        width: 0,
        height: 0,
        time: 0,
        cover: '',
        url: item.FileUrl || '',
      });
    }
    else if(item.BigType === 3) {
      await WorkImage.create({
        id: item.ID,
        width: 0,
        height: 0,
        time: 0,
        url: item.FileUrl || '',
      });
    }
    else if(item.BigType === 4) {
      await WorkText.create({
        id: item.ID,
        content: '',
      });
    }
  }
  last = 2016000000008375;
  result = await pool.request().query(`SELECT * FROM dbo.Works_Items_Audio WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    await WorkAudio.update({
      cover: item.AudioPic || '',
      lrc: item.lrc || '',
    }, {
      where: {
        id: item.ItemsID,
      },
    });
  }
  last = 2016000000008355;
  result = await pool.request().query(`SELECT * FROM dbo.Works_Items_Video WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    await WorkVideo.update({
      cover: item.CoverPic || '',
      width: item.Width || 0,
      height: item.Height || 0,
    }, {
      where: {
        id: item.ItemsID,
      },
    });
  }
  last = 2016000000008310;
  result = await pool.request().query(`SELECT * FROM dbo.Works_Items_Pic WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    await WorkImage.update({
      width: item.Width || 0,
      height: item.Height || 0,
    }, {
      where: {
        id: item.ItemsID,
      },
    });
  }
  last = 2016000000008366;
  result = await pool.request().query(`SELECT * FROM dbo.Works_Items_Text WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    await WorkText.update({
      content: item.textContent,
    }, {
      where: {
        id: item.ItemsID,
      },
    });
  }
}

async function dealWorks(pool) {
  console.log('------- dealWorks --------');
  await WorksType.sync();
  await Works.sync();
  await WorksNum.sync();
  await MusicAlbum.sync();
  await ImageAlbum.sync();
  await WorksTimeline.sync();
  let last = 36;
  let result = await pool.request().query(`SELECT * FROM dbo.Enum_WorkType WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    await WorksType.create({
      id: item.ID,
      is_deleted: false,
      name: item.TypeName,
      update_time: item.CreateTime,
    });
  }
  last = 2015000000003582;
  result = await pool.request().query(`SELECT * FROM dbo.Works_Info WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    if(['5', '6', '18'].indexOf(item.WorksType) > -1) {
      await MusicAlbum.create({
        id: item.ID.replace(/^2015/, '2014'),
        title: item.Title || '',
        sub_title: item.sub_Title || '',
        describe: item.Describe || '',
        type: item.WorksType,
        is_authorize: true,
        is_deleted: !!item.ISDel,
        state: Math.max(item.WorkState - 1, 0),
        cover: item.cover_Pic || '',
        create_time: item.CreateTime,
        update_time: item.CreateTime,
      });
    }
    else if(['11', '12'].indexOf(item.WorksType) > -1) {
      await ImageAlbum.create({
        id: item.ID.replace(/^2015/, '2013'),
        title: item.Title || '',
        sub_title: item.sub_Title || '',
        describe: item.Describe || '',
        type: item.WorksType,
        is_authorize: true,
        is_deleted: !!item.ISDel,
        state: Math.max(item.WorkState - 1, 0),
        cover: item.cover_Pic || '',
        create_time: item.CreateTime,
        update_time: item.CreateTime,
      });
    }
    else {
      await Works.create({
        id: item.ID,
        title: item.Title || '',
        sub_title: item.sub_Title || '',
        describe: item.Describe || '',
        type: item.WorksType,
        is_authorize: true,
        is_deleted: !!item.ISDel,
        state: Math.max(item.WorkState - 1, 0),
        cover: item.cover_Pic || '',
        create_time: item.CreateTime,
        update_time: item.CreateTime,
      });
    }
    await WorksNum.create({
      works_id: item.ID,
      type: 0,
      num: 0,
      update_time: item.CreateTime,
    });
    await WorksNum.create({
      works_id: item.ID,
      type: 1,
      num: item.Popular,
      update_time: item.CreateTime,
    });
  }
  last = 71;
  result = await pool.request().query(`SELECT * FROM dbo.Works_TimeLine WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    await WorksTimeline.create({
      works_id: item.WorksID,
      work_id: item.WorkItemsID || 0,
      date: item.LinDate,
      describe: item.Describe || '',
      is_deleted: item.ISDel,
      create_time: item.CreateTime,
      update_time: item.CreateTime,
    });
  }
}

async function dealWorksWork(pool) {
  console.log('------- dealWorksWork --------');
  await WorksWorkRelation.sync();
  await MusicAlbumWorkRelation.sync();
  await ImageAlbumWorkRelation.sync();
  let last = 1685;
  let result = await pool.request().query(`SELECT * FROM dbo.Concern_Works_WorksItems WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    await WorksWorkRelation.create({
      works_id: item.WorksID,
      work_id: item.WorkItemsID,
      is_deleted: item.ISDel,
      weight: item.sort || 0,
      tips: item.Describe || '',
      create_time: item.CreateTime,
      update_time: item.CreateTime,
    });
    let works = await Works.findOne({
      attributes: ['type'],
      where: {
        id: item.WorksID,
      },
    });
    if(works) {
      let type = works.type;
      if([5, 6, 18].indexOf(type) > -1) {
        await MusicAlbumWorkRelation.create({
          album_id: item.WorksID.replace(/^2015/, '2014'),
          works_id: 0,
          work_id: item.WorkItemsID,
          is_deleted: item.ISDel,
          weight: item.sort || 0,
          describe: item.Describe || '',
          create_time: item.CreateTime,
          update_time: item.CreateTime,
        });
      }
      else if([11, 12].indexOf(type) > -1) {
        await ImageAlbumWorkRelation.create({
          album_id: item.WorksID.replace(/^2015/, '2013'),
          works_id: 0,
          work_id: item.WorkItemsID,
          is_deleted: item.ISDel,
          weight: item.sort || 0,
          describe: item.Describe || '',
          create_time: item.CreateTime,
          update_time: item.CreateTime,
        });
      }
    }
  }
}

async function dealComment(pool) {
  console.log('------- dealComment --------');
  await AuthorCommentRelation.sync();
  await WorksCommentRelation.sync();
  await CircleCommentRelation.sync();
  await Comment.sync();
  await CommentNum.sync();
  let last = 440041;
  let result = await pool.request().query(`SELECT * FROM dbo.Users_Comment WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    // 作者根留言，老数据parent_id有误，重新处理
    if(item.RootID === -1) {
      await Comment.create({
        id: item.ID,
        user_id: item.UID,
        author_id: item.CurrentAuthorID || 0,
        is_author: !!item.CurrentAuthorID,
        content: item.Content,
        is_deleted: !!item.ISDel,
        review: item.suggestion === 'pass' ? 3 : 0,
        state: 0,
        parent_id: item.ParentID,
        root_id: item.ParentID,
        create_time: item.CreateTime,
        update_time: item.CreateTime,
      });
    }
    // 作者主页虚拟留言
    else if(item.RootID === -2) {
      await AuthorCommentRelation.create({
        author_id: item.CurrentAuthorID,
        comment_id: item.ID,
      });
      await Comment.create({
        id: item.ID,
        user_id: 0,
        author_id: 0,
        is_author: false,
        content: item.CurrentAuthorID,
        review: 3,
        state: 0,
        parent_id: 0,
        root_id: 0,
        create_time: item.CreateTime,
        update_time: item.CreateTime,
      });
    }
    // 画圈贴
    else if(item.RootID === -3) {
      await Comment.create({
        id: item.ID,
        user_id: item.UID,
        author_id: item.CurrentAuthorID || 0,
        is_author: !!item.CurrentAuthorID,
        content: item.Content,
        is_deleted: !!item.ISDel,
        review: item.suggestion === 'pass' ? 3 : 0,
        state: 0,
        parent_id: 0,
        root_id: 0,
        create_time: item.CreateTime,
        update_time: item.CreateTime,
      });
      let tagComment = await TagCommentRelation.findAll({
        attributes: ['tag_id'],
        where: {
          comment_id: item.ID,
        },
      });
      let circleIdHash = {};
      if(tagComment && tagComment.length) {
        let ids = tagComment.map(function(item) {
          return item.dataValues.tag_id;
        });
        let circleTag = await CircleTagRelation.findAll({
          attributes: ['circle_id'],
          where: {
            tag_id: ids,
          },
        });
        if(circleTag && circleTag.length) {
          ids = [];
          let hash = {};
          circleTag.forEach(function(item) {
            let id = item.dataValues.circle_id;
            if(!hash[id]) {
              hash[id] = true;
              ids.push(id);
            }
          });
          for(let j = 0; j < ids.length; j++) {
            let id = ids[j];
            circleIdHash[id] = true;
            await CircleCommentRelation.create({
              circle_id: id,
              comment_id: item.ID,
              type: 1,
              is_deleted: !!item.ISDel,
              create_time: item.CreateTime,
              update_time: item.CreateTime,
            });
          }
        }
      }
      if(item.CirclingIDList) {
        let list = item.CirclingIDList.split(',');
        for(let j = 0; j < list.length; j++) {
          if(circleIdHash[list[j]]) {
            await CircleCommentRelation.update({
              type: 0,
            }, {
              where: {
                circle_id: circleIdHash[list[j]],
                comment_id: item.ID,
              },
            });
          }
          else {
            await CircleCommentRelation.create({
              circle_id: list[j],
              comment_id: item.ID,
              type: 0,
              is_deleted: !!item.ISDel,
              create_time: item.CreateTime,
              update_time: item.CreateTime,
            });
          }
        }
      }
    }
    // 作品主页虚拟留言
    else if(item.RootID === -4) {
      await WorksCommentRelation.create({
        works_id: item.Content,
        comment_id: item.ID,
      });
      await Comment.create({
        id: item.ID,
        user_id: 0,
        author_id: 0,
        is_author: false,
        content: item.Content,
        review: 3,
        state: 0,
        parent_id: 0,
        root_id: 0,
        create_time: item.CreateTime,
        update_time: item.CreateTime,
      });
    }
    // 普通回复
    else {
      await Comment.create({
        id: item.ID,
        user_id: item.UID,
        author_id: item.CurrentAuthorID || 0,
        is_author: !!item.CurrentAuthorID,
        content: item.Content,
        is_deleted: !!item.ISDel,
        review: item.suggestion === 'pass' ? 3 : 0,
        state: 0,
        parent_id: item.ParentID,
        root_id: item.RootID,
        create_time: item.CreateTime,
        update_time: item.CreateTime,
      });
    }
  }
}

async function dealWorksComment() {
  let last = 631;
  let sql = `SELECT
    works_id,
    comment_id
    FROM works_comment_relation
    WHERE id>${last}`;
  let res = await sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT });
  for(let i = 0, len = res.length; i < len; i++) {
    let item = res[i];
    let sql2 = `SELECT id, parent_id, root_id FROM comment
      WHERE root_id=${item.comment_id}`;
    let res2 = await sequelize.query(sql2, { type: Sequelize.QueryTypes.SELECT });
    if(res2.length) {
      for(let j = 0; j < res2.length; j++) {
        let item2 = res2[j];
        let sql3 = `UPDATE comment SET root_id=${item2.root_id}
        WHERE root_id=${item2.id} AND root_id=parent_id`;
        await sequelize.query(sql3, { type: Sequelize.QueryTypes.UPDATE });
      }
    }
  }
}
