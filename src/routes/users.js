'use strict';

const express = require('express');

const controllerUsers = require('../controllers/users');

const router = express.Router();

router.get('/', controllerUsers.getAll);

router.post('/', controllerUsers.addUser);

router.get('/:id', controllerUsers.getOneUser);

router.delete('/:id', controllerUsers.removeUser);

router.patch('/:id', controllerUsers.changeUser);

module.exports.router = router;
