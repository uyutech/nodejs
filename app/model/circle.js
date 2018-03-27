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
      type: Sequelize.TEXT,
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
    state: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '0删除，1隐藏，2公开',
    },
    type: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '0普通，1作者粉丝圈，2IP圈，3作品类型圈（音乐、美图等），4职种圈（演唱、演奏等）',
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
    comment: '圈子基本信息',
  });
};
