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
  timezone: '+08:00',
  // logging: null,
});
const sequelizeMall = new Sequelize('mall', 'root', '87351984@', {
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
  timezone: '+08:00',
  // logging: null,
});
const sequelizeRecommend = new Sequelize('recommend', 'root', '87351984@', {
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
  timezone: '+08:00',
  // logging: null,
});
const sequelizeStats = new Sequelize('stats', 'root', '87351984@', {
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
  timezone: '+08:00',
  // logging: null,
});

const Author = require('./app/model/author')({ sequelizeCircling: sequelize, Sequelize });
const AuthorMainWorks = require('./app/model/authorMainWorks')({ sequelizeCircling: sequelize, Sequelize });
const AuthorAlias = require('./app/model/authorAlias')({ sequelizeCircling: sequelize, Sequelize });
const AuthorOutside = require('./app/model/authorOutside')({ sequelizeCircling: sequelize, Sequelize });
const Profession = require('./app/model/profession')({ sequelizeCircling: sequelize, Sequelize });
// const WorksAuthorProfessionRelation = require('./app/model/worksAuthorProfessionRelation')({ sequelizeCircling: sequelize, Sequelize });
const CircleType = require('./app/model/circleType')({ sequelizeCircling: sequelize, Sequelize });
const Circle = require('./app/model/circle')({ sequelizeCircling: sequelize, Sequelize });
const CircleTop = require('./app/model/circleTop')({ sequelizeCircling: sequelize, Sequelize });
const Tag = require('./app/model/tag')({ sequelizeCircling: sequelize, Sequelize });
const TagCommentRelation = require('./app/model/tagCommentRelation')({ sequelizeCircling: sequelize, Sequelize });
const CircleTagRelation = require('./app/model/circleTagRelation')({ sequelizeCircling: sequelize, Sequelize });
const User = require('./app/model/user')({ sequelizeCircling: sequelize, Sequelize });
const UserAuthorRelation = require('./app/model/userAuthorRelation')({ sequelizeCircling: sequelize, Sequelize });
const UserPersonRelation = require('./app/model/userPersonRelation')({ sequelizeCircling: sequelize, Sequelize });
const Work = require('./app/model/work')({ sequelizeCircling: sequelize, Sequelize });
const Audio = require('./app/model/Audio')({ sequelizeCircling: sequelize, Sequelize });
const Video = require('./app/model/Video')({ sequelizeCircling: sequelize, Sequelize });
const Image = require('./app/model/Image')({ sequelizeCircling: sequelize, Sequelize });
const Text = require('./app/model/Text')({ sequelizeCircling: sequelize, Sequelize });
const WorkType = require('./app/model/workType')({ sequelizeCircling: sequelize, Sequelize });
const WorkNum = require('./app/model/workNum')({ sequelizeCircling: sequelize, Sequelize });
const WorksType = require('./app/model/worksType')({ sequelizeCircling: sequelize, Sequelize });
const Works = require('./app/model/works')({ sequelizeCircling: sequelize, Sequelize });
const WorksTypeProfessionSort = require('./app/model/worksTypeProfessionSort')({ sequelizeCircling: sequelize, Sequelize });
const MusicAlbum = require('./app/model/musicAlbum')({ sequelizeCircling: sequelize, Sequelize });
const MusicAlbumAuthorRelation = require('./app/model/MusicAlbumAuthorRelation')({ sequelizeCircling: sequelize, Sequelize });
const ImageAlbumAuthorRelation = require('./app/model/ImageAlbumAuthorRelation')({ sequelizeCircling: sequelize, Sequelize });
const ImageAlbum = require('./app/model/imageAlbum')({ sequelizeCircling: sequelize, Sequelize });
const WorksNum = require('./app/model/worksNum')({ sequelizeCircling: sequelize, Sequelize });
const WorksTimeline = require('./app/model/worksTimeline')({ sequelizeCircling: sequelize, Sequelize });
const WorksWorkRelation = require('./app/model/worksWorkRelation')({ sequelizeCircling: sequelize, Sequelize });
const MusicAlbumWorkRelation = require('./app/model/musicAlbumWorkRelation')({ sequelizeCircling: sequelize, Sequelize });
const ImageAlbumWorkRelation = require('./app/model/imageAlbumWorkRelation')({ sequelizeCircling: sequelize, Sequelize });
const Comment = require('./app/model/comment')({ sequelizeCircling: sequelize, Sequelize });
const CommentMedia = require('./app/model/commentMedia')({ sequelizeCircling: sequelize, Sequelize });
const CommentWork = require('./app/model/commentWork')({ sequelizeCircling: sequelize, Sequelize });
const AuthorCommentRelation = require('./app/model/authorCommentRelation')({ sequelizeCircling: sequelize, Sequelize });
const WorksCommentRelation = require('./app/model/worksCommentRelation')({ sequelizeCircling: sequelize, Sequelize });
const CircleCommentRelation = require('./app/model/circleCommentRelation')({ sequelizeCircling: sequelize, Sequelize });
const UserWorkRelation = require('./app/model/userWorkRelation')({ sequelizeCircling: sequelize, Sequelize });
const UserCommentRelation = require('./app/model/userCommentRelation')({ sequelizeCircling: sequelize, Sequelize });
const UserCircleRelation = require('./app/model/userCircleRelation')({ sequelizeCircling: sequelize, Sequelize });
const UserAccount = require('./app/model/userAccount')({ sequelizeCircling: sequelize, Sequelize });
const UserOauth = require('./app/model/userOauth')({ sequelizeCircling: sequelize, Sequelize });
const Message = require('./app/model/message')({ sequelizeCircling: sequelize, Sequelize });
const WorkAuthorRelation = require('./app/model/workAuthorRelation')({ sequelizeCircling: sequelize, Sequelize });
const WorksAuthorRelation = require('./app/model/worksAuthorRelation')({ sequelizeCircling: sequelize, Sequelize });
const WorkTypeProfessionSort = require('./app/model/workTypeProfessionSort')({ sequelizeCircling: sequelize, Sequelize });
const AuthorDynamic = require('./app/model/authorDynamic')({ sequelizeCircling: sequelize, Sequelize });
const UserAddress = require('./app/model/userAddress')({ sequelizeCircling: sequelize, Sequelize });
const CommentPoint = require('./app/model/commentPoint')({ sequelizeCircling: sequelize, Sequelize });

const Product = require('./app/model/product')({ sequelizeMall: sequelizeMall, Sequelize });
const Express = require('./app/model/express')({ sequelizeMall: sequelizeMall, Sequelize });
const Prize = require('./app/model/prize')({ sequelizeMall: sequelizeMall, Sequelize });
const PrizeExpressRelation = require('./app/model/prizeExpressRelation')({ sequelizeMall: sequelizeMall, Sequelize });

