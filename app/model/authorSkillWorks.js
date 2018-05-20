/**
 * Created by army8735 on 2018/5/19.
 */

'use strict';

module.exports = app => {
  const { sequelizeCircling, Sequelize } = app;
  return sequelizeCircling.define('author_skill_works', {
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
    skill_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    profession_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    create_time: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  }, {
    indexes: [
      {
        name: 'author_id_works_id_profession_id',
        unique: true,
        fields: ['author_id', 'works_id', 'profession_id'],
      },
      {
        name: 'author_id_skill_id_works_id',
        fields: ['author_id', 'skill_id', 'works_id'],
      }
    ],
    comment: '作者技能大作品',
  });
};
