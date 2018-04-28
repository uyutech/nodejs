/**
 * Created by army8735 on 2018/1/27.
 */

'use strict';

module.exports = app => {
  const { sequelizeCircling, Sequelize } = app;
  return sequelizeCircling.define('work', {
    // id: {
    //   type: Sequelize.INTEGER.UNSIGNED,
    //   primaryKey: true,
    //   autoIncrement: true,
    //   allowNull: false,
    // },
    id: {
      type: Sequelize.BIGINT.UNSIGNED,
      primaryKey: true,
      allowNull: false,
    },
    // title: {
    //   type: Sequelize.STRING(32),
    //   allowNull: false,
    //   defaultValue: '',
    // },
    kind: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '0未知，1视频，2音频，3图片，4文字',
    },
    // type: {
    //   type: Sequelize.SMALLINT.UNSIGNED,
    //   allowNull: false,
    //   defaultValue: 0,
    // },
    // is_delete: {
    //   type: Sequelize.TINYINT.UNSIGNED,
    //   allowNull: false,
    //   defaultValue: 1,
    //   comment: '0删除，1正常',
    // },
    // create_time: {
    //   type: Sequelize.DATE,
    //   allowNull: false,
    //   defaultValue: Sequelize.NOW,
    // },
    // update_time: {
    //   type: Sequelize.DATE,
    //   allowNull: false,
    //   defaultValue: Sequelize.NOW,
    // },
  }, {
    indexes: [
    ],
    comment: '小作品基本信息',
  });
};
