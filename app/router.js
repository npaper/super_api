module.exports = app => {
  const { router, controller } = app;
  router.get("/", controller.home.index);
  router.get("/key_pair/get/:key", controller.keyPair.get);

  router.get("/key_pair/store/:key", controller.keyPair.store);
  router.get("/key_pair/store", controller.keyPair.store);
  router.post("/key_pair/store", controller.keyPair.store);
  router.delete("/key_pair/remove/:key", controller.keyPair.remove);

  router.get("/key_pair/list", controller.keyPair.list);

  router.get("/version", controller.demo.version);
  router.get("/user/info", controller.demo.info);
  router.get("/user/nav", controller.demo.nav);

  router.post("/auth/login", controller.user.login);
  router.post("/auth/logout", controller.user.logout);
  router.post("/user/list", controller.user.list);

  router.post("/nav/list", controller.permission.navList);
  router.post("/nav/add", controller.permission.addNav);
  router.delete("/nav/remove/:key", controller.permission.removeNav);

  router.post("/role/list", controller.permission.roleList);
  router.post("/role/add", controller.permission.addRole);
  router.delete("/role/remove/:id", controller.permission.removeRole);

  router.post("/permission/list", controller.permission.permissionList);
  router.post("/permission/add", controller.permission.addPermission);
  router.delete(
    "/permission/remove/:id",
    controller.permission.removePermission
  );
};
