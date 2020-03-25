const Controller = require("./base");
const ApiError = require("../constant/api_err");

class MyController extends Controller {
  async version() {
    this.success("v0.0.1");
  }

  async login() {
    var ctx = this.ctx;
    console.log(ctx.request.body);
    ctx.session.userId = "4291d7da9005377ec9aec4a71ea837f";
    this.success({
      id: "4291d7da9005377ec9aec4a71ea837f",
      name: "小白",
      username: "admin",
      avatar:
        "https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png",
      status: 1,
      creatorId: "admin",
      roleId: "admin",
      token: "4291d7da9005377ec9aec4a71ea837f"
    });
  }

  genrole(permissionId, permissionName, roleId) {
    return {
      roleId: roleId || "admin",
      permissionId,
      permissionName,
      actions:
        '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      actionEntitySet: [
        {
          action: "add",
          describe: "新增",
          defaultCheck: false
        },
        {
          action: "query",
          describe: "查询",
          defaultCheck: false
        },
        {
          action: "get",
          describe: "详情",
          defaultCheck: false
        },
        {
          action: "update",
          describe: "修改",
          defaultCheck: false
        },
        {
          action: "delete",
          describe: "删除",
          defaultCheck: false
        }
      ],
      actionList: null,
      dataAccess: null
    };
  }

  async info() {
    const ctx = this.ctx;
    const user_id = this.toInt(ctx.session.userId);
    if (!user_id) {
      this.error(ApiError.NO_PERMISSION, 500);
      return;
    }
    var user = await ctx.service.baseUser.getUserById(user_id);
    if (!user) {
      this.error(ApiError.NO_PERMISSION, 500);
      ctx.session.userId = "";
      return;
    }

    const userInfo = {
      id: user.id,
      name: user.nick_name,
      username: user.account_name,
      avatar: user.avatar,
      status: user.status,
      roleId: user.role_id,
      role: {}
    };

    // role
    const roleObj = {
      id: "admin",
      name: "管理员",
      describe: "拥有所有权限",
      status: 1,
      creatorId: "system",
      createTime: 1497160610259,
      permissions: []
    };

    // permissions
    roleObj.permissions.push(this.genrole("dashboard", "仪表盘"));
    roleObj.permissions.push(this.genrole("exception", "页面异常权限"));
    roleObj.permissions.push(this.genrole("permission", "权限管理"));
    roleObj.permissions.push(this.genrole("role", "角色管理"));
    roleObj.permissions.push(this.genrole("user", "用户管理"));
    roleObj.permissions.push(this.genrole("nav", "菜单管理"));
    roleObj.permissions.push(this.genrole("support", "超级模块"));
    roleObj.permissions.push(this.genrole("home", "主页"));
    roleObj.permissions.push(this.genrole("manager", "数据管理"));

    userInfo.role = roleObj;
    this.success(userInfo);
  }

  async nav() {
    const nav = [
      {
        name: "dashboard",
        parentId: 0,
        id: 1,
        meta: {
          icon: "dashboard",
          title: "仪表盘",
          show: true
        },
        component: "RouteView",
        redirect: "/dashboard/workplace"
      },
      {
        name: "Analysis",
        parentId: 1,
        id: 2,
        meta: {
          title: "分析页",
          show: true
        },
        component: "Analysis",
        path: "/dashboard/analysis"
      },
      {
        name: "Home",
        parentId: 0,
        id: 3,
        meta: {
          icon: "dashboard",
          title: "主页",
          show: true
        },
        component: "RouteView",
        redirect: "/home/index"
      },
      {
        name: "HomeIndex",
        parentId: 3,
        id: 4,
        meta: {
          title: "主页",
          show: true
        },
        component: "Home",
        path: "/home/index"
      },
      {
        name: "Manager",
        parentId: 0,
        id: 6,
        meta: {
          title: "数据管理",
          show: true
        },
        component: "RouteView",
        redirect: "/manager/user/list"
      },
      {
        name: "User",
        parentId: 6,
        id: 7,
        meta: {
          title: "用户管理",
          show: true
        },
        component: "User",
        path: "/manager/user/list"
      },
      {
        name: "Role",
        parentId: 6,
        id: 8,
        meta: {
          title: "角色管理",
          show: true
        },
        component: "Role",
        path: "/manager/role/list"
      },
      {
        name: "Permission",
        parentId: 6,
        id: 9,
        meta: {
          title: "权限管理",
          show: true
        },
        component: "Permission",
        path: "/manager/permission/list"
      },
      {
        name: "Nav",
        parentId: 6,
        id: 10,
        meta: {
          title: "菜单管理",
          show: true
        },
        component: "Nav",
        path: "/manager/nav/list"
      }
    ];

    this.success(nav);
  }

  async logout() {
    this.ctx.session.userId = "";
    this.success({});
  }
}

module.exports = MyController;
