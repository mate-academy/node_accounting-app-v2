'use strict';

let expenses = [];

function resetExpenses() {
  expenses = [];
}

const getAllExpenses = () => expenses;

const getQueryExpenses = (userId, from, to, categories) => {
  let visibleExpenses = getAllExpenses();

  if (userId) {
    visibleExpenses = visibleExpenses.filter(exp => exp.userId === +userId);
  }

  if (from && to) {
    const start = new Date(from).getTime();
    const end = new Date(to).getTime();

    visibleExpenses = visibleExpenses.filter(exp => {
      const currExpensesDate = new Date(exp.spentAt).getTime();

      return currExpensesDate >= start && currExpensesDate <= end;
    });
  }

  if (categories) {
    visibleExpenses = visibleExpenses
      .filter(exp => exp.category === categories);
  }

  return visibleExpenses;
};

const getExpenseById = (id) => {
  return expenses.find(expense => expense.id === +id) || null;
};

const createExpense = (
  userId,
  spentAt,
  title,
  amount,
  category,
  note) => {
  const newExpense = {
    id: expenses.length,
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

const deleteExpense = (id) => {
  expenses = expenses.filter(expense => expense.id !== +id);
};

const updateExpense = (id,
  userId,
  spentAt,
  title,
  amount,
  category,
  note,) => {
  const foundExpense = getExpenseById(id);

  const updatedExpense = {
    ...foundExpense,
    userId: userId || foundExpense.userId,
    spentAt: spentAt || foundExpense.spentAt,
    title: title || foundExpense.title,
    amount: amount || foundExpense.amount,
    category: category || foundExpense.category,
    note: note || foundExpense.note,
  };

  expenses = expenses.map(expense => (expense
    .id === foundExpense.id ? updatedExpense : expense));

  return updatedExpense;
};

module.exports = {
  resetExpenses,
  getQueryExpenses,
  getAllExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
};
