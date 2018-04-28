/**
 * Created by army8735 on 2018/4/23.
 */

'use strict';

module.exports = app => {
  const { sequelizeRecommend, Sequelize } = app;
  return sequelizeRecommend.define('circling_comment', {
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
    type: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      comment: '1作者动态，2作品发布，3精选，5公告，6活动，7专题，8长评',
    },
    weight: {
      type: Sequelize.SMALLINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    is_delete: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    indexes: [
      {
        name: 'weight_is_delete',
        fields: ['weight', 'is_delete'],
      }
    ],
    comment: '推荐评论',
  });
};
