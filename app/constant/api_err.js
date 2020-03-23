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
  PARAM_NOTFOUND: new ApiErr("params not founed: {0}", 101)
};
