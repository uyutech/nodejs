/**
 * Created by army8735 on 2018/7/27.
 */

'use strict';

module.exports = app => {
  const { sequelizeCircling, Sequelize } = app;
  return sequelizeCircling.define('works_type_work_type_relation', {
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
    work_type: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    upload: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    indexes: [
      {
        name: 'works_type_work_type',
        unique: true,
        fields: ['works_type', 'work_type'],
      },
      {
        name: 'works_type_upload',
        fields: ['works_type', 'upload'],
      }
    ],
    comment: '大小作品种类关联关系',
  });
};
