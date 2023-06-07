'use strict';

const express = require('express');
const expenseServices = require('../controllers/expenses');
const router = express.Router();

router.get('/', expenseServices.getAll);
router.get('/:expenseId', expenseServices.getOne);
router.post('/', expenseServices.create);
router.patch('/:expenseId', expenseServices.update);
router.delete('/:expenseId', expenseServices.remove);

module.exports = { router };
