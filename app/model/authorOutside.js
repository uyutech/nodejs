/**
 * Created by army8735 on 2018/1/26.
 */

'use strict';

module.exports = app => {
  const { sequelize, Sequelize } = app;
  return sequelize.define('author_outside', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    author_id: {
      type: Sequelize.BIGINT,
      unique: 'authorOutSideUnique',
    },
    state: Sequelize.BOOLEAN,
    type: {
      type: Sequelize.TINYINT,
      unique: 'authorOutSideUnique',
    },
    url: Sequelize.STRING,
    create_time: Sequelize.DATE,
    update_time: Sequelize.DATE,
  });
};
