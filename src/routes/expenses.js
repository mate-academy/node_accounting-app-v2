'use strict';

const express = require('express');

const controllerUsers = require('../controllers/expenses');

const router = express.Router();

router.get('/', controllerUsers.getAll);

router.post('/', controllerUsers.addExpense);

router.get('/:id', controllerUsers.getOneExpense);

router.patch('/:id', controllerUsers.changeExpense);

router.delete('/:id', controllerUsers.deleteExpense);

module.exports.router = router;
