const { generateRandomId } = require('../utils/generateRandomId');

let expenses = [];

const resetAllExpenses = () => {
  expenses = [];
};

const allExpenses = (userId, categories, from, to) => {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId === +userId,
    );
  }

  // prettier-ignore
  if (categories) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => categories.includes(expense.category),
    );
  }

  if (from || to) {
    filteredExpenses = filteredExpenses.filter((expense) => {
      if (from && to) {
        return expense.spentAt >= from && expense.spentAt <= to;
      } else if (from) {
        return expense.spentAt >= from;
      } else {
        return expense.spentAt <= to;
      }
    });
  }

  return filteredExpenses;
};

const expenseById = (id) => {
  return expenses.find((expense) => expense.id === +id);
};

const createExpense = ({ userId, spentAt, title, amount, category, note }) => {
  const newExpense = {
    id: generateRandomId(),
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

const updateExpense = (id, { spentAt, title, amount, category, note }) => {
  const expense = expenseById(id);

  if (!expense) {
    return null;
  }

  if (spentAt !== undefined) {
    expense.spentAt = spentAt;
  }

  if (title !== undefined) {
    expense.title = title;
  }

  if (amount !== undefined) {
    expense.amount = amount;
  }

  if (category !== undefined) {
    expense.category = category;
  }

  if (note !== undefined) {
    expense.note = note;
  }

  return expense;
};

const deleteExpense = (id) => {
  expenses = expenses.filter((expense) => expense.id !== +id);
};

module.exports = {
  allExpenses,
  expenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  resetAllExpenses,
};
