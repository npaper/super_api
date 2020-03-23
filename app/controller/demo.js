const Controller = require("./base");

class MyController extends Controller {
  async version() {
    this.success("v0.0.1");
  }

  async login() {
    var ctx = this.ctx;
    console.log(ctx.request.body);
  }
}

module.exports = MyController;
