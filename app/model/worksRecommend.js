/**
 * Created by army8735 on 2018/1/29.
 */

'use strict';

module.exports = app => {
  const { sequelizeCircling, Sequelize } = app;
  return sequelizeCircling.define('works_recommend', {
    id: {
      type: Sequelize.SMALLINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    works_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
    },
    type: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '0普适场景',
    },
    weight: {
      type: Sequelize.TINYINT.UNSIGNED,
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
        unique: true,
        fields: ['type', 'works_id'],
      },
      {
        fields: ['type', 'weight'],
      }
    ],
    comment: '推荐作品展示',
  });
};
