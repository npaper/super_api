"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { DATE, STRING, BOOLEAN } = Sequelize;
    return queryInterface.createTable("permission_actions", {
      key: { type: STRING(12), primaryKey: true },
      permission_id: { type: STRING(12), primaryKey: true },
      name: STRING(12),
      describe: STRING(24), // 描述
      path: STRING(24),
      default_value: BOOLEAN,
      created_at: DATE,
      updated_at: DATE
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("permission_actions");
  }
};
