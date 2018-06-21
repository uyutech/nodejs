/**
 * Created by army8735 on 2018/5/22.
 */

'use strict';

module.exports = app => {
  const { sequelizeCircling, Sequelize } = app;
  return sequelizeCircling.define('letter_recent', {
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
    letter_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    update_time: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  }, {
    indexes: [
      {
        name: 'user_id_target_id',
        unique: true,
        fields: ['user_id', 'target_id'],
      },
      {
        name: 'user_id_update_time',
        fields: ['user_id', 'update_time'],
      },
      {
        name: 'target_id_update_time',
        fields: ['target_id', 'update_time'],
      }
    ],
    comment: '最近私信对话列表',
  });
};
