const userService = require('./user.service');
const { getMaxID } = require('./../utils/getMaxID');
let expenses = [];

const initExpenses = () => {
  expenses = [];
};

const getAll = ({ userId, from, to, categories }) => {
  let preparedExpenses = expenses;

  if (userId) {
    preparedExpenses = preparedExpenses.filter(
      (expense) => expense.userId === Number(userId),
    );
  }

  if (from || to) {
    preparedExpenses = preparedExpenses.filter((expense) => {
      const date = expense.spentAt;

      if (date >= from && date <= to) {
        return expense;
      }
    });
  }

  if (categories) {
    preparedExpenses = preparedExpenses.filter((expense) => {
      return categories.includes(expense.category);
    });
  }

  return preparedExpenses;
};

const getById = (id) => {
  return expenses.find((expense) => expense.id === Number(id));
};

const create = (expenseData) => {
  if (!userService.getById(expenseData.userId)) {
    return;
  }

  const id = getMaxID(expenses);
  const newExpense = Object.assign(expenseData, { id });

  expenses.push(newExpense);

  return newExpense;
};

const update = (expense, values) => {
  return Object.assign(expense, values);
};

const remove = (id) => {
  expenses = expenses.filter((expense) => expense.id !== Number(id));
};

module.exports = {
  initExpenses,
  getAll,
  getById,
  create,
  update,
  remove,
};
