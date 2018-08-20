/**
 * Created by army8735 on 2018/8/20.
 */

'use strict';

module.exports = app => {
  const { sequelizeActivity, Sequelize } = app;
  return sequelizeActivity.define('activity_sczl', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    origin_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
    },
    works_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
    },
    is_prize: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: '是否人气奖',
    },
    dry: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: '',
    },
    prize: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    popular: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
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
        name: 'works_id',
        unique: true,
        fields: ['works_id'],
      },
      {
        name: 'is_prize_create_time',
        fields: ['is_prize', 'create_time'],
      },
      {
        name: 'is_delete_create_time',
        fields: ['is_delete', 'create_time'],
      },
      {
        name: 'is_delete_popular_create_time',
        fields: ['is_delete', 'popular', 'create_time'],
      }
    ],
    comment: '活动上传翻唱作品信息',
  });
};
