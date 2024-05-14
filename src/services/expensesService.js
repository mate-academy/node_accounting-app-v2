let expenses = [];

const init = () => {
  expenses = [];
};

const getExpenses = (userId, categories, from, to) => {
  let filteredExpenses = [...expenses];

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (item) => item.userId === Number(userId),
    );
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(
      (item) => item.category === categories,
    );
  }

  if (from || to) {
    filteredExpenses = filteredExpenses.filter(
      (item) => item.spentAt >= from && item.spentAt <= to,
    );
  }

  return filteredExpenses;
};

const getExpenseById = (id) => {
  return expenses.find((expense) => expense.id === Number(id)) || null;
};

const create = (
  userId,
  spentAt = new Date().toISOString(),
  title,
  amount = 1,
  category,
  note,
) => {
  const newExpense = {
    userId,
    id: expenses.length,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
};

const remove = (id) => {
  expenses = expenses.filter((expense) => expense.id !== Number(id));
};

const update = ({ id, title }) => {
  const updatedExpense = getExpenseById(id);

  Object.assign(updatedExpense, {
    title,
  });

  return updatedExpense;
};

module.exports = {
  getExpenses,
  getExpenseById,
  create,
  remove,
  update,
  init,
};
