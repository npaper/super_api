"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { DATE, INTEGER, STRING, ARRAY } = Sequelize;
    return queryInterface.createTable("permissions", {
      id: { type: STRING(12), primaryKey: true },
      name: STRING(12), // 中文名称
      creator_id: INTEGER, // 创建者
      describe: STRING(24), // 描述
      created_at: DATE,
      updated_at: DATE
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("permissions");
  }
};
