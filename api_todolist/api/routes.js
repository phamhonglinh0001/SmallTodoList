'use strict';
module.exports = function(app) {
  const loginController = require("./controllers/LoginController")
  const registerController = require("./controllers/RegisterController")
  const listsController = require("./controllers/ListsController")
  
  app.route('/login')
    .post(loginController.check)
  app.route('/register')
    .post(registerController.register)
  app.route('/lists/add')
    .post(listsController.add)
  app.route('/lists/complete')
    .post(listsController.complete)
  app.route('/lists/getAll')
    .post(listsController.getAll)
  app.route('/lists/delete')
    .post(listsController.delete)



};
