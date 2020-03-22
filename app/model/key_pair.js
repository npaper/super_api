"use strict";

module.exports = app => {
  const { STRING, DATE } = app.Sequelize;
  const BaseUser = app.model.define("key_pair", {
    key: { type: STRING(12), primaryKey: true },
    value: STRING(200),
    created_at: DATE,
    updated_at: DATE
  });

  return BaseUser;
};
