/**
 * Created by army8735 on 2018/8/15.
 */

'use strict';

module.exports = app => {
  const { sequelizeCircling, Sequelize } = app;
  return sequelizeCircling.define('works_type_profession_relation', {
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
    show: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: '是否直接显示',
    },
    required: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: '是否必填',
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
        name: 'works_type_profession_id',
        unique: true,
        fields: ['works_type', 'profession_id'],
      },
      {
        name: 'works_type_profession_id_weight',
        fields: ['works_type', 'profession_id', 'weight'],
      }
    ],
    comment: '大作品约稿上传关联职种',
  });
};
