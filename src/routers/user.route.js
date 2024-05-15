const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/', userController.postUser);
router.delete('/:id', userController.deleteUser);
router.patch('/:id', userController.updateUser);

module.exports = {
  router,
};
