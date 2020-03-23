"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { DATE, INTEGER, STRING } = Sequelize;
    return queryInterface.createTable("key_pairs", {
      key: { type: STRING(24), primaryKey: true },
      value: STRING(200),
      created_at: DATE,
      updated_at: DATE,
      user_id: INTEGER
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("key_pairs");
  }
};
