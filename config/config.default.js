module.exports = {
  keys: "super_api",
  sequelize: {
    dialect: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "work",
    password: "work",
    database: "super_api"
  },
  security: {
    csrf: {
      cookieName: "csrfToken",
      headerName: "x-csrf-token"
    }
  },
  cors: {
    origin: "*",
    origin: "http://127.0.0.1:8001",
    credentials: true,
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS"
  }
};
