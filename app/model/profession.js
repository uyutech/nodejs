/**
 * Created by army8735 on 2018/1/28.
 */

'use strict';

module.exports = app => {
  const { sequelizeCircling, Sequelize } = app;
  return sequelizeCircling.define('profession', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      // unique: true,
      autoIncrement: true,
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
    category: {
      type: Sequelize.SMALLINT.UNSIGNED,
      allowNull: false,
    },
    category_name: {
      type: Sequelize.STRING(16),
      allowNull: false,
      defaultValue: '',
    },
    desc: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    },
    code: {
      type: Sequelize.SMALLINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
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
        fields: ['type', 'category'],
      }
    ],
    comment: '职种信息',
  });
};
