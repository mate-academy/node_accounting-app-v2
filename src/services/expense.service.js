let expenses = [];

const getExpenses = ({ category, userId, fromDate, toDate }) => {
  let result = expenses;

  if (category) {
    result = result.filter((r) => r.category === category);
  }

  if (userId) {
    result = result.filter((r) => r.userId === +userId);
  }

  if (fromDate) {
    const start = new Date(fromDate);

    if (!isNaN(start)) {
      result = result.filter((r) => new Date(r.spentAt) >= start);
    }
  }

  if (toDate) {
    const finish = new Date(toDate);

    if (!isNaN(finish)) {
      result = result.filter((r) => new Date(r.spentAt) <= finish);
    }
  }

  return result;
};

const getExpense = (id) => {
  return expenses.find((e) => e.id === +id);
};

const createExpense = ({ userId, spentAt, title, amount, category, note }) => {
  const newExpense = {
    id: Math.max(0, ...expenses.map((user) => user.id)) + 1,
    userId: +userId,
    spentAt,
    title,
    amount: +amount,
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

module.exports = {
  getExpenses,
  getExpense,
  createExpense,
  deleteExpense,
  updateExpense,
};
