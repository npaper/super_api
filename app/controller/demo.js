const Controller = require("./base");

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
    const userInfo = {
      id: "4291d7da9005377ec9aec4a71ea837f",
      name: "小白",
      username: "admin",
      avatar: "/avatar2.jpg",
      status: 1,
      creatorId: "admin",
      roleId: "admin",
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
    roleObj.permissions.push(this.genrole("support", "超级模块"));
    roleObj.permissions.push(this.genrole("home", "主页"));

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
