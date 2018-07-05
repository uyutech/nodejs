/**
 * Created by army8735 on 2018/7/2.
 */

'use strict';

module.exports = app => {
  const { sequelizeActivity, Sequelize } = app;
  return sequelizeActivity.define('activity_vote', {
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
    type: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      comment: '1翻唱，2绘画',
    },
    upload_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
    },
    create_time: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  }, {
    indexes: [
      {
        name: 'activity_id_upload_id_user_id',
        fields: ['activity_id', 'type', 'upload_id', 'user_id'],
      },
      {
        name: 'activity_id_user_id_create_time',
        fields: ['activity_id', 'user_id', 'create_time'],
      }
    ],
    comment: '活动作品投票信息',
  });
};
