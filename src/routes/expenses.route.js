'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses.controller');

const router = express.Router();

router.param('id', (req, res, next, id) => {
  const num = parseInt(id);

  if (isNaN(num)) {
    res.status(400).send({ error: 'Invalid ID format' });
  } else {
    req.params.id = num;
    next();
  }
});

router.get('/', expensesController.get);
router.get('/:id', expensesController.getById);
router.post('/', express.json(), expensesController.create);
router.delete('/:id', expensesController.remove);
router.patch('/:id', express.json(), expensesController.update);

module.exports = {
  router,
};
