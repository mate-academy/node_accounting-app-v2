const express = require('express');
const expenseConrtoler = require('./../controlers/expense.controler');

const router = express.Router();

router.get('/', expenseConrtoler.get);
router.get('/:id', expenseConrtoler.getOne);
router.post('/', expenseConrtoler.create);
router.delete('/:id', expenseConrtoler.remove);
router.patch('/:id', expenseConrtoler.update);

module.exports = { router };
