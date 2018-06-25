/**
 * Created by army8735 on 2018/6/8.
 */

'use strict';

module.exports = app => {
  const { sequelizeRecommend, Sequelize } = app;
  return sequelizeRecommend.define('content', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    type: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      comment: '1画圈，2作品',
    },
    target_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
    },
    sub_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    label: {
      type: Sequelize.STRING(32),
      allowNull: false,
      defaultValue: '',
    },
    title: {
      type: Sequelize.STRING(32),
      allowNull: false,
      defaultValue: '',
    },
    cover: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    },
    describe: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: '',
    },
    tag: {
      type: Sequelize.JSON,
    },
    weight: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
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
        name: 'type_is_delete_weight_create_time',
        fields: ['type', 'is_delete', 'weight', 'create_time']
      },
      {
        name: 'target_id',
        unique: true,
        fields: ['target_id'],
      }
    ],
    comment: '推荐画圈',
  });
};
