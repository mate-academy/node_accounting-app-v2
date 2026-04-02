const express = require('express');
const usersController = require('../controllers/users.controller.js');
const router = express.Router();

router.get('/', usersController.getAll);
router.get('/:id', usersController.getOne);
router.post('/', usersController.createUser);
router.delete('/:id', usersController.deleteUser);
router.patch('/:id', usersController.updateUser);

module.exports = router;
