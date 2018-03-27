/**
 * Created by army8735 on 2018/3/27.
 */

'use strict';

module.exports = app => {
  const { sequelizeCircling, Sequelize } = app;
  return sequelizeCircling.define('works_type_profession_sort', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    works_type: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    group: {
      type: Sequelize.SMALLINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    weight: {
      type: Sequelize.SMALLINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    profession_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
  }, {
    indexes: [
      {
        name: 'works_type_weight_profession_id',
        unique: true,
        fields: ['works_type', 'group', 'profession_id'],
      }
    ],
    comment: '大作品职种排序',
  });
};
