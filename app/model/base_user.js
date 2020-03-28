"use strict";

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const BaseUser = app.model.define("base_user", {
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
  });

  BaseUser.associate = function() {
    app.model.BaseUser.hasOne(app.model.BaseUser, {
      foreignKey: "creator_id",
      as: "buser"
    });

    // app.model.BaseUser.hasOne(app.model.Role, { foreignKey: "role_id" });
  };

  return BaseUser;
};
