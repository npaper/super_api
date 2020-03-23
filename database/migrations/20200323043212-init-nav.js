"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { DATE, INTEGER, STRING } = Sequelize;
    return queryInterface
      .createTable("tb_navs", {
        key: { type: STRING(12), primaryKey: true }, // 键
        creator_id: INTEGER, // 创建者
        describe: STRING(24), // 描述
        parent_key: STRING(12),
        created_at: DATE,
        updated_at: DATE
      })
      .then(() => {
        queryInterface.addIndex("tb_navs", ["key"], { unique: true });
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("tb_navs");
  }
};
