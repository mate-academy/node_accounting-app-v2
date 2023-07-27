'use strict';

let { expenses } = require('../storeOfData/base');
const { uuidToNumber } = require('../entity/uuidToNumber');
const { v4: uuidv4 } = require('uuid');

function setInitialExpenses() {
  expenses = [];
}

function getAll(queryParams) {
  const { userId, categories, from, to } = queryParams;

  return expenses.filter((expense) => {
    switch (true) {
      case userId && +expense.userId !== +userId:
      case categories && !categories.includes(expense.category):
      case from && new Date(expense.spentAt) < new Date(from):
      case to && new Date(expense.spentAt) > new Date(to):
        return false;

      default:
        return true;
    }
  });
}

function getById(expenseId) {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense || null;
}

function create(expense) {
  const newExpense = {
    id: uuidToNumber(uuidv4()),
    userId: Number(expense.userId),
    spentAt: expense.spentAt,
    title: String(expense.title),
    amount: Number(expense.amount),
    category: String(expense.category),
    note: String(expense.note),
  };

  expenses.push(newExpense);

  return newExpense;
}

function remove(expenseId) {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
}

function update(reqParams) {
  const expense = getById(+reqParams.id);

  Object.assign(expense, reqParams);

  return expense;
}

function checkParams(reqParams) {
  const availableParams = [
    'userId',
    'spentAt',
    'title',
    'amount',
    'category',
  ];

  const bodyKeys = Object.keys(reqParams);

  const requireParams = [];

  for (const param of availableParams) {
    if (!bodyKeys.includes(param)) {
      requireParams.push(param);
    }
  }

  return requireParams;
}

module.exports = {
  setInitialExpenses,
  checkParams,
  getAll,
  getById,
  create,
  remove,
  update,
};
