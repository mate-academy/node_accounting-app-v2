const { v4: uuidv4 } = require('uuid');
// const newId = uuidv4();

const expenses = [];

const resetExpenses = () => {
  expenses.splice(0, expenses.length);
};

const getExpenses = (userId, categories, from, to) => {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = expenses.filter((expense) => expense.userId === userId);
  }

  if (categories) {
    filteredExpenses = expenses.filter(
      (expense) => expense.category === categories,
    );
  }

  if (from || to) {
    if (from && to) {
      filteredExpenses = expenses.filter(
        (expense) => expense.spentAt >= from && expense.spentAt <= to,
      );
    } else if (to) {
      filteredExpenses = expenses.filter((expense) => expense.spentAt <= to);
    } else {
      filteredExpenses = expenses.filter((expense) => expense.spentAt >= from);
    }
  }

  return filteredExpenses;
};

const getOneExpense = (id) => {
  return expenses.find((expense) => expense.id === id);
};

const createExpense = (userId, spentAt, title, amount, category, note) => {
  const newExpense = {
    id: uuidv4(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);
};

const removeExpense = (id) => {
  const index = expenses.findIndex((expense) => expense.id === id);

  if (index === -1) {
    return false;
  }

  expenses.splice(index, 1);

  return true;
};

const updateExpense = (
  id,
  { userId, spentAt, title, amount, category, note },
) => {
  const selectedExpense = getOneExpense(id);

  Object.assign(selectedExpense, {
    ...(userId !== undefined && { userId }),
    ...(spentAt !== undefined && { spentAt }),
    ...(title !== undefined && { title }),
    ...(amount !== undefined && { amount }),
    ...(category !== undefined && { category }),
    ...(note !== undefined && { note }),
  });

  return selectedExpense;
};

module.exports = {
  resetExpenses,
  updateExpense,
  removeExpense,
  createExpense,
  getExpenses,
  getOneExpense,
};
