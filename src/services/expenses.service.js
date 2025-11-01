/* eslint-disable function-paren-newline */
let expenses = [];

const getExpenses = ({ category, userId, from, to }) => {
  let result = expenses;

  if (category && typeof category === 'string') {
    const categoryList = category.split(',').map((c) => c.trim().toLowerCase());

    result = result.filter((r) =>
      categoryList.includes(r.category.toLowerCase()),
    );
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

const createExpense = ({
  amount,
  description,
  date,
  category,
  userId,
  note,
}) => {
  const newExpense = {
    id: Math.max(0, ...expenses.map((expense) => expense.id)) + 1,
    amount,
    userId,
    title: description,
    spentAt: date,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
};

const deleteExpense = (id) => {
  expenses = expenses.filter((expense) => expense.id !== +id);
};

const updateExpense = ({ id, amount, description, date, category, note }) => {
  const expenseToUpdate = getExpense(+id);

  if (!expenseToUpdate) {
    return null;
  }

  const updateFields = {};

  if (amount !== undefined) {
    updateFields.amount = amount;
  }

  if (description !== undefined) {
    updateFields.title = description;
  }

  if (category !== undefined) {
    updateFields.category = category;
  }

  if (date !== undefined) {
    updateFields.spentAt = date;
  }

  if (note !== undefined) {
    updateFields.note = note;
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
