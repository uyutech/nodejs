/**
 * Created by army8735 on 2018/7/13.
 */

'use strict';

module.exports = app => {
  const { sequelizeActivity, Sequelize } = app;
  return sequelizeActivity.define('jsgm', {
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
    name: {
      type: Sequelize.STRING(32),
      allowNull: false,
      defaultValue: '',
    },
    title: {
      type: Sequelize.STRING(32),
      allowNull: false,
      defaultValue: '',
    },
    inspiration: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: '',
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: '',
    },
    relate: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: '',
    },
    refer: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    },
    history: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    },
    is_prize: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    popular: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
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
        name: 'is_prize_id',
        fields: ['is_prize', 'id'],
      },
      {
        name: 'popular_id',
        fields: ['popular', 'id'],
      }
    ],
    comment: '词作征集',
  });
};
