/**
 * Created by army8735 on 2018/4/17.
 */

'use strict';

module.exports = app => {
  const { sequelizeReport, Sequelize } = app;
  return sequelizeReport.define('comment', {
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
    user_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
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
        name: 'comment_id',
        fields: ['comment_id'],
      },
      {
        name: 'user_id',
        fields: ['user_id'],
      }
    ],
    comment: '举报评论',
  });
};