const findList = require('./app/model/findList')({ sequelizeRecommend: sequelizeRecommend, Sequelize });
const findTag = require('./app/model/findTag')({ sequelizeRecommend: sequelizeRecommend, Sequelize });
const findKind = require('./app/model/findKind')({ sequelizeRecommend: sequelizeRecommend, Sequelize });
const findBanner = require('./app/model/findBanner')({ sequelizeRecommend: sequelizeRecommend, Sequelize });
const banner = require('./app/model/banner')({ sequelizeRecommend: sequelizeRecommend, Sequelize });

const userReport = require('./app/model/userReport')({ sequelizeStats: sequelizeStats, Sequelize });
const userVisit = require('./app/model/userVisit')({ sequelizeStats: sequelizeStats, Sequelize });

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
    await findList.sync();
    await findTag.sync();
    await findKind.sync();
    await findBanner.sync();
    await banner.sync();

    await userReport.sync();
    await userVisit.sync();

    await dealAuthor(pool);
    await dealAuthorMainWorks(pool);
    await dealWork(pool);
    await dealWorks(pool);
    await dealWorksWork(pool);
    await dealWorkAuthorProfession(pool);
    await dealCircle(pool);
    await dealUser(pool);
    await dealUserPlus(pool);
    await dealUserCircle(pool);
    await dealComment(pool);
    // await dealCircleComment(pool);
    await dealUserWork(pool);
    await dealUserPost(pool);
    await dealCommentMedia(pool);
    await dealAccount(pool);
    await dealMessage(pool);
    await dealMall(pool);
    // await dealAuthorDynamic(pool);
    // await modifyPostComment();

    // await temp(pool);
    // await modifyWorksComment();
    // await modifyAuthorComment();

//     await sequelize.query(`UPDATE tag_comment_relation set is_comment_delete=TRUE
// WHERE comment_id IN (SELECT id as comment_id FROM comment WHERE is_delete=true);`, { type: Sequelize.QueryTypes.UPDATE });
//     await sequelize.query(`UPDATE user_circle_relation SET is_circle_delete=TRUE WHERE circle_id IN(
// SELECT id as circle_id FROM circle WHERE is_delete=TRUE);`, { type: Sequelize.QueryTypes.UPDATE });

    console.log('======== END ========');
  } catch (err) {
    console.error(err);
  }
})();

async function dealAuthor(pool) {
  console.log('------- dealAuthor --------');
  await Author.sync();
  await AuthorAlias.sync();
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
        is_settled: false,
        create_time: item.CreateTime,
        update_time: item.CreateTime,
      });
    }
    if(item.BaiduUrl) {
      await AuthorOutside.create({
        author_id: item.ID,
        type: 1,
        is_delete: false,
        url: item.BaiduUrl,
        create_time: item.CreateTime,
        update_time: item.CreateTime,
      });
    }
    if(item.BilibiliUrl) {
      await AuthorOutside.create({
        author_id: item.ID,
        type: 2,
        is_delete: false,
        url: item.BilibiliUrl,
        create_time: item.CreateTime,
        update_time: item.CreateTime,
      });
    }
    if(item.FiveSingUrl) {
      await AuthorOutside.create({
        author_id: item.ID,
        type: 3,
        is_delete: false,
        url: item.FiveSingUrl,
        create_time: item.CreateTime,
        update_time: item.CreateTime,
      });
    }
    if(item.HuabanUrl) {
      await AuthorOutside.create({
        author_id: item.ID,
        type: 4,
        is_delete: false,
        url: item.HuabanUrl,
        create_time: item.CreateTime,
        update_time: item.CreateTime,
      });
    }
    if(item.LofterUrl) {
      await AuthorOutside.create({
        author_id: item.ID,
        type: 5,
        is_delete: false,
        url: item.LofterUrl,
        create_time: item.CreateTime,
        update_time: item.CreateTime,
      });
    }
    if(item.PCOUrl) {
      await AuthorOutside.create({
        author_id: item.ID,
        type: 6,
        is_delete: false,
        url: item.PCOUrl,
        create_time: item.CreateTime,
        update_time: item.CreateTime,
      });
    }
    if(item.WangyiUrl) {
      await AuthorOutside.create({
        author_id: item.ID,
        type: 7,
        is_delete: false,
        url: item.WangyiUrl,
        create_time: item.CreateTime,
        update_time: item.CreateTime,
      });
    }
    if(item.WeiboUrl) {
      await AuthorOutside.create({
        author_id: item.ID,
        type: 8,
        is_delete: false,
        url: item.WeiboUrl,
        create_time: item.CreateTime,
        update_time: item.CreateTime,
      });
    }
    if(item.ZcoolUrl) {
      await AuthorOutside.create({
        author_id: item.ID,
        type: 9,
        is_delete: false,
        url: item.ZcoolUrl,
        create_time: item.CreateTime,
        update_time: item.CreateTime,
      });
    }
  }
}

