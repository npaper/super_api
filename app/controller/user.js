const Controller = require("./base");
// https://www.npmjs.com/package/token
const token = require("token");
const ApiError = require("../constant/api_err");
const md5 = require("md5");

token.defaults.secret = "super_api";
token.defaults.timeStep = 3 * 60; // 3分钟

function arr2map(arr) {
  var map = {};
  arr.forEach(v => {
    map[v.id] = v;
  });
  return map;
}

function isEmail(str) {
  var re = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
  if (re.test(str) != true) {
    return false;
  } else {
    return true;
  }
}

class MyController extends Controller {
  async login() {
    const ctx = this.ctx;
    const { username, password } = ctx.request.body || {};
    if (!username || !password) {
      this.error(ApiError.PARAM_NOTFOUND, 500);
      return;
    }
    var user;
    if (isEmail(username)) {
      user = await ctx.service.baseUser.getUserByEmail(username, md5(password));
    } else {
      user = await ctx.service.baseUser.getUserByAccount(
        username,
        md5(password)
      );
    }
    if (!user) {
      this.error(ApiError.PARAM_NOTFOUND, 500);
      return;
    } else if (user.status === 2) {
      this.error(ApiError.USER_BANED, 500);
      return;
    } else if (user.status === 3) {
      this.error(ApiError.USER_DELETED, 500);
      return;
    }

    ctx.session.userId = user.id + "";
    this.success({
      id: user.id + "",
      name: user.nick_name,
      username: user.account_name,
      avatar: user.avatar,
      status: user.status,
      roleId: user.role_id,
      token: token.generate(user.id + "|" + user.role_id)
    });
  }

  async logout() {
    this.ctx.session.userId = "";
    this.success({});
  }

  async list() {
    const ctx = this.ctx;

    const current = this.toInt((ctx.request.body || {}).current || 0);
    const offset = this.toInt((ctx.request.body || {}).pageSize || 20);
    const limit = current * offset;
    const result = await ctx.service.baseUser.list(offset, limit);
    // var ids = [];
    // var names = {};

    // result.rows.forEach(v => {
    //   v.creator_id && ids.indexOf(v.creator_id) < 0 && ids.push(v.creator_id);
    // });

    // if (ids.length) {
    //   names = arr2map(await ctx.service.baseUser.getUserNames(ids));
    // }

    this.success({
      total: result.count,
      current: current,
      records: result.rows.map(v => {
        return {
          id: v.id,
          name: v.account_name,
          username: v.nick_name,
          avatar: v.avatar,
          sex: v.sex,
          status: v.status,
          birthday: v.birthday,
          creatorId: v.creator_id,
          creatorName: v.buser.account_name ,// (names[v.creator_id] || {}).account_name,
          creatorNickName: v.buser.nick_name ,// (names[v.creator_id] || {}).nick_name,
          roleId: v.role_id,
          email: v.email,
          createAt: v.createdAt,
          updateAt: v.updatedAt
        };
      })
    });
  }
}
module.exports = MyController;
