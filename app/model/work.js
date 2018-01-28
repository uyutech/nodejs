/**
 * Created by army8735 on 2018/1/27.
 */

'use strict';

module.exports = app => {
  const { sequelizeCircling, Sequelize } = app;
  return sequelizeCircling.define('work', {
    id: {
      type: Sequelize.BIGINT.UNSIGNED,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING(32),
      allowNull: false,
      defaultValue: '',
    },
    sub_title: {
      type: Sequelize.STRING(32),
      allowNull: false,
      defaultValue: '',
    },
    class: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      comment: '0图片pic类扩展，1媒体media类扩展，2文本text类扩展',
    },
    type: {
      type: Sequelize.SMALLINT.UNSIGNED,
      allowNull: false,
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    },
    state: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '0删除，1正常，2待审，3仅自己可见',
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
        fields: ['title'],
      }
    ],
    comment: '小作品基本信息',
  });
};
