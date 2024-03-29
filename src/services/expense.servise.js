const filterByPeriod = require('../helpers/filterExpensesByPeriod.js');
let expenses = [];

function init() {
  expenses = [];
}

const getAll = ({ userId, from, to, categories }) => {
  return expenses.filter((el) => {
    return (
      (!userId || el.userId === +userId) &&
      (!categories || categories.includes(el.category)) &&
      (!from || filterByPeriod(el, from, to))
    );
  });
};

const getOne = (id) => {
  return expenses.find((el) => el.id === +id);
};

const create = (expense) => {
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
  const isValid = validateUpdateData({ ...body, id, userId: 0 });

  if (!isValid) {
    return 'Wrong body';
  }

  const expense = expenses.find((el) => el.id === +id);

  if (!expense) {
    return 'Not found';
  }

  Object.assign(expense, { ...body });

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

const validateUpdateData = (expense) => {
  const { userId, spentAt, title, amount, category, note } = expense;

  if (userId && typeof userId !== 'number') {
    return false;
  }

  if (spentAt && (typeof spentAt !== 'string' || !spentAt.length)) {
    return false;
  }

  if (title && (typeof title !== 'string' || !title.length)) {
    return false;
  }

  if (amount && typeof amount !== 'number') {
    return false;
  }

  if (category && (typeof category !== 'string' || !category.length)) {
    return false;
  }

  if (note && typeof note !== 'string') {
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
  init,
};
