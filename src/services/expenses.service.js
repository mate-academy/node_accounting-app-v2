/* eslint-disable curly */
const { v4: uuidv4 } = require('uuid');

const expenses = [];

const getAll = ({ userId, from, to, categories }) => {
  let filteredExpanses = [...expenses];

  if (userId) {
    filteredExpanses = filteredExpanses.filter((ex) => ex.userId === userId);
  }

  if (categories) {
    filteredExpanses = filteredExpanses.filter(
      (ex) => ex.category === categories,
    );
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    filteredExpanses = filteredExpanses.filter(({ spentAt }) => {
      const expDate = new Date(spentAt);

      return expDate >= fromDate && expDate <= toDate;
    });
  }

  return filteredExpanses;
};

const getById = (id) => {
  return expenses.find((exp) => exp.id === id);
};

const create = (body) => {
  const { userId, spentAt, title, amount, category, note } = body;

  const expense = {
    id: uuidv4(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(expense);

  return expense;
};

const deleteById = (id) => {
  const index = expenses.findIndex((exp) => exp.id === id);

  if (index === -1) return;

  const [expense] = expenses.splice(index, 1);

  return expense;
};

const update = ({ id, userId, spentAt, title, amount, category, note }) => {
  const expense = getById(id);

  return Object.assign(expense, {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const clear = () => {
  expenses.splice(0);
};

module.exports = {
  expensesService: {
    getAll,
    getById,
    create,
    deleteById,
    update,
    clear,
  },
};
