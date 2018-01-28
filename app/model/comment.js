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
      unique: true,
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
    },
    user_type: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    state: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '0删除，1正常，2待审，3仅自己可见',
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
        unique: true,
        fields: ['id'],
      },
      {
        fields: ['user_id'],
      },
      {
        fields: ['author_id'],
      },
      {
        fields: ['parent_id'],
      },
      {
        fields: ['root_id'],
      }
    ],
    comment: '评论基本信息',
  });
};
