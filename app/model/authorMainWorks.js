/**
 * Created by army8735 on 2018/3/30.
 */

'use strict';

module.exports = app => {
  const { sequelizeCircling, Sequelize } = app;
  return sequelizeCircling.define('author_main_works', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    author_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
    },
    works_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
    },
    weight: {
      type: Sequelize.SMALLINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    is_deleted: {
      type: Sequelize.TINYINT.UNSIGNED,
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
        name: 'author_id_works_id',
        unique: true,
        fields: ['author_id', 'works_id'],
      },
      {
        name: 'author_id_works_id_weight',
        fields: ['author_id', 'works_id', 'weight'],
      }
    ],
    comment: '作者主打作品列表',
  });
};
