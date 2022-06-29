const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/books", [authJwt.verifyToken, authJwt.checkUser], controller.books);

  app.get("/api/likedBooks", [authJwt.verifyToken, authJwt.checkUser], controller.likedBooks);

  app.get("/api/readLaterBooks", [authJwt.verifyToken, authJwt.checkUser], controller.readLaterBooks);

  app.put("/api/addBookLike/:id", [authJwt.verifyToken, authJwt.checkUser], controller.addBookLike);

  app.put("/api/addBookReadLater/:id", [authJwt.verifyToken, authJwt.checkUser], controller.addBookReadLater);

  app.get("/api/test/user", [authJwt.verifyToken, authJwt.checkUser], controller.userBoard);

  app.get("/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);

  app.get("/api/test/admin/deleteUser/:name", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteUser);

  app.get("/api/test/admin/deleteBook/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteBook);
};
