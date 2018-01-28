/**
 * Created by army8735 on 2018/1/28.
 */

'use strict';

module.exports = app => {
  const { sequelizeCircling, Sequelize } = app;
  return sequelizeCircling.define('profession', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      autoIncrement: true,
      // unique: true,
      allowNull: false,
    },
    type: {
      type: Sequelize.SMALLINT.UNSIGNED,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(16),
      allowNull: false,
      defaultValue: '',
    },
    state: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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
        unique: true,
        fields: ['id'],
      },
      {
        unique: true,
        fields: ['type'],
      }
    ],
    comment: '技能信息',
  });
};

