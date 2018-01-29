/**
 * Created by army8735 on 2018/1/29.
 */

'use strict';

module.exports = app => {
  const { sequelizeStats, Sequelize } = app;
  return sequelizeStats.define('user_profile_record', {
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
    type: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      comment: '0修改头像，1修改名称',
    },
    update_time: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  }, {
    indexes: [
      {
        fields: ['user_id'],
      }
    ],
    comment: '用户修改信息记录',
  });
};
