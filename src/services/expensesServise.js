const getRandomId = () => {
  return Math.floor(Math.random() * 1000);
};

let expenses = [];

const resetExpenses = () => {
  expenses = [];
};

const getAllExpenses = (userId, categories, from, to) => {
  if (userId) {
    expenses = expenses.filter((expense) => expense.userId === +userId);
  }

  if (categories) {
    expenses = expenses.filter((expense) => expense.category === categories);
  }

  if (from || to) {
    expenses = expenses.filter((expense) => {
      if (from && to) {
        return expense.spentAt >= from && expense.spentAt <= to;
      } else if (from) {
        return expense.spentAt >= from;
      } else {
        return expense.spentAt <= to;
      }
    });
  }

  return expenses;
};

const getExpenseById = (id) => {
  return expenses.find((expense) => expense.id === +id);
};

const createExpense = (userId, spentAt, title, amount, category, note) => {
  const expense = {
    id: getRandomId(),
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

const updateExpense = (id, { spentAt, title, amount, category, note }) => {
  const expense = getExpenseById(id);

  const updatedExpense = {
    ...expense,
    ...(spentAt !== undefined && { spentAt }),
    ...(title !== undefined && { title }),
    ...(amount !== undefined && { amount }),
    ...(category !== undefined && { category }),
    ...(note !== undefined && { note }),
  };

  return updatedExpense;
};

const removeExpense = (id) => {
  expenses = expenses.filter((expense) => expense.id !== +id);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  removeExpense,
  resetExpenses,
};
