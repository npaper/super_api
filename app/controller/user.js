const Controller = require("./base");

function arr2map(arr) {
  var map = {};
  arr.forEach(v => {
    map[v.id] = v;
  });
  return map;
}

class MyController extends Controller {
  async list() {
    const ctx = this.ctx;

    const current = this.toInt((ctx.body || {}).current || 0);
    const offset = this.toInt((ctx.body || {}).pageSize || 20);
    const limit = current * offset;
    const result = await ctx.service.baseUser.list(offset, limit);
    var ids = [];
    var names = {};

    result.forEach(v => {
      v.creator_id && ids.push(v.creator_id);
    });

    if (ids.length) {
      names = arr2map(await ctx.service.baseUser.getUserNames(ids));
    }
    const total = await ctx.service.baseUser.total();

    this.success({
      total,
      current: current,
      records: result.map(v => {
        return {
          id: v.id,
          name: v.account_name,
          username: v.nick_name,
          avatar: v.avatar,
          sex: v.sex,
          status: v.status,
          birthday: v.birthday,
          creatorId: v.creator_id,
          creatorName: (names[v.creator_id] || {}).account_name,
          creatorNickName: (names[v.creator_id] || {}).nick_name,
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
