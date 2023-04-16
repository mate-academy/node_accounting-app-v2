'use strict';

const express = require('express');
const usersControllers = require('../controllers/users');

const router = express.Router();

router.get('/', usersControllers.getAll);

router.get('/:userId', usersControllers.getOne);

router.post('/', usersControllers.create);

router.patch('/:userId', usersControllers.update);

router.delete('/:userId', usersControllers.remove);

module.exports = router;
