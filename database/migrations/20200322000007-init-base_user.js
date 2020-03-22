"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    return queryInterface.createTable("base_users", {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(12),
      nick_name: STRING(12),
      created_at: DATE,
      updated_at: DATE,
      email: STRING(24),
      birthday: DATE,
      sex: INTEGER,
      password: STRING(64),
      phone_code: STRING(11),
      third_code: STRING(45)
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("base_users");
  }
};
