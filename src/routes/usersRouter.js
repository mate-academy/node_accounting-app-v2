const express = require('express');
const userController = require('../controllers/usersController');

const router = express.Router();

router.route('/').get(userController.getAll).post(userController.create);

router
  .route('/:id')
  .get(userController.getOne)
  .delete(userController.remove)
  .patch(userController.update);

module.exports = { router };
