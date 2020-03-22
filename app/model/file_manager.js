"use strict";

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const BaseUser = app.model.define("file_manager", {
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

  return BaseUser;
};
