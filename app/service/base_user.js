const Service = require("egg").Service;
const sequelize = require("sequelize");

class MyService extends Service {
  list(limit, offset, searchParams) {
    const ctx = this.ctx;
    return ctx.model.BaseUser.findAll({
      limit,
      offset
    });
  }

  getUserNames(ids) {
    return this.app.model.query(
      "select id, account_name, nick_name from base_users where id in (:ids)",
      {
        replacements: { ids: ids },
        type: sequelize.QueryTypes.SELECT
      }
    );
  }

  async total() {
    var results = this.app.model.query(
      "select count(*) as total from base_users",
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
