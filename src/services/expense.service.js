const { generateNewId } = require('../helpers/generateNewId');

let expenses = [
  {
    id: 0,
    userId: 1,
    spentAt: "2024-01-26T09:55:45.315Z",
    title: "string",
    amount: 45,
    category: "food",
    note: null,
  },
  {
    id: 1,
    userId: 5,
    spentAt: "2024-02-26T09:55:45.315Z",
    title: "string",
    amount: 200,
    category: "fish",
    note: null,
  }
];

const getAll = () => expenses;

const getSome = (params) => {
  const { userId, categories, from, to } = params;

  return expenses.filter(expense => {
    if (+userId === expense.id && categories.includes(expense.category) &&
    new Date(from) <= new Date(expense.spentAt) &&
    new Date(to) >= new Date(expense.spentAt)) {
      return true;
    }

    return false;
  });
};

const getById = (id) => {
  return expenses.find(expense => expense.id === +id) || null;
};

const create = (params) => {
  const newId = generateNewId(expenses);
  const newExpense = { id: newId, ...params };
  expenses.push(newExpense);
  return newExpense;
};

const update = (id, params) => {
  const expenseToUpdate = getById(id);
  Object.assign(expenseToUpdate, { ...params });
  return expenseToUpdate;
}

const remove = (id) => {
  expenses = expenses.filter(user => user.id !== +id);
}

module.exports = { getAll, getSome, getById, create, update, remove };
