"use strict";

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Model = app.model.define("permission", {
    id: { type: STRING(12), primaryKey: true },
    name: STRING(12), // 中文名称
    creator_id: INTEGER, // 创建者
    describe: STRING(24), // 描述
    created_at: DATE,
    updated_at: DATE
  });

  Model.associate = function() {
    app.model.Permission.belongsTo(app.model.BaseUser, {
      foreignKey: "creator_id",
      as: "buser"
    });

    // app.model.PermissionAction.belongsTo(app.model.Permission, {
    //   foreignKey: "permission_id"
    // });

    app.model.Permission.hasMany(app.model.PermissionAction, {
      foreignKey: "permission_id",
      targetKey: "id",
      as: "actions"
    });

    app.model.Permission.belongsToMany(app.model.Role, {
      through: {
        model: app.model.RolePermission,
        unique: false
      },
      foreignKey: "permission_id",
      constraints: false
    });

    // app.model.Permission.belongsToMany(app.model.Role, {
    //   through: {
    //     model: app.model.RolePermission,
    //     unique: false
    //   },
    //   foreignKey: "permission_id",
    //   constraints: false
    // });

    // app.model.Role.belongsToMany(app.model.Permission, {
    //   through: {
    //     model: app.model.RolePermission,
    //     unique: false
    //   },
    //   foreignKey: "role_id",
    //   constraints: false
    // });

    // app.model.RolePermission.belongsTo(app.model.Permission, {
    //   foreignKey: "permission_id"
    // });
    // app.model.Permission.hasMany(app.model.RolePermission, {
    //   foreignKey: "permission_id",
    //   targetKey: "id"
    // });
  };

  return Model;
};
