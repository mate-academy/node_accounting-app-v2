'use strict';

const express = require('express');
const router = express.Router();
const expensesControllers = require('../controllers/expenses');
const collectionControllers = require('../controllers/collections');

router.get('/', collectionControllers.getAllExpenses);

router.get('/:purchaseId', expensesControllers.getOnePurchase);

router.post('/:purchaseId', express.json(), expensesControllers.addPurchase);

router.delete('/:purchaseId', expensesControllers.deletePurchase);

router.patch(
  '/:purchaseId',
  express.json(),
  expensesControllers.updatePurchase
);

module.exports = {
  expensesRouter: router,
};
