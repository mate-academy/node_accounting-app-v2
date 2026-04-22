let expenses = [];
let currentExpenseId = 1;

const getAll = (query = {}) => {
  const { userId, from, to, categories } = query;
  const parsedUserId = userId == null ? undefined : Number(userId);

  return expenses.filter((expense) => {
    if (parsedUserId && expense.userId !== parsedUserId) {
      return false;
    }

    const expenseDate = new Date(expense.spentAt);

    if (from && expenseDate < new Date(from)) {
      return false;
    }

    if (to && expenseDate > new Date(to)) {
      return false;
    }

    if (categories) {
      const categoriesArray = Array.isArray(categories)
        ? categories
        : categories.split(',');

      if (!categoriesArray.includes(expense.category)) {
        return false;
      }
    }

    return true;
  });
};

const getById = (id) => {
  return expenses.find((expense) => expense.id === id);
};

const create = ({ userId, spentAt, title, amount, category, note }) => {
  const newExpense = {
    id: currentExpenseId,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  currentExpenseId++;

  expenses.push(newExpense);

  return newExpense;
};

const deleteById = (id) => {
  const index = expenses.findIndex((e) => e.id === id);

  if (index === -1) {
    return;
  }

  const [expense] = expenses.splice(index, 1);

  return expense;
};

const update = ({ id, spentAt, title, amount, category, note }) => {
  const expense = expenses.find((e) => e.id === id);

  if (!expense) {
    return;
  }

  const updates = {};

  if (spentAt !== undefined) {
    updates.spentAt = spentAt;
  }

  if (title !== undefined) {
    updates.title = title;
  }

  if (amount !== undefined) {
    updates.amount = amount;
  }

  if (category !== undefined) {
    updates.category = category;
  }

  if (note !== undefined) {
    updates.note = note;
  }

  return Object.assign(expense, updates);
};

const resetInitialValues = () => {
  expenses = [];
  currentExpenseId = 1;
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  update,
  resetInitialValues,
};
