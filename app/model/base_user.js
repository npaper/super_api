"use strict";

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const BaseUser = app.model.define("base_user", {
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

  return BaseUser;
};
