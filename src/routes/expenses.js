'use strict';

const express = require('express');
const expensesController = require('./controllers/users.js');

const router = express.Router();

router.get('/', expensesController.getAll);

router.get('/:expensId', expensesController.getOne);

router.post('/', express.json(), expensesController.add);

router.delete('/:expensId', expensesController.remove);

router.patch('/:expensId', express.json(), expensesController.update);

module.exports = {
  router,
};
