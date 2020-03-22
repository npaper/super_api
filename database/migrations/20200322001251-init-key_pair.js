"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { DATE, STRING } = Sequelize;
    return queryInterface.createTable("key_pairs", {
      key: { type: STRING(12), primaryKey: true },
      value: STRING(200),
      created_at: DATE,
      updated_at: DATE
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("key_pairs");
  }
};
