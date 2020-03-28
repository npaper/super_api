const Controller = require("egg").Controller;
const ApiError = require("../constant/api_err");

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
    if (Array.isArray(str)) {
      return str.map(v => this.toInt(v));
    }
    if (!str) return str;
    return parseInt(str, 10) || 0;
  }

  str2Array(str) {
    if (Array.isArray(str)) return str;
    if (!str || str.trim().length === 0) return [];
    return str.split(",");
  }

  apiErr() {
    return ApiError;
  }
}

module.exports = BaseController;
