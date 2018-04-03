/**
 * Created by army8735 on 2018/3/24.
 */

'use strict';

module.exports = app => {
  const { sequelizeCircling, Sequelize } = app;
  return sequelizeCircling.define('image_album_work_relation', {
    id: {
      type: Sequelize.SMALLINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    album_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
    },
    work_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
    },
    works_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
      comment: '引用大作品id',
    },
    is_delete: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    kind: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '3图片',
    },
    weight: {
      type: Sequelize.SMALLINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    tag: {
      type: Sequelize.STRING(32),
      allowNull: false,
      defaultValue: '',
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
        name: 'album_id_work_id',
        unique: true,
        fields: ['album_id', 'work_id'],
      }
    ],
    comment: '大作品小作品关系',
  });
};