async function dealAuthorMainWorks(pool) {
  console.log('------- dealAuthorMainWorks --------');
  await AuthorMainWorks.sync();
  let last = 296;
  let result = await pool.request().query(`SELECT * FROM dbo.Concern_Authors_WorksList WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    await AuthorMainWorks.create({
      author_id: item.AuthorID,
      works_id: item.WorksID,
      weight: item.sort,
      is_delete: false,
      create_time: item.CreateTime,
      update_time: item.CreateTime,
    });
  }
}

async function dealWork(pool) {
  console.log('------- dealWork --------');
  await Work.sync();
  await WorkType.sync();
  await Audio.sync();
  await Video.sync();
  await Image.sync();
  await Text.sync();
  await WorkNum.sync();
  let last = 46;
  // last = 0;
  let result = await pool.request().query(`SELECT * FROM dbo.Enum_WorkItemType WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    await WorkType.create({
      id: item.ID,
      name: item.ItemTypeName,
      create_time: item.CreateTime,
      update_time: item.CreateTime,
    });
  }
  last = 2016000000008449;
  // last = 0;
  result = await pool.request().query(`SELECT * FROM dbo.Works_Items WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    await Work.create({
      id: item.ID,
      kind: item.BigType,
    });
    let workId = item.ID;
    if(item.BigType === 1) {
      workId = workId.toString().replace(/^2016/, 2020);
    }
    else if(item.BigType === 3) {
      workId = workId.toString().replace(/^2016/, 2021);
    }
    else if(item.BigType === 4) {
      workId = workId.toString().replace(/^2016/, 2022);
    }
    await WorkNum.create({
      work_id: workId,
      type: 1,
      num: item.PlayCountRaw || 0,
      update_time: item.CreateTime,
    });
    if(item.BigType === 2) {
      await Audio.create({
        id: workId,
        work_id: item.ID,
        type: item.ItemType,
        title: item.ItemsName || '',
        is_delete: !!item.ISDel,
        create_time: item.CreateTime,
        update_time: item.CreateTime,
        duration: 0,
        cover: '',
        url: item.FileUrl || '',
        lrc: '',
      });
    }
    else if(item.BigType === 1) {
      await Video.create({
        id: workId,
        work_id: item.ID,
        type: item.ItemType,
        title: item.ItemsName || '',
        is_delete: !!item.ISDel,
        create_time: item.CreateTime,
        update_time: item.CreateTime,
        width: 0,
        height: 0,
        duration: 0,
        cover: '',
        url: item.FileUrl || '',
      });
    }
    else if(item.BigType === 3) {
      await Image.create({
        id: workId,
        work_id: item.ID,
        type: item.ItemType,
        title: item.ItemsName || '',
        is_delete: !!item.ISDel,
        create_time: item.CreateTime,
        update_time: item.CreateTime,
        width: 0,
        height: 0,
        time: 0,
        url: item.FileUrl || '',
      });
    }
    else if(item.BigType === 4) {
      await Text.create({
        id: workId,
        work_id: item.ID,
        type: item.ItemType,
        title: item.ItemsName || '',
        is_delete: !!item.ISDel,
        create_time: item.CreateTime,
        update_time: item.CreateTime,
        content: '',
      });
    }
  }
  last = 2016000000008375;
  // last = 0;
  result = await pool.request().query(`SELECT * FROM dbo.Works_Items_Audio WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    await Audio.update({
      cover: item.AudioPic || '',
      lrc: item.lrc || '',
    }, {
      where: {
        id: item.ItemsID,
      },
    });
  }
  last = 2016000000008355;
  // last = 0;
  result = await pool.request().query(`SELECT * FROM dbo.Works_Items_Video WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    await Video.update({
      cover: item.CoverPic || '',
      width: item.Width || 0,
      height: item.Height || 0,
    }, {
      where: {
        work_id: item.ItemsID,
      },
    });
  }
  last = 2016000000008310;
  // last = 0;
  result = await pool.request().query(`SELECT * FROM dbo.Works_Items_Pic WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    await Image.update({
      width: item.Width || 0,
      height: item.Height || 0,
    }, {
      where: {
        work_id: item.ItemsID,
      },
    });
  }
  last = 2016000000008366;
  // last = 0;
  result = await pool.request().query(`SELECT * FROM dbo.Works_Items_Text WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    await Text.update({
      content: item.textContent,
    }, {
      where: {
        work_id: item.ItemsID,
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
  // last = 0;
  let result = await pool.request().query(`SELECT * FROM dbo.Enum_WorkType WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    await WorksType.create({
      id: item.ID,
      name: item.TypeName,
    });
  }
  last = 2015000000003600;
  // last = 0;
  result = await pool.request().query(`SELECT * FROM dbo.Works_Info WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    let worksId = item.ID;
    if(['5', '6', '18'].indexOf(item.WorksType) > -1) {
      worksId = worksId.replace(/^2015/, '2014');
      await MusicAlbum.create({
        id: worksId,
        title: item.Title || '',
        sub_title: item.sub_Title || '',
        describe: item.Describe || '',
        type: item.WorksType,
        is_authorize: true,
        is_delete: !!item.ISDel,
        state: Math.max(item.WorkState, 1),
        cover: item.cover_Pic || '',
        create_time: item.CreateTime,
        update_time: item.CreateTime,
      });
    }
    else if(['11', '12'].indexOf(item.WorksType) > -1) {
      worksId = worksId.replace(/^2015/, '2013');
      await ImageAlbum.create({
        id: worksId,
        title: item.Title || '',
        sub_title: item.sub_Title || '',
        describe: item.Describe || '',
        type: item.WorksType,
        is_authorize: true,
        is_delete: !!item.ISDel,
        state: Math.max(item.WorkState, 1),
        cover: item.cover_Pic || '',
        create_time: item.CreateTime,
        update_time: item.CreateTime,
      });
    }
    else {
      await Works.create({
        id: worksId,
        title: item.Title || '',
        sub_title: item.sub_Title || '',
        describe: item.Describe || '',
        type: item.WorksType,
        is_authorize: true,
        is_delete: !!item.ISDel,
        state: Math.max(item.WorkState, 1),
        cover: item.cover_Pic || '',
        create_time: item.CreateTime,
        update_time: item.CreateTime,
      });
    }
    await WorksNum.create({
      works_id: worksId,
      type: 1,
      num: item.Popular || 0,
      update_time: item.CreateTime,
    });
  }
  last = 71;
  // last = 0;
  result = await pool.request().query(`SELECT * FROM dbo.Works_TimeLine WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    let work = await Work.findOne({
      attributes: ['id'],
      where: {
        work_id: item.WorkItemsID,
      },
    });
    if(work) {
      await WorksTimeline.create({
        works_id: item.WorksID,
        work_id: work.id,
        date: item.LinDate,
        describe: item.Describe || '',
        is_delete: item.ISDel,
        create_time: item.CreateTime,
        update_time: item.CreateTime,
      });
    }
  }
}

