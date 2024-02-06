'use strict';

const isEmpty = require('lodash.isempty');

module.exports = {
  getAll,
  getById,
  create,
  removeById,
  removeAll,
  update,
  findMatchProps,
};

/**
 * @typedef {object} Expense
 * @property {number} id
 * @property {number} userId
 * @property {string} spentAt
 * @property {string} title
 * @property {number} amount
 * @property {string} category
 * @property {string} note
 */

/** @type {Expense[]} */
const expenses = [];
let maxId = expenses.length;

/** @param {{userId:number, categories:string[], from:string, to:string}} */
function getAll({
  userId,
  categories,
  from,
  to,
}) {
  /** @type {Expense[]} */
  let expensesFiltred = expenses;

  if (Number.isInteger(userId)) {
    expensesFiltred
      = expensesFiltred.filter(e => e.userId === userId);
  }

  if (categories) {
    expensesFiltred
      = expensesFiltred.filter(e => categories.includes(e.category));
  }

  if (from && to) {
    expensesFiltred
      = expensesFiltred.filter(e => {
        const spentAtValue = new Date(e.spentAt).valueOf();

        return spentAtValue >= new Date(from).valueOf()
          && spentAtValue <= new Date(to).valueOf();
      });
  }

  return expensesFiltred;
}

/** @type {number} id */
function getById(id) {
  return expenses.find(e => e.id === id) || null;
}

/** @param {Expense} */
function create({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) {
  const expense = {
    id: maxId++,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(expense);

  return expense;
}

/** @param {number} id */
function removeById(id) {
  const itemIndx = getIndexById(id);

  return itemIndx === -1
    ? null
    : removeByIndex(itemIndx);
}

/** @param {number} itemIndx */
function removeByIndex(itemIndx) {
  return expenses.splice(itemIndx, 1);
}

function removeAll() {
  expenses.splice(0, expenses.length);
  maxId = expenses.length;
}

/** @param {Expense} expenseSource */
function update(expenseSource) {
  const { id, ...restProps } = expenseSource;
  const expenseTarget = getById(id);

  if (expenseTarget) {
    Object.assign(expenseTarget, { ...restProps });
  }

  return expenseTarget;
}

/** @param {number} id */
function getIndexById(id) {
  return expenses.findIndex(e => e.id === id);
}

/**
 * @param {object} targetObj
 * @param {object} sourceObj */
function findMatchProps(targetObj, sourceObj) {
  const result = {};

  for (const [targetKey, targetValue] of Object.entries(targetObj)) {
    if (!(targetKey in sourceObj)
    || typeof targetValue !== typeof sourceObj[targetKey]) {
      continue;
    }

    result[targetKey] = sourceObj[targetKey];
  }

  return isEmpty(result) ? null : result;
}
