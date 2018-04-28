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
      comment: '1回复了作者页留言，2回复了作品页留言，3回复画圈留言，4回复画圈',
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
