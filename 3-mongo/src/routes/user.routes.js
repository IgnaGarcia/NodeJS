const router = require('express').Router;
const userController = require('../controllers/user.controller');

router.route('/users')
    .get(userController.getUserList)
    .post(userController.createUser);

router.route('/users/:id')
    .get(userController.getUser)
    .delete(userController.deleteUser)
    .put(userController.updateUser);

module.exports = router;