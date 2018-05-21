/**
 * Created by army8735 on 2018/4/12.
 */

'use strict';

module.exports = app => {
  const { sequelizeCircling, Sequelize } = app;
  return sequelizeCircling.define('message', {
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
    target_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
    },
    is_read: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    type: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '1回复作者页评论，2回复作品页评论，3回复画圈页评论，4评论画圈页，5评论作品页，6评论作者页',
    },
    ref_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
      comment: '引用大作品、作者、画圈的id',
    },
    comment_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      comment: '言论id',
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
        name: 'target_id_is_read',
        fields: ['target_id', 'is_read'],
      },
      {
        name: 'user_id_comment_id',
        fields: ['user_id', 'comment_id'],
      }
    ],
    comment: '消息列表',
  });
};
