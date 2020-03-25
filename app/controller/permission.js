const Controller = require("./base");
const { isEmptyString } = require("../utils/check");

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
    const current = this.toInt((ctx.request.body || {}).current || 0);
    const offset = this.toInt((ctx.request.body || {}).pageSize || 20);
    const limit = current * offset;

    const nameOrid = (ctx.request.body || {}).id;

    const result = await ctx.service.role.list(offset, limit, nameOrid);
    var ids = [];
    var names = {};

    result.forEach(v => {
      v.creator_id && ids.indexOf(v.creator_id) < 0 && ids.push(v.creator_id);
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
    const current = this.toInt((ctx.request.body || {}).current || 0);
    const offset = this.toInt((ctx.request.body || {}).pageSize || 20);
    const limit = current * offset;
    const nameOrid = (ctx.request.body || {}).id;
    const result = await ctx.service.permission.list(offset, limit, nameOrid);
    var ids = [];
    var names = {};

    result.forEach(v => {
      v.creator_id && ids.indexOf(v.creator_id) < 0 && ids.push(v.creator_id);
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
    const result = await ctx.service.nav.list();
    var ids = [];
    var names = {};

    result.forEach(v => {
      v.creator_id && ids.indexOf(v.creator_id) < 0 && ids.push(v.creator_id);
    });

    if (ids.length) {
      names = arr2map(await ctx.service.baseUser.getUserNames(ids));
    }
    const total = 0; // await ctx.service.baseUser.total();

    this.success({
      total,
      current: 0,
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

  // 添加菜单项
  async addNav() {
    const ctx = this.ctx;
    var { key, describe, parentKey } = ctx.request.body;
    if (isEmptyString(key)) {
      this.error(this.apiErr().PARAM_NOTFOUND.format("key"));
      return;
    } else if (isEmptyString(describe)) {
      this.error(this.apiErr().PARAM_NOTFOUND.format("describe"));
      return;
    }

    parentKey = parentKey || "";
    ctx.service.nav.store({
      key,
      describe,
      parent_key: parentKey,
      creator_id: ctx.session.userId
    });
    this.success("ok");
  }

  // 删除菜单项
  async removeNav() {
    const ctx = this.ctx;
    if (!ctx.params.key) {
      this.error(this.apiErr().PARAM_NOTFOUND.format("key"));
      return;
    }
    this.success(await ctx.service.nav.remove(ctx.params.key));
  }

  // 添加角色
  async addRole() {
    const ctx = this.ctx;
    var { id, describe, name } = ctx.request.body;
    if (isEmptyString(id)) {
      this.error(this.apiErr().PARAM_NOTFOUND.format("id"));
      return;
    } else if (isEmptyString(name)) {
      this.error(this.apiErr().PARAM_NOTFOUND.format("name"));
      return;
    }

    describe = describe || "";
    ctx.service.role.store({
      id,
      describe,
      name,
      creator_id: ctx.session.userId
    });
    this.success("ok");
  }

  // 删除角色
  async removeRole() {
    const ctx = this.ctx;
    if (!ctx.params.id) {
      this.error(this.apiErr().PARAM_NOTFOUND.format("id"));
      return;
    }
    this.success(await ctx.service.role.remove(ctx.params.id));
  }

  // 添加权限
  async addPermission() {
    const ctx = this.ctx;
    var { id, describe, name } = ctx.request.body;
    if (isEmptyString(id)) {
      this.error(this.apiErr().PARAM_NOTFOUND.format("id"));
      return;
    } else if (isEmptyString(name)) {
      this.error(this.apiErr().PARAM_NOTFOUND.format("name"));
      return;
    }

    describe = describe || "";
    ctx.service.permission.store({
      id,
      describe,
      name,
      creator_id: ctx.session.userId
    });
    this.success("ok");
  }

  // 删除权限
  async removePermission() {
    const ctx = this.ctx;
    if (!ctx.params.id) {
      this.error(this.apiErr().PARAM_NOTFOUND.format("id"));
      return;
    }
    this.success(await ctx.service.permission.remove(ctx.params.id));
  }
}

module.exports = MyController;
