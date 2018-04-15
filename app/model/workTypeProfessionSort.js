/**
 * Created by army8735 on 2018/4/15.
 */

'use strict';

module.exports = app => {
  const { sequelizeCircling, Sequelize } = app;
  return sequelizeCircling.define('work_type_profession_sort', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    work_type: {
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
        name: 'work_type_weight_profession_id',
        unique: true,
        fields: ['work_type', 'group', 'profession_id'],
      }
    ],
    comment: '小作品职种排序',
  });
};
