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
    return ctx.model.Permission.findAll(query);
  }

  async total() {
    var results = this.app.model.query(
      "select count(*) as total from permissions",
      {
        type: sequelize.QueryTypes.SELECT
      }
    );
    if (results.length) {
      return results[0].total;
    }
    return 0;
  }

  async store(permission) {
    var p0 = await this.ctx.model.Permission.findByPk(permission.id);
    if (!p0) {
      return await this.ctx.model.Permission.create(permission);
    } else {
      return await p0.update(permission);
    }
  }

  async remove(id) {
    var list = await this.ctx.model.RolePermission.findAll({
      where: {
        permission_id: id
      }
    });
    console.log(list);
    var p0 = await this.ctx.model.Permission.findByPk(id);
    if (p0) {
      p0.destroy();

      // 递归删除
      for (let i = 0; i < list.length; i++) {
        await list[i].destroy();
      }
      return true;
    }
    return false;
  }
}

module.exports = MyService;
