const Controller = require("./base");
const ApiError = require("../constant/api_err");

class KeyPairController extends Controller {
  async get() {
    const ctx = this.ctx;
    this.success(await ctx.service.keyPair.show(ctx.params.key));
  }

  async store() {
    const ctx = this.ctx;
    const key = ctx.params.key || ctx.query.key || (ctx.body && ctx.body.key);
    if (!key) {
      this.error(ApiError.PARAM_NOTFOUND.format("key"), 404);
      return;
    }
    const value = ctx.query.value || ctx.body.value;
    await ctx.service.keyPair.store(key, value);
    this.success("ok");
  }

  async remove() {
    const ctx = this.ctx;
    const key = ctx.params.key || ctx.query.key || (ctx.body && ctx.body.key);
    if (!key) {
      this.error(ApiError.PARAM_NOTFOUND.format("key"), 404);
      return;
    }
    await ctx.service.keyPair.destroy(key);
    this.success("ok");
  }

  async list() {
    const ctx = this.ctx;
    const offset = this.toInt(ctx.query.offset) || 20;
    const limit = (this.toInt(ctx.query.index) || 0) * offset;

    this.success(await ctx.service.keyPair.index(limit, offset));
  }
}

module.exports = KeyPairController;
