'use strict';

const Router = require('express');
const router = new Router();

const expController = require('../controllers/expenses.controller');

router.get('/', expController.getAllExpenses);
router.get('/:id', expController.getOneExpenses);
router.post('/', expController.createExpenses);
router.put('/:id', expController.updateExpenses);
router.delete('/:id', expController.removeExpenses);

module.exports = router;
