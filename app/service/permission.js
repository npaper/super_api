const Service = require("egg").Service;
const sequelize = require("sequelize");
const { or, like } = sequelize.Op;

class MyService extends Service {
  list(limit, offset, searchParam) {
    const ctx = this.ctx;
    var query = {
      limit,
      offset,
      order: [["updated_at", "DESC"]],
      include: {
        model: ctx.model.BaseUser,
        as: "buser",
        attributes: ["account_name", "nick_name"]
      },
      include: {
        model: ctx.model.PermissionAction,
        as: "actions",
      },
    };
    if (searchParam && searchParam.trim().length > 0) {
      query.where = {
        [or]: {
          id: searchParam,
          name: { [like]: `%${searchParam}%` }
        }
      };
    }
    return ctx.model.Permission.findAndCountAll(query);
  }

  listActions(permissionIds) {
    return this.ctx.model.PermissionAction.findAll({
      where: {
        permission_id: {
          [sequelize.Op.in]: permissionIds
        }
      }
    });
  }

  async store(permission) {
    var p0 = await this.ctx.model.Permission.findByPk(permission.id);
    if (!p0) {
      return await this.ctx.model.Permission.create(permission);
    } else {
      return await p0.update(permission);
    }
  }

  async storeAction(action) {
    var p0 = await this.ctx.model.PermissionAction.findOne({
      where: {
        key: action.key,
        permission_id: action.permission_id
      }
    });
    if (!p0) {
      return await this.ctx.model.PermissionAction.create(action);
    } else {
      return await p0.update(action);
    }
  }

  async removeAction(key, permission_id) {
    var p0 = await this.ctx.model.PermissionAction.findOne({
      where: {
        key: key,
        permission_id: permission_id
      }
    });
    if (p0) {
      await p0.destroy();
      return true;
    }
    return false;
  }

  async remove(ids) {
    await this.ctx.model.Permission.destroy({
      where: {
        id: {
          [sequelize.Op.in]: ids
        }
      }
    });
    await this.ctx.model.RolePermission.destroy({
      where: {
        permission_id: {
          [sequelize.Op.in]: ids
        }
      }
    });
    await this.ctx.model.PermissionAction.destroy({
      where: {
        permission_id: {
          [sequelize.Op.in]: ids
        }
      }
    });
    return false;
  }
}

module.exports = MyService;
