"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    return queryInterface.createTable("feed_backs", {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      title: STRING(20),
      reason: STRING(200),
      created_at: DATE,
      email: STRING(24),
      user_id: INTEGER,
      platform: STRING(12),
      images: STRING(200),
      extra: STRING(24)
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("feed_backs");
  }
};
