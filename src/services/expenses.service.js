let expenses = [];

const getExpenses = ({ categories, userId, from, to }) => {
  let result = expenses;

  if (categories) {
    const categoryList = categories.split(',').map((c) => c.trim());

    result = result.filter((r) => categoryList.includes(r.category));
  }

  if (userId) {
    result = result.filter((r) => r.userId === +userId);
  }

  if (from) {
    const start = Date.parse(from);

    result = result.filter((r) => Date.parse(r.spentAt) >= start);
  }

  if (to) {
    const finish = Date.parse(to);

    result = result.filter((r) => Date.parse(r.spentAt) <= finish);
  }

  return result;
};

const getExpense = (id) => {
  return expenses.find((e) => e.id === +id);
};

const createExpense = ({ userId, spentAt, title, amount, category, note }) => {
  const newExpense = {
    id: Math.max(0, ...expenses.map((expense) => expense.id)) + 1,
    userId: userId,
    spentAt,
    title,
    amount: amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
};

const deleteExpense = (id) => {
  expenses = expenses.filter((expense) => expense.id !== +id);
};

const updateExpense = ({ id, spentAt, title, amount, category, note }) => {
  const expenseToUpdate = getExpense(+id);

  if (!expenseToUpdate) {
    return null;
  }

  const updateFields = {};

  if (title !== undefined) {
    updateFields.title = title;
  }

  if (note !== undefined) {
    updateFields.note = note;
  }

  if (amount !== undefined) {
    updateFields.amount = amount;
  }

  if (category !== undefined) {
    updateFields.category = category;
  }

  if (spentAt !== undefined) {
    updateFields.spentAt = spentAt;
  }

  Object.assign(expenseToUpdate, updateFields);

  return expenseToUpdate;
};

const resetExpenses = () => {
  expenses = [];
};

module.exports = {
  getExpenses,
  getExpense,
  createExpense,
  deleteExpense,
  updateExpense,
  resetExpenses,
};
