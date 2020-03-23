"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "permissions",
      [
        {
          id: "dashboard",
          name: "仪表盘",
          creator_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },

        {
          id: "exception",
          name: "页面异常权限",
          creator_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },

        {
          id: "permission",
          name: "权限管理",
          creator_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },

        {
          id: "role",
          name: "角色管理",
          creator_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },

        {
          id: "support",
          name: "超级模块",
          creator_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },

        {
          id: "home",
          name: "主页",
          creator_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },

        {
          id: "manager",
          name: "数据管理",
          creator_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },

        {
          id: "user",
          name: "用户管理",
          creator_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("permissions", null, {});
  }
};
