const Service = require("egg").Service;

class KeypairService extends Service {
  show(key) {
    return this.ctx.model.KeyPair.findByPk(key);
  }

  async store(key, value) {
    const pair = await this.show(key);
    if (pair) {
      return await pair.update({ value });
    } else {
      return await this.ctx.model.KeyPair.create({ key, value });
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

module.exports = KeypairService;
