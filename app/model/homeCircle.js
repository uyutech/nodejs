/**
 * Created by army8735 on 2018/8/11.
 */

'use strict';

module.exports = app => {
  const { sequelizeRecommend, Sequelize } = app;
  return sequelizeRecommend.define('home_circle', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    circle_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
    },
    weight: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    indexes: [
      {
        name: 'circle_id',
        unique: true,
        fields: ['circle_id'],
      },
      {
        name: 'weight',
        fields: ['weight'],
      }
    ],
    comment: '推荐圈子',
  });
};
