/**
 * Created by army8735 on 2018/4/16.
 */

'use strict';

module.exports = app => {
  const { sequelizeMall, Sequelize } = app;
  return sequelizeMall.define('product', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    cover: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    },
    describe: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: '',
    },
    price: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    discount: {
      type: Sequelize.FLOAT.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
    },
    is_delete: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
    comment: '商品基本信息',
  });
};
