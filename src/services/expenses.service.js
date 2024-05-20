const {
  getItemById,
  getNewId,
  getFilteredItems,
  getPreparedExpenses,
} = require('../utils/utils');

let expenses = [];

const initialise = () => {
  expenses = [];
};

const getAll = (query) => getPreparedExpenses(query, expenses);

const getOneById = (id) => getItemById(id, expenses);

const create = ({ userId, spentAt, title, amount, category, note }) => {
  const newExpense = {
    id: getNewId(expenses),
    userId,
    spentAt,
    title,
    amount,
    category,
    note: note || '',
  };

  expenses.push(newExpense);

  return newExpense;
};

const remove = (id) => {
  expenses = getFilteredItems(id, expenses);
};

const update = (id, { title, spentAt, amount, category, note }) => {
  const expenseToUpdate = getOneById(id);

  if (!expenseToUpdate) {
    return;
  }

  Object.assign(expenseToUpdate, {
    spentAt: spentAt || expenseToUpdate.spentAt,
    title: title || expenseToUpdate.title,
    amount: amount || expenseToUpdate.amount,
    category: category || expenseToUpdate.category,
    note: note || expenseToUpdate.note,
  });

  return expenseToUpdate;
};

module.exports = {
  initialise,
  getAll,
  getOneById,
  create,
  remove,
  update,
};
