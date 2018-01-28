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
    state: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
      comment: '0删除，1正常，2红名单，3黑名单',
    },
    reg_state: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '0初始化，1披马甲改名字，2-9填名字，10作者公开或选关注，11选关注作者，99普通完成，100作者完成',
    },
    name: {
      type: Sequelize.STRING(32),
      allowNull: false,
      unique: true,
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
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
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
        fields: ['name'],
      }
    ],
    comment: '用户基本信息',
  });
};