async function dealWorksWork(pool) {
  console.log('------- dealWorksWork --------');
  await WorksWorkRelation.sync();
  await MusicAlbumWorkRelation.sync();
  await ImageAlbumWorkRelation.sync();
  await WorksTypeProfessionSort.sync();
  await WorkTypeProfessionSort.sync();
  let last = 1699;
  // last = 0;
  let result = await pool.request().query(`SELECT * FROM dbo.Concern_Works_WorksItems WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    let [works, musicAlbum, imageAlbum, work] = await Promise.all([
      Works.findOne({
        attributes: ['type'],
        where: {
          id: item.WorksID,
        },
      }),
      MusicAlbum.findOne({
        attributes: ['id', 'type'],
        where: {
          id: (item.WorksID + '').replace(/^2015/, '2014'),
        },
      }),
      ImageAlbum.findOne({
        attributes: ['id', 'type'],
        where: {
          id: (item.WorksID + '').replace(/^2015/, '2013'),
        },
      }),
      Work.findOne({
        attributes: ['id', 'kind'],
        where: {
          id: item.WorkItemsID,
        },
      })
    ]);
    let work_id;
    if(work.kind === 1) {
      work_id = work.id.toString().replace(/^2016/, 2020);
    }
    else if(work.kind === 2) {
      work_id = work.id;
    }
    else if(work.kind === 3) {
      work_id = work.id.toString().replace(/^2016/, 2021);
    }
    else if(work.kind === 4) {
      work_id = work.id.toString().replace(/^2016/, 2022);
    }
    if(musicAlbum) {
      await MusicAlbumWorkRelation.create({
        album_id: musicAlbum.id,
        work_id,
        works_id: item.WorksID,
        kind: work.kind,
        is_delete: !!item.ISDel,
        weight: item.sort || 0,
        create_time: item.CreateTime,
        update_time: item.CreateTime,
      });
    }
    else if(imageAlbum) {
      await ImageAlbumWorkRelation.create({
        album_id: imageAlbum.id,
        work_id,
        works_id: 0,
        kind: work.kind,
        is_delete: !!item.ISDel,
        weight: item.sort || 0,
        create_time: item.CreateTime,
        update_time: item.CreateTime,
      });
    }
    else if(works) {
      await WorksWorkRelation.create({
        works_id: item.WorksID,
        work_id,
        kind: work.kind,
        is_delete: !!item.ISDel,
        weight: item.sort || 0,
        tag: item.Describe || '',
        create_time: item.CreateTime,
        update_time: item.CreateTime,
      });
    }
  }
  return;
  result = await MusicAlbumWorkRelation.findAll({});
  for(let i = 0; i < result.length; i++) {
    let item = result[i];
    let temp = await WorksWorkRelation.findOne({
      attributes: ['works_id'],
      where: {
        work_id: item.work_id,
        kind: item.kind,
      },
    });
    if(temp) {
      await MusicAlbumWorkRelation.update({
        works_id: temp.works_id,
      }, {
        where: {
          id: item.id,
        },
      });
    }
  }
}

async function dealWorkAuthorProfession(pool) {
  console.log('------- dealWorkAuthorProfession --------');
  await Profession.sync();
  await WorkAuthorRelation.sync();
  await WorksAuthorRelation.sync();
  // await WorksAuthorProfessionRelation.sync();
  await MusicAlbumAuthorRelation.sync();
  await ImageAlbumAuthorRelation.sync();
  let last = 61;
  // last = 0;
  let result = await pool.request().query(`SELECT * FROM dbo.Enum_AuthorType WHERE ID>${last};`);
  let hash = {};
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    await Profession.create({
      id: item.ID,
      name: item.AuthorTypeName,
      create_time: item.CreateTime,
    });
  }
  last = 5464;
  // last = 0;
  result = await pool.request().query(`SELECT * FROM dbo.Concern_Works_Items_Author WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    let key = item.WorksItemID+','+item.AuthorID+','+item.Enum_AuthorTypeID;
    if(hash[key]) {
      continue;
    }
    hash[key] = true;
    let work = await Work.findOne({
      attributes: ['id', 'kind'],
      where: {
        id: item.WorksItemID,
      },
    });
    if(!work) {
      continue;
    }
    let work_id;
    if(work.kind === 1) {
      work_id = work.id.toString().replace(/^2016/,  2020);
    }
    else if(work.kind === 2) {
      work_id = work.id;
    }
    else if(work.kind === 3) {
      work_id = work.id.toString().replace(/^2016/,  2021);
    }
    else if(work.kind === 4) {
      work_id = work.id.toString().replace(/^2016/,  2022);
    }
    await WorkAuthorRelation.create({
      work_id,
      author_id: item.AuthorID,
      kind: work.kind,
      profession_id: item.Enum_AuthorTypeID,
      create_time: item.CreateTime,
      update_time: item.CreateTime,
    });
    // let worksWork = await WorksWorkRelation.findOne({
    //   attributes: ['works_id'],
    //   where: {
    //     work_id,
    //     kind: work.kind,
    //   },
    // });
    // if(!worksWork) {
    //   let imageWork = await ImageAlbumWorkRelation.findOne({
    //     attributes: ['album_id'],
    //     where: {
    //       work_id,
    //       kind: work.kind,
    //     },
    //   });
    //   if(!imageWork) {
    //     continue;
    //   }
    //   await ImageAlbumAuthorRelation.create({
    //     album_id: imageWork.album_id,
    //     work_id,
    //     kind: work.kind,
    //     author_id: item.AuthorID,
    //     profession_id: item.Enum_AuthorTypeID,
    //     is_delete: false,
    //     create_time: item.CreateTime,
    //     update_time: item.CreateTime,
    //   });
    //   continue;
    // }
    // await WorksAuthorProfessionRelation.create({
    //   works_id: worksWork.works_id,
    //   work_id,
    //   kind: work.kind,
    //   author_id: item.AuthorID,
    //   profession_id: item.Enum_AuthorTypeID,
    //   is_delete: false,
    //   create_time: item.CreateTime,
    //   update_time: item.CreateTime,
    // });
  }
  hash = {};
  last = 4131;
  // last = 0;
  let special = {
    51: true,
    52: true,
    53: true,
    54: true,
    57: true,
    59: true,
  };
  result = await pool.request().query(`SELECT * FROM dbo.Concern_Works_Author WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    let key = item.WorksID+','+item.AuthorID+','+item.Enum_AuthorTypeID;
    if(hash[key]) {
      continue;
    }
    hash[key] = true;
    if(special[item.Enum_AuthorTypeID]) {
      let music = await MusicAlbum.findOne({
        attributes: ['id'],
        where: {
          id: (item.WorksID+'').replace(/^2015/, 2014),
        },
      });
      if(music) {
        await MusicAlbumAuthorRelation.create({
          album_id: music.id,
          author_id: item.AuthorID,
          profession_id: item.Enum_AuthorTypeID,
          is_delete: false,
          create_time: item.CreateTime,
          update_time: item.CreateTime,
        });
        continue;
      }
      let image = await ImageAlbum.findOne({
        attributes: ['id'],
        where: {
          id: (item.WorksID+'').replace(/^2015/, 2013),
        },
      });
      if(image) {
        await ImageAlbumAuthorRelation.create({
          album_id: image.id,
          author_id: item.AuthorID,
          profession_id: item.Enum_AuthorTypeID,
          is_delete: false,
          create_time: item.CreateTime,
          update_time: item.CreateTime,
        });
        continue;
      }
      await WorksAuthorRelation.create({
        works_id: item.WorksID,
        author_id: item.AuthorID,
        profession_id: item.Enum_AuthorTypeID,
        is_delete: false,
        create_time: item.CreateTime,
        update_time: item.CreateTime,
      });
    }
  }
}

async function dealUserPlus(pool) {
  console.log('------- dealUserPlus --------');
  await UserAddress.sync();
  await CommentPoint.sync();
  let last = 2018000000043048;
  // last = 0;
  let result = await pool.request().query(`SELECT * FROM dbo.Users_Profile WHERE ProfileID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    await User.update({
      coins: item.CirclingCoins,
    }, {
      where: {
        id: item.ProfileID,
      },
    });
    if(item.CommentIntegral || item.Buff != 1) {
      await CommentPoint.create({
        user_id: item.ProfileID,
        point: item.CommentIntegral,
        buff: item.Buff,
      });
    }
    if(item.OrderName && item.OrderAddress && item.OrderPhone) {
      await UserAddress.create({
        user_id: item.ProfileID,
        name: item.OrderName,
        is_default: true,
        address: item.OrderAddress,
        phone: item.OrderPhone,
      });
    }
  }
}

