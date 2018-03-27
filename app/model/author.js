/**
 * Created by army8735 on 2018/1/26.
 */

'use strict';

module.exports = app => {
  const { sequelizeCircling, Sequelize } = app;
  return sequelizeCircling.define('author', {
    id: {
      type: Sequelize.BIGINT.UNSIGNED,
      primaryKey: true,
      allowNull: false,
    },
    type: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      comment: '0个人，1组合，2团体，3虚拟',
    },
    name: {
      type: Sequelize.STRING(32),
      allowNull: false,
    },
    fans_name: {
      type: Sequelize.STRING(32),
      allowNull: false,
      defaultValue: '',
    },
    fans_circle_name: {
      type: Sequelize.STRING(32),
      allowNull: false,
      defaultValue: '',
    },
    head_url: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    },
    is_settled: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    sign: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    },
    is_deleted: {
      type: Sequelize.TINYINT.UNSIGNED,
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
        name: 'name',
        unique: true,
        fields: ['name'],
      }
    ],
    comment: '作者基本信息',
  });
};
