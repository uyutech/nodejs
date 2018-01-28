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
const authorNum = require('../model/authorNum');
const authorOutside = require('../model/authorOutside');
const comment = require('../model/authorOutside');
const commentNum = require('../model/authorOutside');
const profession = require('../model/authorOutside');
const professionSkillRelation = require('../model/authorOutside');
const skill = require('../model/authorOutside');
const user = require('../model/authorOutside');
const userPrivate = require('../model/authorOutside');
// const authorOutside = require('../model/authorOutside');

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
        authorOutside: authorOutside(this),
      };
    }
    return this[MODEL];
  }
};
