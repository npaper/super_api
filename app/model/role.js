"use strict";

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Model = app.model.define("role", {
    id: { type: STRING(12), primaryKey: true },
    name: STRING(12), // 中文名称
    creator_id: INTEGER, // 创建者
    describe: STRING(24), // 描述
    status: INTEGER, // 状态 1 正常 2 禁用 3 待删除
    created_at: DATE,
    updated_at: DATE
  });
  return Model;
};
