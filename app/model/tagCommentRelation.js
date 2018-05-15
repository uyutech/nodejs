/**
 * Created by army8735 on 2018/3/25.
 */

'use strict';

module.exports = app => {
  const { sequelizeCircling, Sequelize } = app;
  return sequelizeCircling.define('tag_comment_relation', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    tag_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    comment_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    type: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '1直接选择，2内容输入',
    },
    is_comment_delete: {
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
        name: 'tag_id_comment_id_type',
        unique: true,
        fields: ['tag_id', 'comment_id', 'type'],
      },
      {
        name: 'tag_id_is_comment_delete_comment_id',
        fields: ['tag_id', 'is_comment_delete', 'comment_id'],
      },
      {
        name: 'comment_id_type',
        fields: ['comment_id', 'type'],
      }
    ],
    comment: '标签留言关联信息',
  });
};
