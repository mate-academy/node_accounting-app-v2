'use strict';

const express = require('express');
const usersController = require('../controllers/users.controller');

const router = express.Router();

router.get('/', usersController.getAll);
router.get('/:id', usersController.getOne);
router.post('/', usersController.create);
router.put('/:id', usersController.update);
router.patch('/:id', usersController.update);
router.delete('/:id', usersController.remove);

module.exports = router;
