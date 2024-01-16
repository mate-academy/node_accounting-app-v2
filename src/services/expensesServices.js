'use strict';

let expensesFromServer = [
  {
    userId: 1,
    spentAt: '2022-10-19T11:01:43.462Z',
    title: 'Buy a new laptop',
    amount: 999,
    category: 'Electronics',
    note: 'I need a new laptop',
  },
];

const getAll = () => {
  return expensesFromServer;
};

const getById = (id) => (
  expensesFromServer.find(e => e.id === id) || null
);

const createOne = ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const expenses = {
    id: expensesFromServer.length + 1,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expensesFromServer = [...expensesFromServer, expenses];

  return expenses;
};

const deleteOne = (id) => {
  expensesFromServer = expensesFromServer.filter(e => e.id !== id);
};

const updateOne = (title, expenses) => {
  Object.assign(expenses, { title });

  return expenses;
};

const setAll = (newExpenses) => {
  expensesFromServer = newExpenses;
};

const clearExpenses = () => {
  expensesFromServer = [];
};

module.exports = {
  getAll,
  getById,
  createOne,
  deleteOne,
  updateOne,
  setAll,
  clearExpenses,
};
