"use strict";

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Model = app.model.define("role_permission", {
    role_id: { type: STRING(12), primaryKey: true },
    permission_id: { type: STRING(12), primaryKey: true },
    config: STRING(200),
    created_at: DATE,
    updated_at: DATE
  });
  return Model;
};
