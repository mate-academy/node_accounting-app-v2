'use strict';

const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expenses');
// const {
//   checkCorrectBodyParams,
// } = require('../middleware/checkCorrectBodyParams');
const { checkCorrectId } = require('../middleware/checkCorrectId');

router.post('/', expensesController.add);
router.get('/', expensesController.getAll);

router.get(
  '/:recordId',
  checkCorrectId('recordId', 400),
  expensesController.getOne
);

router.delete(
  '/:recordId',
  checkCorrectId('recordId', 404),
  expensesController.remove
);

router.patch(
  '/:recordId',
  checkCorrectId('recordId', 400),
  expensesController.update
);

module.exports = {
  router,
};
