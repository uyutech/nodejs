/**
 * Created by army8735 on 2018/4/4.
 */

'use strict';

module.exports = app => {
  const { sequelizeCircling, Sequelize } = app;
  return sequelizeCircling.define('recommend', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    tag: {
      type: Sequelize.SMALLINT.UNSIGNED,
      allowNull: false,
    },
    type: {
      type: Sequelize.SMALLINT.UNSIGNED,
      allowNull: false,
      comment: '1大作品，2音乐专辑，3相册，4作者列表，5大作品列表，6画圈',
    },
    cover: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    },
    title: {
      type: Sequelize.STRING(32),
      allowNull: false,
      defaultValue: '',
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: '',
    },
    describe: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: '',
    },
    weight: {
      type: Sequelize.SMALLINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    is_delete: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    indexes: [
      {
        name: 'tag_weight_is_delete',
        fields: ['tag', 'weight', 'is_delete'],
      }
    ],
    comment: '推荐内容',
  });
};
