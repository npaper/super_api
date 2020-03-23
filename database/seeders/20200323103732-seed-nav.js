"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "tb_navs",
      [
        {
          key: "Dashboard",
          creator_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
          describe: "仪表盘"
        },
        {
          key: "Analysis",
          parent_key: "Dashboard",
          creator_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
          describe: "分析页"
        },
        {
          key: "Home",
          creator_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
          describe: "首页"
        },
        {
          key: "HomeIndex",
          parent_key: "Home",
          creator_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
          describe: "首页"
        },
        {
          key: "Manager",
          creator_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
          describe: "数据管理"
        },
        {
          key: "User",
          parent_key: "Manager",
          creator_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
          describe: "用户管理"
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("tb_navs", null, {});
  }
};
