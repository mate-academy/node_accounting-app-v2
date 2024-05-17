const userService = require('./user.service');
let expenses = [];

const initExpenses = () => {
  expenses = [];
};

const createNewId = () => {
  if (!expenses.length) {
    return 1;
  }

  const expensesIdsArr = expenses.map((expense) => expense.id);

  return Math.max(...expensesIdsArr) + 1;
};

const get = ({ userId, from, to, categories }) => {
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

  const id = createNewId();
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
  get,
  getById,
  create,
  update,
  remove,
};
