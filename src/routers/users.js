'use strict';

const express = require('express');
const usersServices = require('../services/users');
const router = express.Router();

// router.use(express.json());
router.get('/', usersServices.getAll);
router.get('/:userId', usersServices.getById);
router.post('/', usersServices.create);
router.delete('/:userId', usersServices.remove);
router.patch('/:userId', usersServices.update);

module.exports = { router };
