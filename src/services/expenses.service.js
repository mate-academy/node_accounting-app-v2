'use strict';

let expenses = [];

const getAllExpenses = () => {
  return expenses;
};

const getExpenses = (params) => {
  const userId = params.get('userId') || null;
  const fromDate = params.get('from') || null;
  const toDate = params.get('to') || null;
  const categories = params.getAll('categories') || [];

  if (userId) {
    expenses = expenses.filter(
      expense => expense.userId === +userId);
  }

  if (fromDate && toDate) {
    expenses = expenses.filter(expense => {
      const spentDate = new Date(expense.spentAt);
      const from = new Date(fromDate);
      const to = new Date(toDate);

      if (spentDate >= from && spentDate <= to) {
        return true;
      } else {
        return false;
      }
    });
  }

  if (categories.length) {
    expenses = expenses.filter(
      expense => categories.includes(expense.category)
    );
  }

  return expenses;
};

const getExpenseById = (id) => {
  return expenses.find(expense => expense.id === Number(id)) || null;
};

const createExpense = (
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) => {
  const id = +(new Date());
  const expense = {
    id,
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

const updateExpense = (id, itemToUpdate) => {
  const expense = getExpenseById(id);

  Object.assign(expense, itemToUpdate);

  return expense;
};

const removeExpense = (id) => {
  expenses = expenses.filter(expense => expense.id !== +id);
};

const clearExpenses = () => {
  expenses = [];
};

module.exports = {
  getAllExpenses,
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  removeExpense,
  clearExpenses,
};
