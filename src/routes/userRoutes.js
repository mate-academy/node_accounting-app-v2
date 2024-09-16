'use strict';

const express = require('express');
const cors = require('cors');
const userContollers = require('../controllers/usersControllers.js');

const router = express.Router();

router.use(cors());

router.get('/', userContollers.getAllUsers);

router.get('/:id', userContollers.getUserById);

router.post('/', userContollers.createUser);

router.delete('/:id', userContollers.deleteUser);

router.patch('/:id', userContollers.updateUser);

module.exports = { router };
