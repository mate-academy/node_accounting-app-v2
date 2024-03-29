const getExpensesByPeriod = require('../helpers/getExpensesByPeriod');

let expenses = [
  // {
  //   userId: 1,
  //   id: 10,
  //   spentAt: '2022-10-19T11:01:43.462Z',
  //   title: 'Buy a new laptop',
  //   amount: 999,
  //   category: 'Electronics',
  //   note: 'I need a new laptop',
  // },
  // {
  //   userId: 2,
  //   id: 20,
  //   spentAt: '2022-10-20T11:01:43.462Z',
  //   title: 'Buy a new laptop',
  //   amount: 999,
  //   category: 'Electronics',
  //   note: 'I need a new laptop',
  // },
];

const getAll = ({ userId, categories, from, to }) => {
  let filtered = expenses;

  if (userId) {
    filtered = filtered.filter((exp) => exp.userId === +userId);
  }

  if (categories) {
    filtered = filtered.filter((exp) => categories.includes(exp.category));
  }

  if (from) {
    filtered = filtered.filter((exp) => getExpensesByPeriod(exp, from, to));
  }

  return filtered;
};

const create = (expense) => {
  expense.id = Date.now();
  expenses.push(expense);

  return expense;
};

const getById = (id) => {
  return expenses.find((exp) => exp.id === +id) || null;
};

const remove = (id) => {
  expenses = expenses.filter((exp) => exp.id !== +id);
};

const update = (expense, data) => {
  // const expenseToUpdate = getById(expense.id);

  return Object.assign(expense, data);

  // return expenseToUpdate;
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
};
