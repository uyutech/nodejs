/**
 * Created by army8735 on 2018/3/17.
 */

'use strict';

const Sequelize = require('sequelize');

const SEQUELIZE = Symbol('Application#Sequelize');
const SEQUELIZE_CIRCLING = Symbol('Application#sequelizeCircling');
const SEQUELIZE_MALL = Symbol('Application#sequelizeMall');
const SEQUELIZE_REPORT = Symbol('Application#sequelizeReport');
const SEQUELIZE_STATS = Symbol('Application#sequelizeStats');
const MODEL = Symbol('Application#Model');

const author = require('../model/author');
const authorMainWorks = require('../model/authorMainWorks');
const authorCommentRelation = require('../model/authorCommentRelation');
const authorOutside = require('../model/authorOutside');
const authorAlias = require('../model/authorAlias');
const authorDynamic = require('../model/authorDynamic');
const circleType = require('../model/circleType');
const circle = require('../model/circle');
const circleTagRelation = require('../model/circleTagRelation');
const circleCommentRelation = require('../model/circleCommentRelation');
const comment = require('../model/comment');
const commentMedia = require('../model/commentMedia');
const commentWork = require('../model/commentWork');
const commentPoint = require('../model/commentPoint');
const profession = require('../model/profession');
const professionSkillRelation = require('../model/professionSkillRelation');
const skill = require('../model/skill');
const tag = require('../model/tag');
const tagCommentRelation = require('../model/tagCommentRelation');
const user = require('../model/user');
const userAddress = require('../model/userAddress');
const userAuthorRelation = require('../model/userAuthorRelation');
const userCommentRelation = require('../model/userCommentRelation');
const userPersonRelation = require('../model/userPersonRelation');
const userWorkRelation = require('../model/userWorkRelation');
const work = require('../model/work');
const image = require('../model/image');
const text = require('../model/text');
const video = require('../model/video');
const audio = require('../model/audio');
const workType = require('../model/workType');
const workNum = require('../model/workNum');
const works = require('../model/works');
const worksType = require('../model/worksType');
const worksTimeline = require('../model/worksTimeline');
const workTypeProfessionSort = require('../model/workTypeProfessionSort');
const worksWorkRelation = require('../model/worksWorkRelation');
const worksCommentRelation = require('../model/worksCommentRelation');
const worksRecommend = require('../model/worksRecommend');
const workAuthorRelation = require('../model/workAuthorRelation');
const worksAuthorRelation = require('../model/worksAuthorRelation');
const worksTypeProfessionSort = require('../model/worksTypeProfessionSort');
const worksNum = require('../model/worksNum');
const musicAlbum = require('../model/musicAlbum');
const musicAlbumWorkRelation = require('../model/musicAlbumWorkRelation');
const musicAlbumAuthorRelation = require('../model/musicAlbumAuthorRelation');
const imageAlbum = require('../model/imageAlbum');
const imageAlbumWorkRelation = require('../model/imageAlbumWorkRelation');
const imageAlbumAuthorRelation = require('../model/imageAlbumAuthorRelation');
const recommend = require('../model/recommend');
const recommendTag = require('../model/recommendTag');
const recommendBanner = require('../model/recommendBanner');
const recommendList = require('../model/recommendList');
const banner = require('../model/banner');
const userCircleRelation = require('../model/userCircleRelation');
const userAccount = require('../model/userAccount');
const userOauth = require('../model/userOauth');
const message = require('../model/message');
const product = require('../model/product');
const prize = require('../model/prize');
const express = require('../model/express');
const prizeExpressRelation = require('../model/prizeExpressRelation');
const userReport = require('../model/userReport');

