const express = require('express');
const expenseConrtoller = require('../controllers/expense.controller');

const router = express.Router();

router.get('/', expenseConrtoller.get);
router.get('/:id', expenseConrtoller.getOne);
router.post('/', expenseConrtoller.create);
router.delete('/:id', expenseConrtoller.remove);
router.patch('/:id', expenseConrtoller.update);

module.exports = { router };
