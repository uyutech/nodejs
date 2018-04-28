/**
 * Created by army8735 on 2018/4/16.
 */

'use strict';

module.exports = app => {
  const { sequelizeMall, Sequelize } = app;
  return sequelizeMall.define('prize', {
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
    state: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      comment: '1未发货，2已申请发货',
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
    comment: '奖品信息',
  });
};
