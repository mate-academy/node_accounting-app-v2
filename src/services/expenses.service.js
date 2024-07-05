let expenses = [];
let ids = 0;

const getAll = ({ userId, categories, from, to }) => {
  let filtered = expenses;

  if (userId) {
    filtered = filtered.filter((item) => item.userId === +userId);
  }

  if (categories) {
    filtered = filtered.filter((item) => item.category === categories);
  }

  if (from) {
    const fromDate = new Date(from);

    filtered = filtered.filter(
      (expense) => new Date(expense.spentAt) >= fromDate,
    );
  }

  if (to) {
    const toDate = new Date(to);

    filtered = filtered.filter(
      (expense) => new Date(expense.spentAt) <= toDate,
    );
  }

  return filtered;
};

const getOneExpense = (findingId) => {
  const expense = expenses.find((exp) => exp.id === +findingId) || null;

  return expense;
};

const deletingExpense = (delId) => {
  const deleting = getOneExpense(delId);

  if (deleting) {
    expenses = expenses.filter((exp) => exp.id !== +delId);
  }

  return deleting;
};

const updateExpense = (expId, title) => {
  const item = getOneExpense(expId);

  Object.assign(item, {
    title,
  });

  return item;
};

const createExpense = ({ userId, spentAt, title, amount, category, note }) => {
  const newExpense = {
    id: ids++,
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

const reset = () => {
  expenses = [];
};

module.exports = {
  getAll,
  getOneExpense,
  deletingExpense,
  updateExpense,
  createExpense,
  reset,
};
