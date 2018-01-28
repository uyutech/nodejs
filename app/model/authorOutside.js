/**
 * Created by army8735 on 2018/1/26.
 */

'use strict';

module.exports = app => {
  const { sequelizeCircling, Sequelize } = app;
  return sequelizeCircling.define('author_outside', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    author_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      unique: 'authorOutSideUnique',
    },
    state: Sequelize.BOOLEAN,
    type: {
      type: Sequelize.TINYINT.UNSIGNED,
      unique: 'authorOutSideUnique',
    },
    url: Sequelize.STRING,
    create_time: Sequelize.DATE,
    update_time: Sequelize.DATE,
  });
};
