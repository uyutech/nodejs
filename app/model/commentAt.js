/**
 * Created by army8735 on 2018/5/21.
 */

'use strict';

module.exports = app => {
  const { sequelizeCircling, Sequelize } = app;
  return sequelizeCircling.define('comment_at', {
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
  }, {
    indexes: [
      {
        name: 'comment_id_user_id',
        unique: true,
        fields: ['comment_id', 'user_id'],
      }
    ],
    comment: '评论附带信息',
  });
};
