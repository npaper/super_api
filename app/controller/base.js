const Controller = require("egg").Controller;

class BaseController extends Controller {
  success(data, status) {
    this.ctx.status = status || 200;
    this.ctx.body = {
      code: 0,
      errMsg: "success",
      data: data
    };
  }

  error({ errMsg, code }, status) {
    this.ctx.status = status || 500;
    this.ctx.body = {
      code: code || -1,
      errMsg: errMsg || "未知错误"
    };
  }

  toInt(str) {
    if (typeof str === "number") return str;
    if (!str) return str;
    return parseInt(str, 10) || 0;
  }
}

module.exports = BaseController;
