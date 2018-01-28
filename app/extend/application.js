/**
 * Created by army8735 on 2018/1/26.
 */

'use strict';

const Sequelize = require('sequelize');

const SEQUELIZE = Symbol('Application#Sequelize');
const SEQUELIZE_CIRCLING = Symbol('Application#sequelizeCircling');
const SEQUELIZE_STATS = Symbol('Application#sequelizeStats');
const MODEL = Symbol('Application#Model');

const author = require('../model/author');
const authorCommentRelation = require('../model/authorCommentRelation');
const authorNum = require('../model/authorNum');
const authorOutside = require('../model/authorOutside');
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
const userPrivate = require('../model/userPrivate');
const userAuthorRelation = require('../model/userAuthorRelation');
const userCommentRelation = require('../model/userCommentRelation');
const userIpRecord = require('../model/userIpRecord');
const userUserRelation = require('../model/userUserRelation');
const userWorksWorkRelation = require('../model/userWorksWorkRelation');
const work = require('../model/work');
const workMedia = require('../model/workMedia');
const workImage = require('../model/WorkImage');
const workText = require('../model/workText');
const workType = require('../model/workType');
const works = require('../model/works');
const worksType = require('../model/worksType');
const worksTimeline = require('../model/worksTimeline');
const worksWorkNum = require('../model/worksWorkNum');
const worksWorkRelation = require('../model/worksWorkRelation');
const worksWorkCommentRelation = require('../model/worksWorkCommentRelation');

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
    }
    return this[SEQUELIZE_CIRCLING];
  },
  get sequelizeStats() {
    if(!this[SEQUELIZE_STATS]) {
      let database = this.config.database;
      this[SEQUELIZE_STATS] = new Sequelize(database.stats.name, database.stats.username, database.stats.password, {
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
    }
    return this[SEQUELIZE_STATS];
  },
  get model() {
    if(!this[MODEL]) {
      this[MODEL] = {
        author: author(this),
        authorCommentRelation: authorCommentRelation(this),
        authorNum: authorNum(this),
        authorOutside: authorOutside(this),
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
        userPrivate: userPrivate(this),
        userAuthorRelation: userAuthorRelation(this),
        userCommentRelation: userCommentRelation(this),
        userIpRecord: userIpRecord(this),
        userUserRelation: userUserRelation(this),
        userWorksWorkRelation: userWorksWorkRelation(this),
        work: work(this),
        workMedia: workMedia(this),
        workImage: workImage(this),
        workText: workText(this),
        workType: workType(this),
        works: works(this),
        worksType: worksType(this),
        worksTimeline: worksTimeline(this),
        worksWorkNum: worksWorkNum(this),
        worksWorkRelation: worksWorkRelation(this),
        worksWorkCommentRelation: worksWorkCommentRelation(this),
      };
    }
    return this[MODEL];
  }
};
