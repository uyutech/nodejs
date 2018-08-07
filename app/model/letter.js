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
    type: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '0普通私信，1系统消息',
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
    is_block: {
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
        name: 'key_is_delete_user_id_is_block',
        fields: ['key', 'is_delete', 'user_id', 'is_block'],
      },
      {
        name: 'target_id_is_delete_is_read_is_block',
        fields: ['target_id', 'is_delete', 'is_read', 'is_block'],
      },
      {
        name: 'user_id_target_id_is_delete_is_read_is_block',
        fields: ['user_id', 'target_id', 'is_delete', 'is_read', 'is_block'],
      }
    ],
    comment: '私信基本信息',
  });
};
