let expenses = [];

const resetExpenses = () => {
  expenses = [];
};

const findExpenseById = (id) => expenses.find((expense) => expense.id === id);

const generateExpenseId = () =>
  expenses.length ? Math.max(...expenses.map((expense) => expense.id)) + 1 : 1;

const getExpenses = ({ userId, from, to, categories }) => {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (exp) => exp.userId === Number(userId),
    );
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    filteredExpenses = filteredExpenses.filter((exp) => {
      const spentAtDate = new Date(exp.spentAt);

      return spentAtDate >= fromDate && spentAtDate <= toDate;
    });
  }

  if (categories) {
    const categoryList = categories.split(',');

    filteredExpenses = filteredExpenses.filter((exp) => {
      return categoryList.includes(exp.category);
    });
  }

  return filteredExpenses;
};

const createExpense = ({ userId, spentAt, title, amount, category, note }) => {
  const newExpense = {
    id: generateExpenseId(),
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
  const expense = findExpenseById(id);

  if (expense) {
    if (spentAt) {
      expense.spentAt = spentAt;
    }

    if (title) {
      expense.title = title;
    }

    if (amount) {
      expense.amount = amount;
    }

    if (category) {
      expense.category = category;
    }

    if (note) {
      expense.note = note;
    }
  }

  return expense;
};

const deleteExpense = (id) => {
  const expenseIndex = expenses.findIndex((exp) => exp.id === id);

  if (expenseIndex !== -1) {
    expenses.splice(expenseIndex, 1);

    return true;
  }

  return false;
};

const reset = () => {
  expenses = [];
};

module.exports = {
  resetExpenses,
  findExpenseById,
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  reset,
};
