/**
 * Created by army8735 on 2018/1/29.
 */

'use strict';

module.exports = app => {
  const { sequelizeCircling, Sequelize } = app;
  return sequelizeCircling.define('work_num', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    work_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
    },
    type: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      comment: '1播放数',
    },
    num: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    update_time: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  }, {
    indexes: [
      {
        name: 'work_id_type',
        unique: true,
        fields: ['work_id', 'type'],
      },
    ],
    comment: '小作品相关数字汇总',
  });
};
