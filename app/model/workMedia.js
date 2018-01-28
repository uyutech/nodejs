/**
 * Created by army8735 on 2018/1/27.
 */

'use strict';

module.exports = app => {
  const { sequelizeStats, Sequelize } = app;
  return sequelizeStats.define('work_media', {
    work_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      primaryKey: true,
      // unique: true,
      allowNull: false,
    },
    width: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    height: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    time: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    rate: {
      type: Sequelize.SMALLINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    cover: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    },
    lrc: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: '',
    },
  }, {
    indexes: [
    ],
    comment: '媒体类小作品扩展信息',
  });
};
