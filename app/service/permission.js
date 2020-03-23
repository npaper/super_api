const Service = require("egg").Service;

class MyService extends Service {
  list(limit, offset, searchParams) {
    const ctx = this.ctx;
    return ctx.model.Permission.findAll({
      limit,
      offset
    });
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
}

module.exports = MyService;
