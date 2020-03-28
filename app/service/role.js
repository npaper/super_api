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
      include: [
        {
          model: ctx.model.BaseUser,
          as: "buser",
          attributes: ["account_name", "nick_name"]
        },
        {
          model: ctx.model.Permission,
        }
      ]
    };
    if (searchParam && searchParam.trim().length > 0) {
      query.where = {
        [or]: {
          id: searchParam,
          name: { [like]: `%${searchParam}%` }
        }
      };
    }

    return ctx.model.Role.findAndCountAll(query);
  }

  async store(role) {
    var p0 = await this.ctx.model.Role.findByPk(role.id);
    if (!p0) {
      return await this.ctx.model.Role.create({
        status: 1,
        ...role
      });
    } else {
      return await p0.update(role);
    }
  }

  async setStatus(id, status) {
    var p0 = await this.ctx.model.Role.findByPk(id);
    if (p0) {
      p0.update({
        status: status
      });
      return true;
    }
    return false;
  }

  async remove(ids) {
    await this.ctx.model.Role.destroy({
      where: {
        id: { [sequelize.Op.in]: ids }
      }
    });
    await this.ctx.model.RolePermission.destroy({
      where: {
        role_id: { [sequelize.Op.in]: ids }
      }
    });
    return true;
  }
}

module.exports = MyService;
