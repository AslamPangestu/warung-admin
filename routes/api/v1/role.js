module.exports = function(app) {
  var controller = require("../../../controllers/RoleController");

  app
    .route("/api/v1/role")
    .get(controller.getAll)
    .post(controller.create);

  app
    .route("/api/v1/role/:id")
    .get(controller.findById)
    .put(controller.updateById)
    .delete(controller.deteleById);
};
