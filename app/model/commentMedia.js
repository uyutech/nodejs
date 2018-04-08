/**
 * Created by army8735 on 2018/4/8.
 */

'use strict';

module.exports = app => {
  const { sequelizeCircling, Sequelize } = app;
  return sequelizeCircling.define('comment_media', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    comment_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    works_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      defaultValue: 0,
    },
    work_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      defaultValue: 0,
    },
    kind: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      comment: '0图片，1小作品视频，2小作品音频',
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    },
    width: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    height: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    duration: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    is_delete: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    update_time: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  }, {
    indexes: [
      {
        name: 'comment_id',
        fields: ['comment_id'],
      }
    ],
    comment: '评论基本信息',
  });
};
