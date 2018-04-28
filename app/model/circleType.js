/**
 * Created by army8735 on 2018/4/2.
 */

'use strict';

module.exports = app => {
  const { sequelizeCircling, Sequelize } = app;
  return sequelizeCircling.define('circle_type', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(32),
      unique: true,
      allowNull: false,
      defaultValue: '',
    },
  }, {
    indexes: [
    ],
    comment: '圈子类型',
  });
};
