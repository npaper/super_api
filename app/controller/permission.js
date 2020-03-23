const Controller = require("./base");

function arr2map(arr) {
  var map = {};
  arr.forEach(v => {
    map[v.id] = v;
  });
  return map;
}

class MyController extends Controller {
  // 角色列表
  async roleList() {
    const ctx = this.ctx;
    const current = this.toInt((ctx.body || {}).current || 0);
    const offset = this.toInt((ctx.body || {}).pageSize || 20);
    const limit = current * offset;
    const result = await ctx.service.role.list(offset, limit);
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
          name: v.name,
          describe: v.describe,
          status: v.status,
          creatorId: v.creator_id,
          creatorName: (names[v.creator_id] || {}).account_name,
          creatorNickName: (names[v.creator_id] || {}).nick_name,
          createAt: v.createdAt,
          updateAt: v.updatedAt
        };
      })
    });
  }

  // 权限列表
  async permissionList() {
    const ctx = this.ctx;
    const current = this.toInt((ctx.body || {}).current || 0);
    const offset = this.toInt((ctx.body || {}).pageSize || 20);
    const limit = current * offset;
    const result = await ctx.service.permission.list(offset, limit);
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
          name: v.name,
          describe: v.describe,
          creatorId: v.creator_id,
          creatorName: (names[v.creator_id] || {}).account_name,
          creatorNickName: (names[v.creator_id] || {}).nick_name,
          createAt: v.createdAt,
          updateAt: v.updatedAt
        };
      })
    });
  }

  // 菜单列表
  async navList() {
    const ctx = this.ctx;
    const current = this.toInt((ctx.body || {}).current || 0);
    const offset = this.toInt((ctx.body || {}).pageSize || 20);
    const limit = current * offset;
    const result = await ctx.service.nav.list(offset, limit);
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
          id: v.key,
          describe: v.describe,
          parentKey: v.parent_key,
          creatorId: v.creator_id,
          creatorName: (names[v.creator_id] || {}).account_name,
          creatorNickName: (names[v.creator_id] || {}).nick_name,
          createAt: v.createdAt,
          updateAt: v.updatedAt
        };
      })
    });
  }
}

module.exports = MyController;
