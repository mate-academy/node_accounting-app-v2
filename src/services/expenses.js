'use strict';

const collectionServices = require('./collections');

function getFoundPurchaseById(purchaseId) {
  const foundPurchase = collectionServices.getCollection().expenses
    .find(purchase => purchase.id === purchaseId);

  return foundPurchase || null;
}

function getFilteredExpensesById(purchaseId) {
  const filteredExpenses = collectionServices.getCollection().expenses
    .filter(purchase => purchase.id !== purchaseId);

  return filteredExpenses;
}

module.exports = {
  getFoundPurchaseById,
  getFilteredExpensesById,
};
