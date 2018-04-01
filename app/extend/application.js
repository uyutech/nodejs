/**
 * Created by army8735 on 2018/3/17.
 */

'use strict';

const Sequelize = require('sequelize');

const SEQUELIZE = Symbol('Application#Sequelize');
const SEQUELIZE_CIRCLING = Symbol('Application#sequelizeCircling');
const SEQUELIZE_STATS = Symbol('Application#sequelizeStats');
const MODEL = Symbol('Application#Model');

const author = require('../model/author');
const authorMainWorks = require('../model/authorMainWorks');
const authorCommentRelation = require('../model/authorCommentRelation');
const authorNum = require('../model/authorNum');
const authorOutside = require('../model/authorOutside');
const authorAlias = require('../model/authorAlias');
const circle = require('../model/circle');
const circleCommentRelation = require('../model/circleCommentRelation');
const circleNum = require('../model/circleNum');
const circleTagRelation = require('../model/circleTagRelation');
const comment = require('../model/comment');
const commentImage = require('../model/commentImage');
const commentNum = require('../model/commentNum');
const profession = require('../model/profession');
const professionSkillRelation = require('../model/professionSkillRelation');
const skill = require('../model/skill');
const tag = require('../model/tag');
const user = require('../model/user');
const userDelivery = require('../model/userDelivery');
const userAuthorRelation = require('../model/userAuthorRelation');
const userCommentRelation = require('../model/userCommentRelation');
const userUserRelation = require('../model/userUserRelation');
const userWorkRelation = require('../model/userWorkRelation');
const work = require('../model/work');
const image = require('../model/image');
const text = require('../model/text');
const video = require('../model/video');
const audio = require('../model/audio');
const workType = require('../model/workType');
const works = require('../model/works');
const worksType = require('../model/worksType');
const worksTimeline = require('../model/worksTimeline');
const worksNum = require('../model/worksNum');
const worksState = require('../model/worksState');
const workNum = require('../model/workNum');
const worksWorkRelation = require('../model/worksWorkRelation');
const worksCommentRelation = require('../model/worksCommentRelation');
const worksRecommend = require('../model/worksRecommend');
const worksAuthorProfessionRelation = require('../model/worksAuthorProfessionRelation');
const musicAlbum = require('../model/musicAlbum');

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
        host: database.stats.host,
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
    }
    return this[SEQUELIZE_CIRCLING];
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
        authorNum: authorNum(this),
        authorOutside: authorOutside(this),
        authorAlias: authorAlias(this),
        circle: circle(this),
        circleCommentRelation: circleCommentRelation(this),
        circleNum: circleNum(this),
        circleTagRelation: circleTagRelation(this),
        comment: comment(this),
        commentImage: commentImage(this),
        commentNum: commentNum(this),
        profession: profession(this),
        professionSkillRelation: professionSkillRelation(this),
        skill: skill(this),
        tag: tag(this),
        user: user(this),
        userDelivery: userDelivery(this),
        userAuthorRelation: userAuthorRelation(this),
        userCommentRelation: userCommentRelation(this),
        userUserRelation: userUserRelation(this),
        userWorkRelation: userWorkRelation(this),
        work: work(this),
        image: image(this),
        text: text(this),
        video: video(this),
        audio: audio(this),
        workType: workType(this),
        works: works(this),
        worksType: worksType(this),
        worksTimeline: worksTimeline(this),
        worksNum: worksNum(this),
        worksState: worksState(this),
        workNum: workNum(this),
        worksWorkRelation: worksWorkRelation(this),
        worksCommentRelation: worksCommentRelation(this),
        worksRecommend: worksRecommend(this),
        worksAuthorProfessionRelation: worksAuthorProfessionRelation(this),
        musicAlbum: musicAlbum(this),
      };
    }
    return this[MODEL];
  }
};