module.exports = {
  get Sequelize() {
    if(!this[SEQUELIZE]) {
      this[SEQUELIZE] = Sequelize;
    }
    return this[SEQUELIZE];
  },
  get sequelizeCircling() {
    if(!this[SEQUELIZE_CIRCLING]) {
      let database = this.config.database;
      this[SEQUELIZE_CIRCLING] = new Sequelize(database.circling.name, database.circling.username, database.circling.password, {
        host: database.circling.host,
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
      });
    }
    return this[SEQUELIZE_CIRCLING];
  },
  get sequelizeMall() {
    if(!this[SEQUELIZE_MALL]) {
      let database = this.config.database;
      this[SEQUELIZE_MALL] = new Sequelize(database.mall.name, database.mall.username, database.mall.password, {
        host: database.mall.host,
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
      });
    }
    return this[SEQUELIZE_MALL];
  },
  get sequelizeReport() {
    if(!this[SEQUELIZE_REPORT]) {
      let database = this.config.database;
      this[SEQUELIZE_REPORT] = new Sequelize(database.report.name, database.report.username, database.report.password, {
        host: database.report.host,
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
      });
    }
    return this[SEQUELIZE_REPORT];
  },
  get sequelizeStats() {
    if(!this[SEQUELIZE_STATS]) {
      let database = this.config.database;
      this[SEQUELIZE_STATS] = new Sequelize(database.stats.name, database.stats.username, database.stats.password, {
        host: database.stats.host,
        dialect: 'mysql',
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
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
      });
    }
    return this[SEQUELIZE_STATS];
  },
  get model() {
    if(!this[MODEL]) {
      this[MODEL] = {
        author: author(this),
        authorMainWorks: authorMainWorks(this),
        authorCommentRelation: authorCommentRelation(this),
        authorOutside: authorOutside(this),
        authorAlias: authorAlias(this),
        authorDynamic: authorDynamic(this),
        circleType: circleType(this),
        circle: circle(this),
        circleTagRelation: circleTagRelation(this),
        circleCommentRelation: circleCommentRelation(this),
        comment: comment(this),
        commentMedia: commentMedia(this),
        commentWork: commentWork(this),
        commentPoint: commentPoint(this),
        profession: profession(this),
        professionSkillRelation: professionSkillRelation(this),
        skill: skill(this),
        tag: tag(this),
        tagCommentRelation: tagCommentRelation(this),
        user: user(this),
        userAddress: userAddress(this),
        userAuthorRelation: userAuthorRelation(this),
        userCommentRelation: userCommentRelation(this),
        userPersonRelation: userPersonRelation(this),
        userWorkRelation: userWorkRelation(this),
        work: work(this),
        image: image(this),
        text: text(this),
        video: video(this),
        audio: audio(this),
        workType: workType(this),
        workNum: workNum(this),
        works: works(this),
        worksType: worksType(this),
        worksTimeline: worksTimeline(this),
        workTypeProfessionSort: workTypeProfessionSort(this),
        worksWorkRelation: worksWorkRelation(this),
        worksCommentRelation: worksCommentRelation(this),
        worksRecommend: worksRecommend(this),
        workAuthorRelation: workAuthorRelation(this),
        worksAuthorRelation: worksAuthorRelation(this),
        worksTypeProfessionSort: worksTypeProfessionSort(this),
        worksNum: worksNum(this),
        musicAlbum: musicAlbum(this),
        musicAlbumWorkRelation: musicAlbumWorkRelation(this),
        musicAlbumAuthorRelation: musicAlbumAuthorRelation(this),
        imageAlbum: imageAlbum(this),
        imageAlbumWorkRelation: imageAlbumWorkRelation(this),
        imageAlbumAuthorRelation: imageAlbumAuthorRelation(this),
        recommend: recommend(this),
        recommendTag: recommendTag(this),
        recommendBanner: recommendBanner(this),
        recommendList: recommendList(this),
        banner: banner(this),
        userCircleRelation: userCircleRelation(this),
        userAccount: userAccount(this),
        userOauth: userOauth(this),
        message: message(this),
        product: product(this),
        prize: prize(this),
        express: express(this),
        prizeExpressRelation: prizeExpressRelation(this),
        userReport: userReport(this),
      };
    }
    return this[MODEL];
  }
};
