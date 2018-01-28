/**
 * Created by army8735 on 2018/1/27.
 */

'use strict';

module.exports = app => {
  const { sequelizeStats, Sequelize } = app;
  return sequelizeStats.define('work_text', {
    work_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      primaryKey: true,
      // unique: true,
      allowNull: false,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: '',
    },
  }, {
    indexes: [
      {
        unique: true,
        fields: ['work_id'],
      }
    ],
    comment: '文本类小作品扩展信息',
  });
};
