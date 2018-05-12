/**
 * Created by army8735 on 2018/1/27.
 */

'use strict';

module.exports = app => {
  const { sequelizeCircling, Sequelize } = app;
  return sequelizeCircling.define('works_type', {
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
  }, {
    indexes: [
      {
        name: 'name',
        unique: true,
        fields: ['name'],
      }
    ],
    comment: '大作品类型',
  });
};