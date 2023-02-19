'use strict';

const uuid = require('uuid').v4;
const collectionServices = require('../services/collections');
const expensesServices = require('../services/expenses.js');

const getOnePurchase = (req, res) => {
  const { purchaseId } = req.params;
  const foundPurchase = expensesServices.getFoundPurchaseById(purchaseId);

  if (!purchaseId) {
    res.sendStatus(400);

    return;
  }

  if (!foundPurchase) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(200);
  res.send(foundPurchase);
};

const addPurchase = (req, res) => {
  const { purchaseId } = req.params;
  const requestBody = req.body;
  const requestKeys = Object.keys(requestBody);
  const requiredKeys = {
    userId: 'number',
    spentAt: 'string',
    title: 'string',
    amount: 'number',
    category: 'string',
    note: 'string',
  };

  if (requestKeys.length < 6) {
    res.sendStatus(400);

    return;
  }

  requestKeys.forEach(key => {
    if (!requiredKeys[key]) {
      res.sendStatus(400);

      return;
    }

    if (key === 'spentAt' && !(requestBody[key] instanceof Date)) {
      res.sendStatus(400);

      return;
    }

    if ((key === 'userId' || key === 'amount')
    && typeof requestBody[key] !== 'number') {
      res.sendStatus(400);

      return;
    }

    if (typeof requestBody[key] !== 'string') {
      res.sendStatus(400);
    }
  });

  if (!purchaseId) {
    res.sendStatus(400);

    return;
  }

  const newPurchase = {
    id: uuid(),
    ...requestBody,
  };

  res.statusCode = 201;
  collectionServices.getCollection().expenses.push(newPurchase);
  res.send(newPurchase);
};

const deletePurchase = (req, res) => {
  const { purchaseId } = req.params;
  const foundPurchase = expensesServices.getFoundPurchaseById(purchaseId);
  const filteredExpenses = expensesServices.getFilteredExpensesById(purchaseId);

  if (!purchaseId) {
    res.sendStatus(400);

    return;
  }

  if (!foundPurchase) {
    res.sendStatus(404);
  }

  collectionServices.getCollection().expenses = filteredExpenses;
  res.statusCode = 204;
  res.send(foundPurchase);
};

const updatePurchase = (req, res) => {
  const { purchaseId } = req.params;
  const foundPurchase = expensesServices.getFoundPurchaseById(purchaseId);

  if (!purchaseId) {
    res.sendStatus(400);

    return;
  }

  if (!foundPurchase) {
    res.sendStatus(404);

    return;
  }

  const requestBody = req.body;
  const requestKeys = Object.keys(requestBody);
  const requiredKeys = {
    spentAt: 'string',
    title: 'string',
    amount: 'number',
    category: 'string',
    note: 'string',
  };

  if (requestKeys.length < 5) {
    res.sendStatus(400);

    return;
  }

  requestKeys.forEach(key => {
    if (!requiredKeys[key]) {
      res.sendStatus(400);

      return;
    }

    if (key === 'spentAt' && !(requestBody[key] instanceof Date)) {
      res.sendStatus(400);

      return;
    }

    if ((key === 'userId' || key === 'amount')
    && typeof requestBody[key] !== 'number') {
      res.sendStatus(400);

      return;
    }

    if (typeof requestBody[key] !== 'string') {
      res.sendStatus(400);
    }
  });

  Object.assign(foundPurchase, { ...requestBody });
  res.statusCode = 200;
  res.send(foundPurchase);
};

module.exports = {
  getOnePurchase,
  addPurchase,
  deletePurchase,
  updatePurchase,
};
