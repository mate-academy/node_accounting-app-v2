'use strict';

const express = require('express');
const expenseController = require('../controllers/expenses');

const router = express.Router();

const hasFilteringQuery = (req, res, next) => {
  if (Object.keys(req.query).length > 0) {
    next();
  } else {
    next('route');
  }
};

router.get('/', hasFilteringQuery, expenseController.filter);

router.get('/', expenseController.getAll);

router.get('/:id', expenseController.get);

router.post('/', expenseController.create);

router.delete('/:id', expenseController.remove);

router.patch('/:id', expenseController.update);

module.exports = {
  router,
};
