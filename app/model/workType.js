/**
 * Created by army8735 on 2018/1/27.
 */

'use strict';

module.exports = app => {
  const { sequelizeCircling, Sequelize } = app;
  return sequelizeCircling.define('work_type', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      // unique: true,
      autoIncrement: true,
      allowNull: false,
    },
    type: {
      type: Sequelize.SMALLINT.UNSIGNED,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(16),
      allowNull: false,
      defaultValue: '',
    },
    category: {
      type: Sequelize.SMALLINT.UNSIGNED,
      allowNull: false,
      comment: '0图片，1音频，2视频，3文本',
    },
    category_name: {
      type: Sequelize.STRING(16),
      allowNull: false,
      defaultValue: '',
    },
    code: {
      type: Sequelize.SMALLINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    state: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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
        unique: true,
        fields: ['type', 'category'],
      }
    ],
    comment: '小作品类型',
  });
};
