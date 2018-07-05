/**
 * Created by army8735 on 2018/7/5.
 */

'use strict';

module.exports = app => {
  const { sequelizeActivity, Sequelize } = app;
  return sequelizeActivity.define('activity_character', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(32),
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
        name: 'name',
        fields: ['name'],
      }
    ],
    comment: '活动绘画角色信息',
  });
};
