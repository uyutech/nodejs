/**
 * Created by army8735 on 2018/4/17.
 */

'use strict';

module.exports = app => {
  const { sequelizeMall, Sequelize } = app;
  return sequelizeMall.define('express', {
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
    product_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(32),
      allowNull: false,
      defaultValue: '',
    },
    phone: {
      type: Sequelize.STRING(32),
      allowNull: false,
      defaultValue: '',
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    },
    state: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      comment: '1未发货，2已发货，3已收货',
    },
    message: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
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
        name: 'user_id',
        fields: ['user_id'],
      }
    ],
    comment: '快递信息',
  });
};
