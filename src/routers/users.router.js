const usersService = require('../services/users.service');

const express = require('express');

const router = express.Router();

router.get('/', usersService.getAll);
router.get('/:id', usersService.getOne);
router.post('/', usersService.createUser);
router.delete('/:id', usersService.deleteUser);
router.patch('/:id', usersService.updateOne);

module.exports = {
  router,
};
