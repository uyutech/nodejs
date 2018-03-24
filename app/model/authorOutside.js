/**
 * Created by army8735 on 2018/1/26.
 */

'use strict';

module.exports = app => {
  const { sequelizeCircling, Sequelize } = app;
  return sequelizeCircling.define('author_outside', {
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
    is_deleted: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    type: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
    },
    url: {
      type: Sequelize.STRING,
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
        unique: true,
        fields: ['author_id', 'type'],
      }
    ],
    comment: '作者站外链接',
  });
};
