const express = require('express');
const usersController = require('../controllers/users.controller');

const router = express.Router();

router.get('/', usersController.getAll);

router.post('/', usersController.create);

router.get('/:id', usersController.get);

router.delete('/:id', usersController.remove);

router.patch('/:id', usersController.update);

module.exports = { router };
