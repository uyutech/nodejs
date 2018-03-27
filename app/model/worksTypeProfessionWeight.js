/**
 * Created by army8735 on 2018/3/27.
 */

'use strict';

module.exports = app => {
  const { sequelizeCircling, Sequelize } = app;
  return sequelizeCircling.define('works_type_profession_weight', {
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
    profession_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    weight: {
      type: Sequelize.SMALLINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    indexes: [
      {
        name: 'works_type_profession_id_weight',
        unique: true,
        fields: ['works_type', 'profession_id', 'weight'],
      }
    ],
    comment: '大作品职种排序',
  });
};
