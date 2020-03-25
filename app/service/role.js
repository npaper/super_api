const Service = require("egg").Service;
const { or, like } = require("sequelize").Op;

class MyService extends Service {
  list(limit, offset, searchParam) {
    const ctx = this.ctx;
    var query = {
      limit,
      offset,
      order: [["updated_at", "DESC"]]
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

  async remove(id) {
    var p0 = await this.ctx.model.Role.findByPk(id);
    if (p0) {
      await p0.destroy();

      await this.ctx.model.RolePermission.destroy({
        where: {
          role_id: id
        }
      });
      console.log(list);
      return true;
    }
    return false;
  }
}

module.exports = MyService;