async function dealCircle(pool) {
  console.log('------- dealCircle --------');
  await CircleType.sync();
  if(false) {
    CircleType.create({
      name: '普通',
      tag: '普通',
    });
    CircleType.create({
      name: '作者粉丝',
    });
    CircleType.create({
      name: 'IP',
    });
    CircleType.create({
      name: '作品类型',
    });
    CircleType.create({
      name: '职种',
    });
  }
  await Circle.sync();
  await CircleTop.sync();
  await Tag.sync();
  await CircleTagRelation.sync();
  await TagCommentRelation.sync();
  let last = 2019000000003990;
  // last = 0;
  let result = await pool.request().query(`SELECT * FROM dbo.Circling_Info WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    await Circle.create({
      id: item.ID,
      name: item.TagName,
      describe: item.Describe || '',
      banner: item.Banner || '',
      cover: (item.CoverPic || '').replace(/^https?:/, ''),
      type: parseInt(item.CirclingType || 0) + 1,
      is_delete: !item.IsOpen,
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
  }
  let tagOldIdHash = {};
  last = 2021000000008340;
  // last = 0;
  result = await pool.request().query(`SELECT * FROM dbo.Tag_Info WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    let res = await Tag.create({
      name: item.TagName,
      temp_id: item.ID,
      is_delete: false,
      create_time: item.CreateTime,
      update_time: item.CreateTime,
    });
    tagOldIdHash[item.ID] = res.dataValues.id;
  }
  last = 977;
  // last = 0;
  result = await pool.request().query(`SELECT * FROM dbo.Concern_Cirling_TAG WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    await CircleTagRelation.create({
      circle_id: item.CirclingID,
      tag_id: tagOldIdHash[item.TagID],
      is_delete: !!item.ISDel,
      type: (item.State || 0) + 1,
      create_time: item.CreateTime,
      update_time: item.CreateTime,
    });
  }
  last = 291033;
  // last = 0;
  result = await pool.request().query(`SELECT * FROM dbo.Concern_Tag_Comment WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    await TagCommentRelation.create({
      tag_id: tagOldIdHash[item.TagID],
      comment_id: item.CommentID,
      type: 2,
      is_delete: !!item.ISDel,
      is_comment_delete: false,
      create_time: item.CreateTime,
      update_time: item.CreateTime,
    });
  }
}

async function dealUser(pool) {
  console.log('------- dealUser --------');
  await User.sync();
  await UserAuthorRelation.sync();
  await UserPersonRelation.sync();
  let last = 2018000000043048;
  let result = await pool.request().query(`SELECT * FROM dbo.Users_Info WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    if(!item.User_NickName || item.User_Pwd === '2') {
      continue;
    }
    await User.create({
      id: item.ID,
      // author_id: item.CurrentAuthorID || 0,
      is_delete : item.ISDel ? 0 : 1,
      state: 0,
      reg_state: item.User_Reg_Stat || 0,
      nickname: item.User_NickName || '',
      sex: item.User_Sex || 0,
      head_url: item.User_Head_Url || '',
      sign: item.Sign || '',
      // password: item.User_Pwd || '',
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
      type: item.UserAuthorType + 1,
      is_delete: !!item.ISDel,
      settle: item.UserAuthorState + 1,
      create_time: item.CreateTime,
      update_time: item.CreateTime,
    });
  }
  last = 5698;
  // last = 0;
  result = await pool.request().query(`SELECT * FROM dbo.Users_Follow_User WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    await UserPersonRelation.create({
      user_id: item.UID,
      target_id: item.ToUID,
      type: 1,
      // is_delete: false,
      create_time: item.CreateTime,
      update_time: item.CreateTime,
    });
  }
  last = 31853;
  // last = 0;
  result = await pool.request().query(`SELECT * FROM dbo.Users_Follow_Author WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    await UserPersonRelation.create({
      user_id: item.UID,
      target_id: item.AuthorID,
      type: 3,
      // is_delete: false,
      create_time: item.CreateTime,
      update_time: item.CreateTime,
    });
  }
}

async function dealUserCircle(pool) {
  console.log('------- dealUserCircle --------');
  await UserCircleRelation.sync();
  let last = 131208;
  // last = 0;
  let result = await pool.request().query(`SELECT * FROM dbo.Users_Follow_Circling WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    await UserCircleRelation.create({
      user_id: item.UID,
      circle_id: item.CirclingID,
      type: item.FollowType === 3 ? 2 : 1,
      // is_delete: item.ISDel,
      is_circle_delete: false,
      create_time: item.CreateTime,
      update_time: item.CreateTime,
    });
  }
}

