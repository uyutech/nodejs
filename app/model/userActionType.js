/**
 * Created by army8735 on 2018/5/14.
 */

'use strict';

module.exports = app => {
  const { sequelizeStats, Sequelize } = app;
  return sequelizeStats.define('user_action_type', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    },
  }, {
    indexes: [
    ],
    comment: '用户行为记录类型',
  });
};
