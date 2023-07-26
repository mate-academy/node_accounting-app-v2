'use strict';

let expenses = [];

const setInitSxpanses = () => {
  expenses = [];
};

const getAll = () => {
  return expenses;
};

const getFiltered = (userid, categories, from, to) => {
  let filteredExpenses = expenses;

  if (userid) {
    filteredExpenses = filteredExpenses.filter(
      expense => expense.userId === userid,
    );
  }

  if (categories) {
    filteredExpenses = expenses.filter(expense => (
      categories.includes(expense.category)
    ));
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    filteredExpenses = expenses.filter(expense => {
      const spentAt = new Date(expense.spentAt);

      return spentAt >= fromDate && spentAt <= toDate;
    });
  }

  return filteredExpenses;
};

const getById = (userId) => {
  return expenses.find(({ id }) => id === userId);
};

const create = (userId, spentAt, title, amount, category, note) => {
  const id = Math.max(...expenses.map((item) => item.id), 0) + 1;

  const newUser = {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newUser);

  return newUser;
};

const remove = (id) => {
  const filteredexpenses = expenses.filter((item) => item.id !== id);

  const prevLength = expenses.length;

  expenses = filteredexpenses;

  return expenses.length !== prevLength;
};

const update = (id, body) => {
  const expenseToUpdate = getById(id);

  if (!expenseToUpdate) {
    return false;
  }

  const updatedExpense = {
    ...expenseToUpdate,
    ...body,
  };

  Object.assign(expenseToUpdate, updatedExpense);

  return expenseToUpdate;
};

const expensesServices = {
  getAll,
  getById,
  create,
  remove,
  update,
  setInitSxpanses,
  getFiltered,
};

module.exports = { expensesServices };