async function dealComment(pool) {
  console.log('------- dealComment --------');
  await AuthorCommentRelation.sync();
  await WorksCommentRelation.sync();
  await Comment.sync();
  let last = 440051;
  let hash = {};
  let result = await pool.request().query(`SELECT * FROM dbo.Users_Comment WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    // 作者根留言，老数据root_id有误，重新处理
    if(item.RootID === -1) {
      await Comment.create({
        id: item.ID,
        user_id: item.UID,
        author_id: item.CurrentAuthorID || 0,
        is_author: !!item.CurrentAuthorID,
        content: item.Content,
        is_delete: !!item.ISDel,
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
        user_id: item.UID,
        author_id: 0,
        is_author: false,
        content: item.CurrentAuthorID,
        is_delete: true,
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
        is_delete: !!item.ISDel,
        review: item.suggestion === 'pass' ? 3 : 0,
        state: 0,
        parent_id: 0,
        root_id: 0,
        create_time: item.CreateTime,
        update_time: item.CreateTime,
      });
      if(item.CirclingIDList && item.CirclingIDList.length) {
        let list = item.CirclingIDList.split(',');
        let idList = [];
        for(let j = 0; j < list.length; j++) {
          let circleId = list[j];
          let tagId = hash[circleId];
          if(tagId) {
            idList.push(tagId);
          }
          else {
            let circleTagRelation = await CircleTagRelation.findOne({
              attributes: [
                'tag_id'
              ],
              where: {
                circle_id: circleId,
              },
              raw: true,
            });
            tagId = hash[circleId] = circleTagRelation.tag_id;
            idList.push(tagId);
          }
          await TagCommentRelation.upsert({
            tag_id: tagId,
            comment_id: item.ID,
            type: 1,
            is_delete: false,
            create_time: item.CreateTime,
            update_time: item.CreateTime,
          }, {
            where: {
              comment_id: item.ID,
            },
          });
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
        user_id: item.UID,
        author_id: 0,
        is_author: false,
        content: item.Content,
        is_delete: true,
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
        is_delete: !!item.ISDel,
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

async function dealCircleComment(pool) {
  console.log('------- dealCircleComment --------');
  await CircleCommentRelation.sync();
  let res = await CircleTagRelation.findAll({
    attributes: [
      'circle_id',
      'tag_id'
    ],
  });
  let hash = {};
  res.forEach((item) => {
    hash[item.tag_id] = hash[item.tag_id] || [];
    hash[item.tag_id].push(item.circle_id);
  });
  res = await TagCommentRelation.findAll({
    attributes: [
      'tag_id',
      'comment_id',
      'is_comment_delete'
    ],
    where: {
      is_delete: false,
    },
    raw: true,
  });
  let hash2 = {};
  for(let i = 0, len = res.length; i < len; i++) {
    let item = res[i];
    let circleId = hash[item.tag_id] || [];
    for(let j = 0; j < circleId.length; j++) {
      let key = circleId[j] + '_' + item.comment_id + '_' + item.tag_id;
      if(hash2[key]) {
        continue;
      }
      hash2[key] = true;
      await CircleCommentRelation.create({
        circle_id: circleId[j],
        comment_id: item.comment_id,
        is_comment_delete: item.is_comment_delete,
        tag_id: item.tag_id,
      });
    }
  }
}

async function dealUserWork(pool) {
  console.log('------- dealUserWork --------');
  await UserWorkRelation.sync();
  let hash = {};
  let worksIdHash = {};
  let exist = {};
  let workHash = {};
  let last = 19019;
  // last = 0;
  let result = await pool.request().query(`SELECT * FROM dbo.Concern_UserCollection_WorkItems WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    let work = workHash[item.ItemsID];
    if(!work) {
      work = await Work.findOne({
        attributes: ['kind'],
        where: {
          id: item.ItemsID,
        },
        raw: true,
      });
      workHash[item.ItemsID] = work;
      switch(work.kind) {
        case 1:
          work.id = item.ItemsID.toString().replace(/^2016/, 2020);
          break;
        case 2:
          work.id = item.ItemsID;
          break;
        case 3:
          work.id = item.ItemsID.toString().replace(/^2016/, 2021);
          break;
      }
    }
    if(work.kind === 4) {
      continue;
    }
    let worksId = worksIdHash[item.ItemsID];
    if(!worksId) {
      if(work.kind === 3) {
        let rel = await ImageAlbumWorkRelation.findOne({
          attributes: ['album_id'],
          where: {
            work_id: work.id,
            kind: work.kind,
          },
        });
        if(rel) {
          worksId = worksIdHash[item.ItemsID] = rel.album_id;
        }
        else {
          worksId = worksIdHash[item.ItemsID] = 0;
          continue;
        }
      }
      else {
        let rel = await WorksWorkRelation.findOne({
          attributes: ['works_id'],
          where: {
            work_id: work.id,
            kind: work.kind,
          },
        });
        if(rel) {
          worksId = worksIdHash[item.ItemsID] = rel.works_id;
        }
        else {
          worksId = worksIdHash[item.ItemsID] = 0;
          continue;
        }
      }
    }
    if(item.UID && item.UID !== '0') {
      let key = item.UID + ',' + item.ItemsID;
      if(exist[key]) {
        continue;
      }
      exist[key] = true;
      if(worksId === 1) {
        continue;
      }
      await UserWorkRelation.create({
        user_id: item.UID,
        work_id: work.id,
        works_id: worksId,
        kind: work.kind,
        type: 2,
        // is_delete: false,
        create_time: item.CreateTime,
        // update_time: item.CreateTime,
      });
    }
    else {
      if(hash[item.CollectionID]) {
        let key = hash[item.CollectionID] + ',' + item.ItemsID;
        if(exist[key]) {
          continue;
        }
        exist[key] = true;
        await UserWorkRelation.create({
          user_id: hash[item.CollectionID],
          work_id: work.id,
          works_id: worksId,
          kind: work.kind,
          type: 2,
          // is_delete: false,
          create_time: item.CreateTime,
          // update_time: item.CreateTime,
        });
      }
      else {
        let res2 = await pool.request().query(`SELECT UID FROM dbo.Users_CollectionList WHERE ID=${item.CollectionID};`);
        if(res2.recordset.length) {
          hash[item.CollectionID] = res2.recordset[0].UID;
          let key = hash[item.CollectionID] + ',' + item.ItemsID;
          if(exist[key]) {
            continue;
          }
          exist[key] = true;
          await UserWorkRelation.create({
            user_id: hash[item.CollectionID],
            work_id: work.id,
            works_id: worksId,
            kind: work.kind,
            type: 2,
            // is_delete: false,
            create_time: item.CreateTime,
            // update_time: item.CreateTime,
          });
        }
      }
    }
  }
  hash = {};
  last = 507890;
  // last = 0;
  result = await pool.request().query(`SELECT * FROM dbo.Users_WorksItems_Behavior WHERE ID>${last} AND (BehaviorNumber=131 OR BehaviorNumber=130);`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    let key = item.UID + ',' + item.WorkitemsID;
    hash[key] = item.BehaviorNumber === 131;
    if(item.BehaviorNumber === 131) {
      hash[key] = [item.UID, item.WorkitemsID, item.CreateTime];
    }
    else {
      hash[key] = false;
    }
  }
  for(let i = 0, keys = Object.keys(hash), len = keys.length; i < len; i++) {
    let key = keys[i];
    let item = hash[key];
    if(item) {
      let uid = item[0];
      let ItemsID = item[1];
      let createTime = item[2];
      let work = workHash[ItemsID];
      if(!work) {
        work = await Work.findOne({
          attributes: ['kind'],
          where: {
            id: ItemsID,
          },
        });
        work = work.toJSON();
        workHash[ItemsID] = work;
        switch(work.kind) {
          case 1:
            workHash[ItemsID].id = ItemsID.toString().replace(/^2016/, 2020);
            break;
          case 2:
            workHash[ItemsID].id = ItemsID;
            break;
          case 3:
            workHash[ItemsID].id = ItemsID.toString().replace(/^2016/, 2021);
            break;
        }
      }
      if(work.kind === 4) {
        continue;
      }
      let worksId = worksIdHash[ItemsID];
      if(!worksId) {
        if(work.kind === 3) {
          let rel = await ImageAlbumWorkRelation.findOne({
            attributes: ['album_id'],
            where: {
              work_id: work.id,
              kind: work.kind,
            },
          });
          if(rel) {
            worksId = worksIdHash[item.ItemsID] = rel.album_id;
          }
          else {
            worksId = worksIdHash[item.ItemsID] = 0;
            continue;
          }
        }
        else {
          let rel = await WorksWorkRelation.findOne({
            attributes: ['works_id'],
            where: {
              work_id: work.id,
              kind: work.kind,
            },
          });
          if(rel) {
            worksId = worksIdHash[item.ItemsID] = rel.works_id;
          }
          else {
            worksId = worksIdHash[item.ItemsID] = 0;
            continue;
          }
        }
      }
      await UserWorkRelation.create({
        user_id: uid,
        work_id: work.id,
        works_id: worksId,
        kind: work.kind,
        type: 1,
        // is_delete: false,
        create_time: createTime,
        // update_time: createTime,
      });
    }
  }
}

