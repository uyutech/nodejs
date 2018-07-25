/**
 * Created by army8735 on 2018/6/10.
 */

'use strict';

module.exports = app => {
  const { sequelizeRecommend, Sequelize } = app;
  return sequelizeRecommend.define('guide_tag', {
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
    weight: {
      type: Sequelize.SMALLINT.UNSIGNED,
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
        name: 'tag_id',
        unique: true,
        fields: ['tag_id']
      },
      {
        name: 'is_delete_weight',
        fields: ['is_delete', 'weight']
      }
    ],
    comment: '引导圈子',
  });
};
