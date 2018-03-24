/**
 * Created by army8735 on 2018/1/29.
 */

'use strict';

module.exports = app => {
  const { sequelizeCircling, Sequelize } = app;
  return sequelizeCircling.define('works_state', {
    id: {
      type: Sequelize.SMALLINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    type: {
      type: Sequelize.SMALLINT.UNSIGNED,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(32),
      allowNull: false,
      defaultValue: '',
    },
    is_deleted: {
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
        unique: true,
        fields: ['type'],
      }
    ],
    comment: '大作品状态',
  });
};