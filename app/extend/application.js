/**
 * Created by army8735 on 2018/3/17.
 */

'use strict';

const Sequelize = require('sequelize');

const SEQUELIZE = Symbol('Application#Sequelize');
const SEQUELIZE_CIRCLING = Symbol('Application#sequelizeCircling');
const SEQUELIZE_MALL = Symbol('Application#sequelizeMall');
const SEQUELIZE_RECOMMEND = Symbol('Application#sequelizeRecommend');
const SEQUELIZE_STATS = Symbol('Application#sequelizeStats');
const SEQUELIZE_CMS = Symbol('Application#sequelizeCms');
const SEQUELIZE_ACTIVITY = Symbol('Application#sequelizeActivity');
const MODEL = Symbol('Application#Model');

const author = require('../model/author');
const authorMainWorks = require('../model/authorMainWorks');
const authorCommentRelation = require('../model/authorCommentRelation');
const authorOutside = require('../model/authorOutside');
const authorAlias = require('../model/authorAlias');
const authorDynamic = require('../model/authorDynamic');
const authorSkillRelation = require('../model/authorSkillRelation');
const authorCooperation = require('../model/authorCooperation');
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
const worksWorksRelation = require('../model/worksWorksRelation');
const worksCommentRelation = require('../model/worksCommentRelation');
const worksRecommend = require('../model/worksRecommend');
const workAuthorRelation = require('../model/workAuthorRelation');
const worksAuthorRelation = require('../model/worksAuthorRelation');
const worksTypeProfessionSort = require('../model/worksTypeProfessionSort');
const worksNum = require('../model/worksNum');
const workTypeProfessionRelation = require('../model/workTypeProfessionRelation');
const worksTypeWorkTypeRelation = require('../model/worksTypeWorkTypeRelation');
const musicAlbum = require('../model/musicAlbum');
const musicAlbumWorkRelation = require('../model/musicAlbumWorkRelation');
const musicAlbumAuthorRelation = require('../model/musicAlbumAuthorRelation');
const imageAlbum = require('../model/imageAlbum');
const imageAlbumWorkRelation = require('../model/imageAlbumWorkRelation');
const imageAlbumAuthorRelation = require('../model/imageAlbumAuthorRelation');
const userCircleRelation = require('../model/userCircleRelation');
const userAccount = require('../model/userAccount');
const userOauth = require('../model/userOauth');
const message = require('../model/message');
const userCreateWorks = require('../model/userCreateWorks');
const userUploadWork = require('../model/userUploadWork');
const workWorkRelation = require('../model/workWorkRelation');
const authorSkillWorks = require('../model/authorSkillWorks');
const letter = require('../model/letter');
const letterRecent = require('../model/letterRecent');
const userTagRelation = require('../model/userTagRelation');
const content = require('../model/content');
const userContentRelation = require('../model/userContentRelation');
const userContentRecord = require('../model/userContentRecord');
const guideTag = require('../model/guideTag');
const postTag = require('../model/postTag');
const userCheckIn = require('../model/userCheckIn');
const userCheckInRecord = require('../model/userCheckInRecord');

const product = require('../model/product');
const prize = require('../model/prize');
const express = require('../model/express');
const prizeExpressRelation = require('../model/prizeExpressRelation');

const findList = require('../model/findList');
const findTag = require('../model/findTag');
const findKind = require('../model/findKind');
const findBanner = require('../model/findBanner');
const banner = require('../model/banner');
const circlingComment = require('../model/circlingComment');
const circleTop = require('../model/circleTop');
const circlingPost = require('../model/circlingPost');
const circlingPostRead = require('../model/circlingPostRead');

const userReport = require('../model/userReport');
const userVisit = require('../model/userVisit');
const userAction = require('../model/userAction');
const userActionType = require('../model/userActionType');

const cmsAccount = require('../model/cmsAccount');

