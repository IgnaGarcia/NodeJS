let router = require('express').Router();
let userController = require('./controllers/userController');

router.route('/users')
    .get(userController.getUserList)
    .post(userController.createUser);

router.route('/users/:id')
    .get(userController.getUser)
    .delete(userController.deleteUser)
    .put(userController.updateUser);

module.exports = router;