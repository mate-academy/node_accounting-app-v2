'use strict';

const express = require('express');
const expenseServices = require('../services/expenses');

const router = express.Router();

// router.use(express.json());
router.get('/', expenseServices.getAll);
router.get('/:expenseId', expenseServices.getById);
router.post('/', expenseServices.create);
router.patch('/:expenseId', expenseServices.update);
router.delete('/:expenseId', expenseServices.remove);

module.exports = { router };
