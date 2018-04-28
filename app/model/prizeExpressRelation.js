/**
 * Created by army8735 on 2018/4/17.
 */

'use strict';

module.exports = app => {
  const { sequelizeMall, Sequelize } = app;
  return sequelizeMall.define('prize_express_relation', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    prize_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    express_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
  }, {
    indexes: [
      {
        name: 'prize_id_express_id',
        unique: true,
        fields: ['prize_id', 'express_id'],
      },
      {
        name: 'express_id',
        fields: ['express_id'],
      }
    ],
    comment: '奖品信息',
  });
};
