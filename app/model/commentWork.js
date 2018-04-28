/**
 * Created by army8735 on 2018/4/16.
 */

'use strict';

module.exports = app => {
  const { sequelizeCircling, Sequelize } = app;
  return sequelizeCircling.define('comment_work', {
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
      comment: '0图片，1小作品视频，2小作品音频，3小作品图片',
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
    update_time: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  }, {
    indexes: [
      {
        name: 'comment_id_work_id',
        unique: true,
        fields: ['comment_id', 'work_id'],
      }
    ],
    comment: '评论附带作品',
  });
};
