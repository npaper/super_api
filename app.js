// const easyMonitor = require("easy-monitor");
module.exports = app => {
  // 开始前执行
  app.beforeStart(async () => {});
  // 准备好执行
  app.ready(async () => {
    // easyMonitor("super_api");
  });
  // 关闭前执行
  app.beforeClose(async () => {});
};
