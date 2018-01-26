/**
 * Created by army8735 on 2018/1/26.
 */

'use strict';

const Sequelize = require('sequelize');
const author = require('../model/author');
const authorOutside = require('../model/authorOutside');

const SEQUELIZE = Symbol('Application#Sequelize');
const SEQUELIZE_INSTANCE = Symbol('Application#sequelizeInstance');
const MODEL = Symbol('Application#Model');

module.exports = {
  get Sequelize() {
    if(!this[SEQUELIZE]) {
      this[SEQUELIZE] = Sequelize;
    }
    return this[SEQUELIZE];
  },
  get sequelize() {
    if(!this[SEQUELIZE_INSTANCE]) {
      let database = this.config.database;
      this[SEQUELIZE_INSTANCE] = new Sequelize(database.db, database.username, database.password, {
        host: 'localhost',
        dialect: 'mysql',
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        },
        dialectOptions: {
          charset: 'utf8',
        },
        define: {
          timestamps: false,
          underscored: true,
          freezeTableName: true,
        },
      });
    }
    return this[SEQUELIZE_INSTANCE];
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
