/**
 * Created by army8735 on 2018/6/29.
 */

'use strict';

module.exports = app => {
  const { sequelizeActivity, Sequelize } = app;
  return sequelizeActivity.define('activity_works', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    activity_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    works_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
    },
    origin_url: {
      type: Sequelize.STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    accompany_url: {
      type: Sequelize.STRING(255),
      allowNull: false,
      defaultValue: '',
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
      {
        name: 'activity_id_works_id',
        unique: true,
        fields: ['activity_id', 'works_id'],
      }
    ],
    comment: '活动作品信息',
  });
};
