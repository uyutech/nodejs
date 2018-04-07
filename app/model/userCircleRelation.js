/**
 * Created by army8735 on 2018/4/7.
 */

'use strict';

module.exports = app => {
  const { sequelizeCircling, Sequelize } = app;
  return sequelizeCircling.define('user_circle_relation', {
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
    circle_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
    },
    type: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      comment: '1关注，3屏蔽',
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
        name: 'user_id_circle_id',
        unique: true,
        fields: ['user_id', 'circle_id'],
      },
      {
        name: 'user_id_type_update_time',
        fields: ['user_id', 'type', 'update_time'],
      },
      {
        name: 'circle_id_type_update_time',
        fields: ['circle_id', 'type', 'update_time']
      }
    ],
    comment: '用户和圈子关联信息',
  });
};
