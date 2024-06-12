'use strict';

const express = require('express');
const ExpenseController = require('../controllers/ExpenseController');

const router = express.Router();

router.get('/', ExpenseController.get);
router.post('/', ExpenseController.create);
router.get('/:id', ExpenseController.getById);
router.delete('/:id', ExpenseController.remove);
router.patch('/:id', ExpenseController.update);

module.exports = { ExpenseRouter: router };
