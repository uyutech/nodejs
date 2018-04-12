/**
 * Created by army8735 on 2018/1/28.
 */

'use strict';

module.exports = app => {
  const { sequelizeCircling, Sequelize } = app;
  return sequelizeCircling.define('comment', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
    },
    author_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    is_author: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    is_delete: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    review: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '0未知，1审核中，2违规，3通过',
    },
    state: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '0正常，1黑名单，2红名单',
    },
    parent_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    root_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
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
        name: 'user_id_root_id_is_delete',
        fields: ['user_id', 'root_id', 'is_delete'],
      },
      {
        name: 'author_id_root_id_is_delete',
        fields: ['author_id', 'root_id', 'is_delete'],
      },
      {
        name: 'root_id_is_delete',
        fields: ['root_id', 'is_delete'],
      }
    ],
    comment: '评论基本信息',
  });
};
