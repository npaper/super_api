"use strict";

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const BaseUser = app.model.define("key_pair", {
    key: { type: STRING(24), primaryKey: true },
    value: STRING(200),
    created_at: DATE,
    updated_at: DATE,
    user_id: INTEGER
  });

  return BaseUser;
};
