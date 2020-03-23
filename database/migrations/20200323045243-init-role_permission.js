"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { DATE, INTEGER, STRING } = Sequelize;
    return queryInterface.createTable("role_permissions", {
      role_id: { type: STRING(12), primaryKey: true },
      permission_id: { type: STRING(12), primaryKey: true },
      config: STRING(200),
      created_at: DATE,
      updated_at: DATE
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("role_permissions");
  }
};
