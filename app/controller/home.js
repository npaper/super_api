const Controller = require("./base");

class HomeController extends Controller {
  async index() {
    this.success("Hello world");
  }
}

module.exports = HomeController;
