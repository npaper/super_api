"use strict";

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Model = app.model.define("tb_nav", {
    key: { type: STRING(12), primaryKey: true }, // 键
    creator_id: INTEGER, // 创建者
    describe: STRING(24), // 描述
    parent_key: STRING(12),
    created_at: DATE,
    updated_at: DATE
  });
  return Model;
};