async function dealUserPost(pool) {
  console.log('------- dealUserPost --------');
  await UserCommentRelation.sync();
  let hash = {};
  let last = 3967;
  // last = 0;
  let result = await pool.request().query(`SELECT * FROM dbo.Users_CollectionList WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    hash[item.ID] = item.UID;
  }
  last = 8609;
  // last = 0;
  result = await pool.request().query(`SELECT * FROM dbo.Concern_UserCollection_Post WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    let uid = hash[item.CollectionID];
    if(uid) {
      await UserCommentRelation.create({
        user_id: uid,
        comment_id: item.CommentID,
        create_time: item.CreateTime,
        update_time: item.CreateTime,
        type: 2,
        is_delete: !!item.ISDel,
      });
    }
    else {
      console.error('no uid');
    }
  }
  last = 1348457;
  // last = 0;
  result = await pool.request().query(`SELECT * FROM dbo.Users_Comment_Behavior WHERE ID>${last} AND BehaviorNumber=231;`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    await UserCommentRelation.create({
      user_id: item.UID,
      comment_id: item.CommentID,
      create_time: item.CreateTime,
      update_time: item.CreateTime,
      type: 1,
      is_delete: !!item.ISDel,
    });
  }
}

async function dealCommentMedia(pool) {
  console.log('------- dealCommentMedia --------');
  await CommentMedia.sync();
  await CommentWork.sync();
  let last = 72119;
  // last = 0;
  let result = await pool.request().query(`SELECT * FROM dbo.Users_Comment_Media WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    let kind = item.FileType || 0;
    if(kind == 3) {
      kind = 0;
    }
    if(kind == 0) {
      await CommentMedia.create({
        comment_id: item.CommentID,
        kind: 3,
        width: item.Width,
        height: item.Height,
        url: item.FileUrl || '',
        duration: 0,
        is_delete: false,
        create_time: item.CreateTime,
        update_time: item.CreateTime,
      });
      continue;
    }
    let workId = item.ItemsID || 0;
    let worksId = 0;
    if(kind == 1) {
      workId = workId.toString().replace(/^2016/, 2020);
    }
    let query = await WorksWorkRelation.findOne({
      attributes: [
        ['works_id', 'worksId']
      ],
      where: {
        work_id: workId,
      },
      raw: true,
    });
    if(query) {
      worksId = query.worksId;
    }
    else {
      continue;
    }
    await CommentWork.create({
      comment_id: item.CommentID,
      works_id: worksId ,
      work_id: workId,
      kind,
      is_delete: false,
      create_time: item.CreateTime,
      update_time: item.CreateTime,
    });
  }
}

async function dealAccount(pool) {
  console.log('------- dealAccount --------');
  await UserAccount.sync();
  await UserOauth.sync();
  let last = 17635;
  // last = 0;
  let result = await pool.request().query(`SELECT * FROM dbo.Users_Open_Account WHERE ID>${last} AND ISDel=0;`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    if(item.OpenType === 'telphone') {
      await UserAccount.create({
        name: item.OpenID || '',
        password: (item.Token || '').toLowerCase(),
        type: 1,
        user_id: item.UID,
        is_delete: false,
        create_time: item.CreateTime,
        update_time: item.CreateTime,
      });
    }
    else if(item.OpenType === 'weibo') {
      await UserOauth.create({
        open_id: item.OpenID || '',
        token: (item.Token || '').toLowerCase(),
        type: 1,
        user_id: item.UID,
        is_delete: false,
        create_time: item.CreateTime,
        update_time: item.CreateTime,
      });
    }
    else if(item.OpenType === 'wechat') {
      await UserOauth.create({
        open_id: item.OpenID,
        token: (item.Token || '').toLowerCase(),
        type: 2,
        user_id: item.UID,
        is_delete: false,
        create_time: item.CreateTime,
        update_time: item.CreateTime,
      });
    }
  }
}

async function dealMessage(pool) {
  console.log('------- dealMessage --------');
  await Message.sync();
  let last = 276335;
  // last = 0;
  let result = await pool.request().query(`SELECT * FROM dbo.Notify WHERE ID>${last} AND type=2;`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    await Message.create({
      id: item.ID,
      user_id: item.sendUsers_InfoID,
      author_id: item.CurrentAuthorID || 0,
      is_author: !!item.CurrentAuthorID,
      target_id: 0,
      type: item.targetType,
      comment_id: item.currenttargetid,
      ref_id: item.urlID,
    });
  }
  last = 283423;
  // last = 0;
  result = await pool.request().query(`SELECT * FROM dbo.Users_Notify WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    await Message.update({
      target_id: item.UID,
      is_read: !!item.isRead,
    }, {
      where: {
        id: item.NID,
      },
    });
  }
}

