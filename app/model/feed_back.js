"use strict";

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const BaseUser = app.model.define("feed_back", {
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

  return BaseUser;
};
