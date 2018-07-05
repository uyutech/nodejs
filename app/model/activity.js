/**
 * Created by army8735 on 2018/6/29.
 */

'use strict';

module.exports = app => {
  const { sequelizeActivity, Sequelize } = app;
  return sequelizeActivity.define('activity', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING(64),
      allowNull: false,
      defaultValue: '',
    },
    describe: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: '',
    },
    start_time: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    end_time: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    create_time: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    update_time: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  }, {
    indexes: [
    ],
    comment: '活动信息',
  });
};
