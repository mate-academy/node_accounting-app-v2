const { getNewId } = require('../getNewId');

let expenses = [];

const get = () => {
  return expenses;
};

const getById = (id) => {
  return expenses.find((expense) => expense.id === id);
};

const create = (newExpenseBody) => {
  const newExpense = { id: getNewId(expenses), ...newExpenseBody };

  expenses.push(newExpense);

  return newExpense;
};

const remove = (id) => {
  expenses = expenses.filter((expense) => expense.id !== id);
};

const update = (id, updatedExpenseBody) => {
  const expenseToUpdate = getById(id);

  Object.assign(expenseToUpdate, updatedExpenseBody);

  return expenseToUpdate;
};

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
};
