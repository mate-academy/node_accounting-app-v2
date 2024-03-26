const { users } = require('../services/user.service');
const filterByPeriod = require('../helpers/filterExpensesByPeriod.js');
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
  // {
  //   userId: 1,
  //   id: 30,
  //   spentAt: '2022-10-21T11:01:43.462Z',
  //   title: 'Buy a new laptop',
  //   amount: 999,
  //   category: 'Electronics',
  //   note: 'I need a new laptop',
  // },
  // {
  //   userId: 1,
  //   id: 40,
  //   spentAt: '2022-11-21T11:01:43.462Z',
  //   title: 'Buy a new laptop',
  //   amount: 999,
  //   category: 'Cars',
  //   note: 'I need a new laptop',
  // },
];

const getAll = ({ userId, from, to, categories }) => {
  let filtered = expenses;

  if (userId) {
    filtered = filtered.filter((el) => el.userId === +userId);
  }

  if (categories) {
    filtered = filtered.filter((el) => categories.includes(el.category));
  }

  if (from) {
    filtered = filtered.filter((el) => filterByPeriod(el, from, to));
  }

  return filtered;
};

const getOne = (id) => {
  return expenses.find((el) => el.id === +id);
};

const create = (expense) => {
  const user = users.find((el) => el.id === expense.userId) || null;

  if (!user) {
    return false;
  }

  const isValid = validateExpense(expense);

  if (!isValid) {
    return false;
  }

  expense.id = Date.now();
  expenses.push(expense);

  return expense;
};

const remove = (id) => {
  const expense = expenses.find((el) => el.id === +id) || null;

  if (!expense) {
    return false;
  }

  expenses = expenses.filter((el) => el.id === id);

  return true;
};

const update = (id, body) => {
  const isValid = validateExpense({ ...body, id, userId: 0 });

  if (!isValid) {
    return 'Wrong body';
  }

  const expense = expenses.find((el) => el.id === +id);

  if (!expense) {
    return 'Not found';
  }

  const { spentAt, title, amount, category, note } = body;

  Object.assign(expense, {
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return expense;
};

const validateExpense = (expense) => {
  if (typeof expense.userId !== 'number') {
    return false;
  }

  if (typeof expense.spentAt !== 'string' || !expense.spentAt.length) {
    return false;
  }

  if (typeof expense.title !== 'string' || !expense.title.length) {
    return false;
  }

  if (typeof expense.amount !== 'number') {
    return false;
  }

  if (typeof expense.category !== 'string' || !expense.category.length) {
    return false;
  }

  if (typeof expense.note !== 'string') {
    return false;
  }

  return true;
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
