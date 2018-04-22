/**
 * Created by army8735 on 2018/1/28.
 */

'use strict';

module.exports = app => {
  const { sequelizeCircling, Sequelize } = app;
  return sequelizeCircling.define('user', {
    id: {
      type: Sequelize.BIGINT.UNSIGNED,
      primaryKey: true,
      allowNull: false,
    },
    reg_state: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '10改用户名，11选关注圈子，12选关注人，99完成',
    },
    nickname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    sex: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '0未知，1男，2女，3双',
    },
    head_url: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    },
    sign: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    },
    coins: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    is_delete: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    state: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
      comment: '1正常，2假账号',
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
        name: 'nickname',
        unique: true,
        fields: ['nickname'],
      }
    ],
    comment: '用户基本信息',
  });
};
