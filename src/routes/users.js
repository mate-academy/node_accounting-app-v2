'use strict';

const usersControllers = require('../controllers/users');

const express = require('express');
const router = express.Router();

router.get('/', usersControllers.getAll);

router.get('/:userId', usersControllers.getAOne);

router.post('', usersControllers.create);

router.delete('/:userId', usersControllers.remove);

router.patch('/:userId', usersControllers.update);

module.exports = router;