async function dealMall(pool) {
  console.log('------- dealMall --------');
  await Product.sync();
  await Prize.sync();
  await Express.sync();
  await PrizeExpressRelation.sync();
  let last = 15;
  // last = 0;
  let result = await pool.request().query(`SELECT * FROM dbo.Mall_Product WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    await Product.create({
      id: item.ID,
      name: item.ProductName,
      cover: item.CoverPic || '',
      describe: item.Describe || '',
      price: item.Price,
      discount: item.Discount,
      is_delete: item.State === 3,
      create_time: item.CreateTime,
      update_time: item.CreateTime,
    });
  }
  last = 607;
  // last = 0;
  result = await pool.request().query(`SELECT * FROM dbo.Mall_Order WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    await Express.create({
      id: item.ID,
      user_id: item.UID,
      product_id: 0,
      name: item.OrderName,
      phone: item.OrderPhone,
      state: item.State,
      address: item.OrderAddress,
      is_delete: item.ISDel,
      create_time: item.CreateTime,
      update_time: item.CreateTime,
    });
  }
  last = 1081;
  // last = 0;
  result = await pool.request().query(`SELECT * FROM dbo.Mall_Cart WHERE ID>${last};`);
  for(let i = 0, len = result.recordset.length; i < len; i++) {
    let item = result.recordset[i];
    await Prize.create({
      id: item.ID,
      user_id: item.UID,
      product_id: item.ProductID,
      state: item.State,
      is_delete: item.ISDel,
      create_time: item.CreateTime,
      update_time: item.CreateTime,
    });
    if(item.OrderID) {
      await PrizeExpressRelation.create({
        prize_id: item.ID,
        express_id: item.OrderID,
      });
      await Express.update({
        product_id: item.ProductID,
      }, {
        where: {
          id: item.OrderID,
        },
      });
    }
  }
}

async function dealAuthorDynamic(pool) {
  console.log('------- dealAuthorDynamic --------');
  await AuthorDynamic.sync();
  let res = await Comment.findAll({
    attributes: [
      'id',
      'author_id'
    ],
    where: {
      author_id: {
        $gt: 0
      },
      root_id: 0,
    },
    raw: true,
  });
  for(let i = 0; i < res.length; i++) {
    let item = res[i];
    await AuthorDynamic.create({
      author_id: item.author_id,
      target_id: item.id,
      type: 1,
    });
  }
}

async function modifyWorksComment() {
  let last = 631;
  let sql = `SELECT
    works_id,
    comment_id
    FROM works_comment_relation
    WHERE id>${last}`;
  let res = await sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT });
  // 遍历每个作品虚拟根评论
  for(let i = 0, len = res.length; i < len; i++) {
    let item = res[i];
    let sql2 = `SELECT id, parent_id, root_id FROM comment
      WHERE root_id=${item.comment_id}`;
    // 查找其一级评论
    let res2 = await sequelize.query(sql2, { type: Sequelize.QueryTypes.SELECT });
    if(res2.length) {
      for(let j = 0; j < res2.length; j++) {
        let item2 = res2[j];
        // 部分2+级错误评论的root_id为一级评论id，纠正其root_id
        let sql3 = `UPDATE comment SET root_id=${item2.root_id}
        WHERE root_id=${item2.id} OR parent_id=${item2.id}`;
        await sequelize.query(sql3, { type: Sequelize.QueryTypes.UPDATE });
      }
    }
  }
}
async function modifyAuthorComment() {
  let last = 1082;
  let sql = `SELECT
    author_id,
    comment_id
    FROM author_comment_relation
    WHERE id>${last}`;
  let res = await sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT });
  // 遍历每个作者虚拟根评论
  for(let i = 0, len = res.length; i < len; i++) {
    let item = res[i];
    let sql2 = `SELECT id, parent_id, root_id FROM comment
      WHERE root_id=${item.comment_id}`;
    // 查找其一级评论
    let res2 = await sequelize.query(sql2, { type: Sequelize.QueryTypes.SELECT });
    if(res2.length) {
      for(let j = 0; j < res2.length; j++) {
        let item2 = res2[j];
        // 部分2+级错误评论的root_id为一级评论id，纠正其root_id
        let sql3 = `UPDATE comment SET root_id=${item2.root_id}
        WHERE root_id=${item2.id} OR parent_id=${item2.id}`;
        await sequelize.query(sql3, { type: Sequelize.QueryTypes.UPDATE });
      }
    }
  }
}
async function modifyPostComment() {
  let last = 440051;
  // last = 0;
  // TODO: 这里包含了上面2部分，应该只需要处理一次即可
  let sql = `SELECT
    *
    FROM comment
    WHERE id>${last} AND parent_id=0 AND root_id=0`;
  let res = await sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT });
  // 遍历每个根评论
  for(let i = 0, len = res.length; i < len; i++) {
    let item = res[i];
    // 找出直属于它的评论id
    let sql2 = `SELECT id FROM comment WHERE root_id=${item.id}`;
    let res2 = await sequelize.query(sql2, { type: Sequelize.QueryTypes.SELECT });
    let idList = res2.map(function(item) {
      return item.id;
    });
    if(!idList.length) {
      continue;
    }
    // 更新属于这些直属评论的root_id
    let sql3 = `UPDATE comment set root_id=${item.id}
      WHERE root_id IN (${idList.join(',')}) OR parent_id IN (${idList.join(',')});`;
    await sequelize.query(sql3, { type: Sequelize.QueryTypes.UPDATE });
    // // 查找其1级评论
    // let sql2 = `SELECT id, parent_id, root_id FROM comment
    //   WHERE root_id=${item.id} OR parent_id=${item.id}`;
    // let res2 = await sequelize.query(sql2, { type: Sequelize.QueryTypes.SELECT });
    // if(res2.length) {
    //   // 遍历每个1级评论
    //   for(let j = 0; j < res2.length; j++) {
    //     let item2 = res2[j];
    //     // 部分2+级错误评论的root_id或parent_id为一级评论id，纠正其root_id
    //     let sql3 = `UPDATE comment SET root_id=${item2.root_id}
    //     WHERE root_id=${item2.id} OR parent_id=${item2.id}`;
    //     await sequelize.query(sql3, { type: Sequelize.QueryTypes.UPDATE });
    //   }
    // }
  }
}

async function temp(pool) {
  let res = await WorkNum.findAll({
    attributes: [
      'work_id',
      'num'
    ],
  });
  for(let i = 0; i < res.length; i++) {
    let item = res[i];
    if(/^2020/.test(item.work_id)) {
      await Video.update({
        views: item.num,
      }, {
        where: {
          id: item.work_id,
        },
      });
    }
    else if(/^2021/.test(item.work_id)) {
      await Image.update({
        views: item.num,
      }, {
        where: {
          id: item.work_id,
        },
      });
    }
    else if(/^2022/.test(item.work_id)) {
      await Text.update({
        views: item.num,
      }, {
        where: {
          id: item.work_id,
        },
      });
    }
    else {
      await Audio.update({
        views: item.num,
      }, {
        where: {
          id: item.works_id,
        },
      });
    }
  }
}