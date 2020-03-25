"use strict";

module.exports = app => {
  const { STRING, BOOLEAN, DATE } = app.Sequelize;
  const Model = app.model.define("permission_action", {
    key: { type: STRING(12), primaryKey: true },
    permission_id: { type: STRING(12), primaryKey: true },
    name: STRING(12),
    describe: STRING(24), // 描述
    path: STRING(24),
    default_value: BOOLEAN,
    created_at: DATE,
    updated_at: DATE
  });
  return Model;
};
