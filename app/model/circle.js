/**
 * Created by army8735 on 2018/1/28.
 */

'use strict';

module.exports = app => {
  const { sequelizeCircling, Sequelize } = app;
  return sequelizeCircling.define('circle', {
    id: {
      type: Sequelize.BIGINT.UNSIGNED,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(32),
      allowNull: false,
      unique: true,
    },
    describe: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    },
    banner: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    },
    cover: {
      type: Sequelize.STRING,
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
        fields: ['name'],
      }
    ],
    comment: '圈子基本信息',
  });
};
