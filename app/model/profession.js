/**
 * Created by army8735 on 2018/1/28.
 */

'use strict';

module.exports = app => {
  const { sequelizeCircling, Sequelize } = app;
  return sequelizeCircling.define('profession', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    type: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    type_name: {
      type: Sequelize.STRING(32),
      allowNull: false,
      defaultValue: '',
      comment: '职业如演奏、作曲等',
    },
    kind: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    kind_name: {
      type: Sequelize.STRING(32),
      allowNull: false,
      defaultValue: '',
      comment: '工种如笛、箫等',
    },
  }, {
    indexes: [
      {
        name: 'type_kind',
        unique: true,
        fields: ['type', 'kind'],
      }
    ],
    comment: '职种信息',
  });
};
