/**
 * Created by army8735 on 2018/4/4.
 */

'use strict';

module.exports = app => {
  const { sequelizeRecommend, Sequelize } = app;
  return sequelizeRecommend.define('find_tag', {
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
    kind: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '0总体，1视频，2音频，3图片，4文字',
    },
    is_delete: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    weight: {
      type: Sequelize.SMALLINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    indexes: [
      {
        name: 'name',
        unique: true,
        fields: ['name'],
      },
      {
        name: 'weight',
        fields: ['weight'],
      }
    ],
    comment: '推荐标签',
  });
};
