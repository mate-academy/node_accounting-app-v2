/* eslint-disable no-console */
let expenses = [];

const reset = () => {
  expenses = [];
};

const getId = () =>
  expenses.length > 0 ? Math.max(...expenses.map((e) => e.id)) : 0;

const getAll = (query) => {
  if (Object.keys(query).length) {
    let expensesQuery = [...expenses];

    for (const [k, v] of Object.entries(query)) {
      const value = isNaN(v) ? v : +v;

      console.log(k, value);

      if (k === 'from') {
        expensesQuery = expensesQuery.filter(
          (e) => new Date(e.spentAt) >= new Date(value),
        );
      } else if (k === 'to') {
        expensesQuery = expensesQuery.filter(
          (e) => new Date(e.spentAt) <= new Date(value),
        );
      } else if (k === 'categories') {
        expensesQuery = expensesQuery.filter((e) => e.category === value);
      } else {
        expensesQuery = expensesQuery.filter((e) => e[k] === value);
      }
    }

    return expensesQuery.length > 0 ? expensesQuery : expenses;
  }

  return expenses;
};

const create = ({ userId, spentAt, title, amount, category, note }) => {
  const newExpense = {
    id: getId() + 1,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
};

const getById = (id) => expenses.find((e) => e.id === id);

const remove = (id) => {
  expenses = expenses.filter((e) => e.id !== id);
};

const update = (id, body) => {
  const expense = expenses.find((e) => e.id === id);

  Object.assign(expense, body);

  return expense;
};

module.exports = {
  reset,
  getAll,
  create,
  getById,
  remove,
  update,
};
