/**
 * Created by army8735 on 2018/1/28.
 */

'use strict';

module.exports = app => {
  const { sequelizeStats, Sequelize } = app;
  return sequelizeStats.define('works_num', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      // unique: true,
      autoIncrement: true,
      allowNull: false,
    },
    works_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
    },
    work_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
    },
    type: {
      type: Sequelize.TINYINT,
      allowNull: false,
      comment: '0评论数，1浏览数，2播放数，3点赞数，4收藏数',
    },
    num: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    update_time: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  }, {
    indexes: [
      {
        unique: true,
        fields: ['id'],
      },
      {
        unique: true,
        fields: ['works_id', 'work_id', 'type'],
      }
    ],
    comment: '作品相关数字汇总',
  });
};
