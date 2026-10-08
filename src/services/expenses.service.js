/* eslint-disable no-console */
let expenses = [];

const clearExpenses = () => {
  expenses = [];
};

const getAll = (query) => {
  return expenses.filter((expense) => {
    const { categories, userId, from, to } = query;
    const spentAtTime = new Date(expense.spentAt).getTime();

    const isCategoriesMatch = !categories || expense.category === categories;
    const isUserMatch = !userId || +userId === expense.userId;
    const isFromMatch = !from || spentAtTime >= new Date(from).getTime();
    const isToMatch = !to || spentAtTime <= new Date(to).getTime();

    return isUserMatch && isCategoriesMatch && isFromMatch && isToMatch;
  });
};

const create = (expense) => {
  const newExpense = {
    id: Date.now(),
    ...expense,
  };

  expenses.push(newExpense);

  return newExpense;
};

const get = (id) => {
  return expenses.find((expense) => expense.id === id);
};

const update = (id, fieldsToUpdate) => {
  const targetExpense = get(id);

  return Object.assign(targetExpense, fieldsToUpdate);
};

const remove = (id) => {
  expenses = expenses.filter((expense) => expense.id !== id);
};

module.exports = {
  getAll,
  create,
  get,
  update,
  remove,
  clearExpenses,
};
