"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { STRING } = Sequelize;
    return queryInterface.addColumn("base_users", "avatar", STRING(64));
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("base_users", "avatar");
  }
};
