const Service = require("egg").Service;
const sequelize = require("sequelize");

class MyService extends Service {
  list(limit, offset, searchParams) {
    const ctx = this.ctx;
    return ctx.model.BaseUser.findAndCountAll({
      limit,
      offset
    });
  }

  getUserNames(ids) {
    return this.ctx.model.BaseUser.findAll({
      attributes: {
        exclude: [
          "created_at",
          "updated_at",
          "password",
          "sex",
          "avatar",
          "status",
          "creator_id",
          "role_id",
          "email"
        ]
      },
      where: {
        id: {
          [sequelize.Op.in]: ids
        }
      }
    });
  }

  getUserById(userId) {
    const ctx = this.ctx;
    return ctx.model.BaseUser.findByPk(userId);
  }

  getUserByAccount(accountName, password) {
    const ctx = this.ctx;
    return ctx.model.BaseUser.findOne({
      where: {
        account_name: accountName,
        password
      }
    });
  }

  getUserByEmail(email, password) {
    const ctx = this.ctx;
    return ctx.model.BaseUser.findOne({
      where: {
        email,
        password
      }
    });
  }
}

module.exports = MyService;
