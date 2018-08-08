/**
 * Created by army8735 on 2018/7/5.
 */

'use strict';

module.exports = app => {
  const { sequelizeActivity, Sequelize } = app;
  return sequelizeActivity.define('activity_upload_hh', {
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
    user_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
    },
    is_prize: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    popular: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    prize: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
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
      },
      {
        name: 'activity_id_is_prize_create_time',
        fields: ['activity_id', 'is_prize', 'create_time'],
      },
      {
        name: 'activity_id_prize_create_time',
        fields: ['activity_id', 'prize', 'create_time'],
      },
      {
        name: 'activity_id_create_time',
        fields: ['activity_id', 'create_time'],
      },
      {
        name: 'activity_id_popular',
        fields: ['activity_id', 'popular', 'create_time'],
      }
    ],
    comment: '活动上传绘画作品信息',
  });
};
