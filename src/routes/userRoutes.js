'use strict';

const express = require('express');
const userControllers = require('../controllers/userControllers');

const router = express.Router();

router.get('/users', userControllers.getAll);
router.get('/users/:userId', userControllers.getOne);
router.post('/users', express.json(), userControllers.add);
router.delete('/users/:userId', userControllers.remove);
router.patch('/users/:userId', express.json(), userControllers.update);

module.exports = { router };
