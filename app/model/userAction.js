/**
 * Created by army8735 on 2018/5/14.
 */

'use strict';

module.exports = app => {
  const { sequelizeStats, Sequelize } = app;
  return sequelizeStats.define('user_action', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    action_id: {
      type: Sequelize.INTEGER.UNSIGNED,
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
    param: {
      type: Sequelize.JSON,
    },
    create_time: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  }, {
    indexes: [
      {
        name: 'create_time_uuid',
        fields: ['create_time', 'uuid'],
      }
    ],
    comment: '用户行为记录',
  });
};
