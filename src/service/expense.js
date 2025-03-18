const checkIsValidSchema = require('../utils/checkIsValidSchema');
const compareDates = require('../utils/compareDates');

const ExpenseSchema = {
  id: 'number',
  userId: 'number',
  spentAt: 'string',
  title: 'string',
  amount: 'number',
  category: 'string',
  note: 'string',
};

let EXPENSE = [];
let EXPENSE_ID = 1;

const getAll = ({ userId, categories, from, to }) => {
  return EXPENSE.filter((e) => {
    const matchesUserId = userId ? e.userId === +userId : true;
    const matchesCategory = categories ? categories.includes(e.category) : true;
    const matchesFrom = from ? compareDates('from', from, e.spentAt) : true;
    const matchesTo = to ? compareDates('to', to, e.spentAt) : true;

    return matchesUserId && matchesCategory && matchesFrom && matchesTo;
  });
};

const getById = (id) => {
  return EXPENSE.find((item) => item.id === id);
};

const create = ({ userId, spentAt, title, amount, category, note }) => {
  const expense = {
    id: EXPENSE_ID,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  if (!checkIsValidSchema(ExpenseSchema, expense)) {
    return null;
  }

  EXPENSE.push(expense);

  EXPENSE_ID++;

  return expense;
};

const remove = (id) => {
  EXPENSE = EXPENSE.filter((expense) => expense.id !== id);
};

const update = (id, dataToUpdate) => {
  const expense = getById(id);

  Object.assign(expense, dataToUpdate);

  return expense;
};

const clear = () => {
  EXPENSE = [];
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
  clear,
};
