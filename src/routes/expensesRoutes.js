const express = require('express');
const expensesControlers = require('../controlers/expensesControler');

const router = express.Router();

router.get('/', expensesControlers.getAll);

router.post('/', expensesControlers.add);

router.get('/:id', expensesControlers.getOne);

router.delete('/:id', expensesControlers.remove);

router.patch('/:id', expensesControlers.update);

module.exports = { router };
