/**
 * Created by army8735 on 2018/5/21.
 */

'use strict';

module.exports = app => {
  const { sequelizeCircling, Sequelize } = app;
  return sequelizeCircling.define('dialog', {
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
  }, {
    indexes: [
      {
        name: 'user_id_target_id_letter_id',
        unique: true,
        fields: ['user_id', 'target_id', 'letter_id'],
      }
    ],
    comment: '对话列表',
  });
};
