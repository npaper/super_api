"use strict";

const md5 = require("md5");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "base_users",
      [
        {
          account_name: "admin",
          nick_name: "超级管理员",

          status: 1,
          creator_id: 1,
          role_id: "admin",

          email: "1570395652@qq.com",
          birthday: "1994-05-05",
          sex: 1,

          password: md5("admin"),
          avatar:
            "https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png",

          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("base_users", null, {});
  }
};
