'use strict';

const express = require('express');
const expenseController = require('../controllers/expenseController');
const cors = require('cors');

const router = express.Router();

router.use(cors());

router.get('/', expenseController.getAll);

router.get('/:expenseId', expenseController.getOne);

router.post('/', express.json(), expenseController.add);

router.patch('/:expenseId', express.json(), expenseController.update);

router.delete('/:expenseId', expenseController.remove);

module.exports = {
  router,
};
