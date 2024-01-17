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
  expensesFromServer.find(expenses => expenses.id === id) || null
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
  expensesFromServer = expensesFromServer
    .filter(expenses => expenses.id !== id);
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

const filterByCategory = (expenseList, categories, userId) => {
  if (categories && userId) {
    return expenseList
      .filter(item => item.category === categories && item.userId === +userId);
  } else if (userId) {
    return expenseList.filter(item => item.userId === +userId);
  } else {
    return expenseList;
  }
};

const filterByDate = (expenses, from, to) => {
  if (from && to) {
    return expenses.filter(item => item.spentAt > from && item.spentAt < to);
  } else {
    return expenses;
  }
};

module.exports = {
  getAll,
  getById,
  createOne,
  deleteOne,
  updateOne,
  setAll,
  clearExpenses,
  filterByCategory,
  filterByDate,
};
