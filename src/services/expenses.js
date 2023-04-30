'use strict';

const expenses = [];

let countExpensesId = 0;

const getExpenses = ({ from, to, category, userId }) => {
  const startFrom = Date.parse(from);
  const end = Date.parse(to);
  let filteredExpenses = expenses;

  if (startFrom) {
    const result = filteredExpenses.filter(expense => {
      const date = Date.parse(expense.spentAt);

      if (date >= startFrom) {
        return expense;
      }
    });

    filteredExpenses = result;
  }

  if (end) {
    const result = filteredExpenses.filter(expense => {
      const date = Date.parse(expense.spentAt);

      if (date <= end) {
        return expense;
      }
    });

    filteredExpenses = result;
  }

  if (category) {
    const result = filteredExpenses.filter(expense => (
      expense.category === category)
    );

    filteredExpenses = result;
  }

  if (userId) {
    const result = filteredExpenses.filter(expense => (
      expense.userId === +userId
    ));

    filteredExpenses = result;
  }

  return filteredExpenses;
};

const getExpensesById = (expenseId) => {
  const foundExpense = expenses.find(expense => expense.id === expenseId);

  return foundExpense || null;
};

const createExpense = ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note = 'Any notes',
}) => {
  const newExpense = {
    id: countExpensesId,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  countExpensesId++;

  expenses.push(newExpense);

  return newExpense;
};

const removeExpense = (expenseId) => {
  const foundExpenseIndex = expenses.findIndex(expense => (
    expense.id === expenseId
  ));
  const deleted = expenses.splice(foundExpenseIndex, 1);

  return deleted;
};

const updateExpense = (expenseId, body) => {
  const foundExpense = getExpensesById(expenseId);

  Object.assign(foundExpense, body);

  return foundExpense;
};

module.exports = {
  getExpenses,
  getExpensesById,
  createExpense,
  removeExpense,
  updateExpense,
};
