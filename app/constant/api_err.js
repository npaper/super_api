class ApiErr {
  constructor(errMsg, code) {
    this.errMsg = errMsg;
    this.code = code;
  }

  format() {
    var a = this.errMsg;
    for (var k in arguments) {
      a = a.replace("{" + k + "}", arguments[k]);
    }
    return new ApiErr(a, this.code);
  }
}

module.exports = {
  PARAM_NOTFOUND: new ApiErr("params not founed: {0}", 101),
  LOGIN_ERR: new ApiErr("账号不存在或密码错误", 102),
  USER_BANED: new ApiErr("账号被禁用", 103),
  USER_DELETED: new ApiErr("账号被删除", 104),
  NO_PERMISSION: new ApiErr("没有操作权限", 105)
};
