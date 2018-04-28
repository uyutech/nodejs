/**
 * Created by army8735 on 2018/4/18.
 */

'use strict';

module.exports = app => {
  const { sequelizeStats, Sequelize } = app;
  return sequelizeStats.define('user_visit', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    uuid: {
      type: Sequelize.CHAR(32),
      allowNull: false,
    },
    uid: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    ip: {
      type: Sequelize.STRING(32),
      allowNull: false,
    },
    platform: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '0未知，1PC，2移动，3安卓，4iOS',
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    },
    search: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    },
    first: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    create_time: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  }, {
    indexes: [
      {
        name: 'uid',
        fields: ['uid'],
      },
      {
        name: 'create_time',
        fields: ['create_time'],
      }
    ],
    comment: '用户访问记录',
  });
};
