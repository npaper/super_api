"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { DATE, INTEGER, STRING } = Sequelize;
    return queryInterface.createTable("tb_navs", {
      key: STRING(12), // 键
      creator_id: INTEGER, // 创建者
      describe: STRING(24), // 描述
      private_Key: STRING(12),
      created_at: DATE,
      updated_at: DATE
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("tb_navs");
  }
};
