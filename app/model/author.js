/**
 * Created by army8735 on 2018/1/26.
 */

'use strict';

module.exports = app => {
  const { sequelizeCircling, Sequelize } = app;
  return sequelizeCircling.define('author', {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      unique: true,
    },
    state: Sequelize.BOOLEAN,
    type: Sequelize.TINYINT,
    name: Sequelize.STRING(32),
    fans_name: Sequelize.STRING(32),
    fans_circle_name: Sequelize.STRING(32),
    head_url: Sequelize.STRING,
    settled: Sequelize.BOOLEAN,
    sign: Sequelize.STRING,
    create_time: Sequelize.DATE,
    update_time: Sequelize.DATE,
  });
};
