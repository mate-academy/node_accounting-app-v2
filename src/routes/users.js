'use strict';

const express = require('express');
const userControllers = require('../controllers/users');

const router = express.Router();

router.get('/', userControllers.getAll);

router.get('/:userId', userControllers.getOne);

router.post('/', express.json(), userControllers.create);

router.delete('/:userId', userControllers.remove);

router.patch('/:userId', express.json(), userControllers.update);

module.exports = router;
