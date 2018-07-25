/**
 * Created by army8735 on 2018/7/21.
 */

'use strict';

module.exports = app => {
  const { sequelizeRecommend, Sequelize } = app;
  return sequelizeRecommend.define('circling_post', {
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
    weight: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    theme: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '1-音乐；2-传统文化；3-文学；4-美图；5-娱乐；6-生活；99-合作',
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
        name: 'comment_id',
        unique: true,
        fields: ['comment_id'],
      },
      {
        name: 'is_delete_theme_weight_comment_id',
        fields: ['is_delete', 'theme', 'weight', 'comment_id'],
      }
    ],
    comment: '推荐画圈',
  });
};
