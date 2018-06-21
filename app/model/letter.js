/**
 * Created by army8735 on 2018/5/21.
 */

'use strict';

module.exports = app => {
  const { sequelizeCircling, Sequelize } = app;
  return sequelizeCircling.define('letter', {
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
    target_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
    },
    key: {
      type: Sequelize.CHAR(32),
      allowNull: false,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    is_read: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
        name: 'key_is_delete_is_read',
        fields: ['key', 'is_delete', 'is_read'],
      },
      {
        name: 'user_id_target_id_is_delete_is_read',
        fields: ['user_id', 'target_id', 'is_delete', 'is_read'],
      }
    ],
    comment: '私信基本信息',
  });
};
