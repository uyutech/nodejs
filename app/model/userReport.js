/**
 * Created by army8735 on 2018/4/17.
 */

'use strict';

module.exports = app => {
  const { sequelizeStats, Sequelize } = app;
  return sequelizeStats.define('user_report', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    target_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
    },
    type: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      comment: '1视频，2音频，3图片，4文本，5言论，6用户，7作者',
    },
    user_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    is_delete: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    create_time: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  }, {
    indexes: [
      {
        name: 'target_id',
        fields: ['target_id'],
      },
      {
        name: 'user_id',
        fields: ['user_id'],
      }
    ],
    comment: '用户举报',
  });
};