const activity = require('../model/activity');
const activityWorks = require('../model/activityWorks');
const activityUpload = require('../model/activityUpload');
const activityUploadHh = require('../model/activityUploadHh');
const activityVote = require('../model/activityVote');
const activityCharacter = require('../model/activityCharacter');
const jsgm = require('../model/jsgm');

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
  get sequelizeRecommend() {
    if(!this[SEQUELIZE_RECOMMEND]) {
      let database = this.config.database;
      this[SEQUELIZE_RECOMMEND] = new Sequelize(database.recommend.name, database.recommend.username, database.recommend.password, {
        host: database.recommend.host,
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
    return this[SEQUELIZE_RECOMMEND];
  },
  get sequelizeActivity() {
    if(!this[SEQUELIZE_ACTIVITY]) {
      let database = this.config.database;
      this[SEQUELIZE_ACTIVITY] = new Sequelize(database.activity.name, database.activity.username, database.activity.password, {
        host: database.activity.host,
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
    return this[SEQUELIZE_ACTIVITY];
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
  get sequelizeCms() {
    if(!this[SEQUELIZE_CMS]) {
      let database = this.config.database;
      this[SEQUELIZE_CMS] = new Sequelize(database.cms.name, database.cms.username, database.cms.password, {
        host: database.cms.host,
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
    return this[SEQUELIZE_CMS];
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
        authorSkillRelation: authorSkillRelation(this),
        authorCooperation: authorCooperation(this),
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
        worksWorksRelation: worksWorksRelation(this),
        worksCommentRelation: worksCommentRelation(this),
        worksRecommend: worksRecommend(this),
        workAuthorRelation: workAuthorRelation(this),
        worksAuthorRelation: worksAuthorRelation(this),
        worksTypeProfessionSort: worksTypeProfessionSort(this),
        worksNum: worksNum(this),
        workTypeProfessionRelation: workTypeProfessionRelation(this),
        worksTypeWorkTypeRelation: worksTypeWorkTypeRelation(this),
        musicAlbum: musicAlbum(this),
        musicAlbumWorkRelation: musicAlbumWorkRelation(this),
        musicAlbumAuthorRelation: musicAlbumAuthorRelation(this),
        imageAlbum: imageAlbum(this),
        imageAlbumWorkRelation: imageAlbumWorkRelation(this),
        imageAlbumAuthorRelation: imageAlbumAuthorRelation(this),
        userCircleRelation: userCircleRelation(this),
        userAccount: userAccount(this),
        userOauth: userOauth(this),
        message: message(this),
        userCreateWorks: userCreateWorks(this),
        userUploadWork: userUploadWork(this),
        workWorkRelation: workWorkRelation(this),
        authorSkillWorks: authorSkillWorks(this),
        letter: letter(this),
        letterRecent: letterRecent(this),
        userTagRelation: userTagRelation(this),
        content: content(this),
        userContentRelation: userContentRelation(this),
        userContentRecord: userContentRecord(this),
        guideTag: guideTag(this),
        postTag: postTag(this),
        userCheckIn: userCheckIn(this),
        userCheckInRecord: userCheckInRecord(this),

        product: product(this),
        prize: prize(this),
        express: express(this),
        prizeExpressRelation: prizeExpressRelation(this),

        findList: findList(this),
        findTag: findTag(this),
        findKind: findKind(this),
        findBanner: findBanner(this),
        banner: banner(this),
        circlingComment: circlingComment(this),
        circleTop: circleTop(this),
        circlingPost: circlingPost(this),
        circlingPostRead: circlingPostRead(this),

        userReport: userReport(this),
        userVisit: userVisit(this),
        userAction: userAction(this),
        userActionType: userActionType(this),

        cmsAccount: cmsAccount(this),

        activity: activity(this),
        activityWorks: activityWorks(this),
        activityUpload: activityUpload(this),
        activityUploadHh: activityUploadHh(this),
        activityVote: activityVote(this),
        activityCharacter: activityCharacter(this),
        jsgm: jsgm(this),
      };
    }
    return this[MODEL];
  }
};
