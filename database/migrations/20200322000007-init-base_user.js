"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    return queryInterface
      .createTable("base_users", {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        account_name: STRING(12),
        nick_name: STRING(12),

        status: INTEGER,
        creator_id: INTEGER,
        role_id: STRING(12),

        email: STRING(24),
        birthday: DATE,
        sex: INTEGER,

        password: STRING(64),
        avatar: STRING(200),

        created_at: DATE,
        updated_at: DATE
      })
      .then(() => {
        queryInterface.addIndex("base_users", ["id"], { unique: true });
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("base_users");
  }
};
