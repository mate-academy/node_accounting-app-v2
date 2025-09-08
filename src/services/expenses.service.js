let expenses = [];

const getExpenses = () => {
  return expenses;
};

const createExpense = ({ userId, spentAt, title, amount, category, note }) => {
  const id = Date.now();

  const newExpense = {
    id,
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

const getExpense = (id) => {
  return expenses.find((expense) => expense.id === id);
};

const deleteExpense = (id) => {
  const index = expenses.findIndex((expense) => expense.id === id);

  if (index === -1) {
    return;
  }

  return expenses.splice(index, 1);
};

const updateExpense = ({ id, spentAt, title, amount, category, note }) => {
  const expense = expenses.find((exp) => exp.id === id);

  if (!expense) {
    return;
  }

  const updates = {
    title,
    spentAt,
    amount,
    category,
    note,
  };

  for (const key in updates) {
    if (updates[key] !== undefined) {
      expense[key] = updates[key];
    }
  }

  return expense;
};

const resetExpenses = () => {
  expenses = [];
};

module.exports.expensesService = {
  getExpenses,
  createExpense,
  getExpense,
  deleteExpense,
  updateExpense,
  resetExpenses,
};
