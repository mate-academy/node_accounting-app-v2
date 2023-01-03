'use strict';

const express = require('express');
const usersController = require('../controllers/users');

const router = express.Router();

router.get('/', usersController.getAll);

router.get('/:userId', usersController.getOne);

router.post('/', express.json(), usersController.addOne);

router.delete('/:userId', usersController.deleteOne);

router.patch('/:userId', express.json(), usersController.updateOne);

module.exports = router;
