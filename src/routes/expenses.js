'use strict';

const express = require('express');
const router = express.Router();
const {
  getAll,
  getOne,
  add,
  remove,
  update,
} = require('../controllers/expenses');

router.post('/', add);

router.get('/', getAll);

router.get('/:expenseId', getOne);

router.patch('/:expenseId', update);

router.delete('/:expenseId', remove);

module.exports = router;
