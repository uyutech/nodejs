/**
 * Created by army8735 on 2018/7/27.
 */

'use strict';

module.exports = app => {
  const { sequelizeCircling, Sequelize } = app;
  return sequelizeCircling.define('work_type_profession_relation', {
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
        name: 'work_type_profession_id',
        unique: true,
        fields: ['work_type', 'profession_id'],
      },
      {
        name: 'work_type_profession_id_weight',
        fields: ['work_type', 'profession_id', 'weight'],
      }
    ],
    comment: '小作品约稿上传关联职种',
  });
};
