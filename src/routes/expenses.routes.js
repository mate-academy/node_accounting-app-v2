'use strict';

const { Router } = require('express');
const ctrl = require('../controllers/expenses.controller');

const router = Router();

router.post('/', ctrl.createExpense);
router.get('/', ctrl.listExpenses);
router.get('/:id', ctrl.getExpense);
router.patch('/:id', ctrl.updateExpense);
router.delete('/:id', ctrl.deleteExpense);

module.exports = router;
