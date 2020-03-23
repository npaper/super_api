"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "roles",
      [
        {
          id: "admin",
          name: "超级管理员", // 中文名称
          creator_id: 1, // 创建者
          describe: "超级管理员", // 描述
          status: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: "work",
          name: "员工",
          creator_id: 1,
          status: 1,
          describe: "员工",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: "master",
          name: "运营",
          creator_id: 1,
          status: 1,
          describe: "运营",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: "test",
          name: "测试",
          creator_id: 1,
          status: 1,
          describe: "测试",
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("roles", null, {});
  }
};
