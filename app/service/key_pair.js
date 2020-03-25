const Service = require("egg").Service;

class MyService extends Service {
  show(key) {
    const ctx = this.ctx;
    const userId = ctx.session.userId;
    return ctx.model.KeyPair.findOne({
      where: {
        key,
        user_id: userId
      }
    });
  }

  async store(key, value) {
    const pair = await this.show(key);
    if (pair) {
      return await pair.update({ value });
    } else {
      const ctx = this.ctx;
      const userId = ctx.session.userId;
      return await ctx.model.KeyPair.create({ key, value, user_id: userId });
    }
  }

  index(limit, offset) {
    return this.ctx.model.KeyPair.findAll({
      limit,
      offset
    });
  }

  async destroy(key) {
    const pair = await this.show(key);
    if (pair) {
      return pair.destroy();
    }
  }
}

module.exports = MyService;
