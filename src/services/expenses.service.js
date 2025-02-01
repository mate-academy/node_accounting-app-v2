let expenses = [];

const getAll = (userId, categories, from, to) => {
  if (userId) {
    expenses = expenses.filter((e) => e.userId === +userId);
  }

  if (from) {
    const fromDate = new Date(from);

    expenses = expenses.filter((e) => {
      const expenseDate = new Date(e.spentAt);

      return !isNaN(expenseDate) && fromDate <= expenseDate;
    });
  }

  if (to) {
    const toDate = new Date(to);

    expenses = expenses.filter((e) => {
      const expenseDate = new Date(e.spentAt);

      return !isNaN(expenseDate) && expenseDate <= toDate;
    });
  }

  if (categories) {
    expenses = expenses.filter((e) => e.category === categories);
  }

  return expenses;
};

const getById = (id) => {
  return expenses.find((e) => e.id === +id);
};

const create = (body) => {
  const id = (expenses[expenses.length - 1]?.id || 0) + 1;
  const newExpense = { id, ...body };

  expenses.push(newExpense);

  return newExpense;
};

const update = (id, body) => {
  const index = expenses.findIndex((e) => e.id === +id);
  const expense = expenses.find((e) => e.id === +id);

  const updatedExpense = { ...expense, ...body };

  expenses.splice(index, 1, updatedExpense);

  return updatedExpense;
};

const deleteById = (id) => {
  const index = expenses.findIndex((e) => e.id === +id);

  expenses.splice(index, 1);
};

const clearAll = () => {
  expenses.length = 0;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
  clearAll,
};
