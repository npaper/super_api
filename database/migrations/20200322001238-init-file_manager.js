"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    return queryInterface.createTable("file_managers", {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      path: STRING(200),
      name: STRING(45),
      created_at: DATE,
      updated_at: DATE,
      group: STRING(48),
      md5: STRING(64),
      user_id: INTEGER,
      type: STRING(12)
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("file_managers");
  }
};
