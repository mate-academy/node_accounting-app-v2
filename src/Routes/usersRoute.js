'use strict';

const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

router.get('/', express.json(), usersController.getAll);

router.post('/', usersController.addOne);

router.get('/:expenseId', usersController.getOne);

router.delete('/:expenseId', usersController.deleteOne);

router.patch('/:expenseId', express.json(), usersController.updateOne);

module.exports = router;
