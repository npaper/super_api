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
  router.post("/auth/login", controller.demo.login);
};
