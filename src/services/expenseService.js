/* eslint-disable function-paren-newline */

const expenses = [];

const expenseServise = {};

expenseServise.reset = () => {
  expenses.length = 0;
};

expenseServise.getAll = (userId, categories, from, to) => {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (exp) => exp.userId === Number(userId),
    );
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter((exp) =>
      categories.includes(exp.category),
    );
  }

  if (from) {
    const fromDate = new Date(from);

    filteredExpenses = filteredExpenses.filter(
      (exp) => new Date(exp.spentAt) >= fromDate,
    );
  }

  if (to) {
    const toDate = new Date(to);

    filteredExpenses = filteredExpenses.filter(
      (exp) => new Date(exp.spentAt) <= toDate,
    );
  }

  return filteredExpenses;
};

expenseServise.getById = (id) => {
  return expenses.find((outlay) => outlay.id === Number(id)) || null;
};

expenseServise.create = (body) => {
  const { userId, title, amount, category, note, spentAt } = body;

  const expense = {
    id: Math.floor(Math.random() * 10000),
    userId,
    spentAt,
    title,
    category,
    amount,
    note,
  };

  expenses.push(expense);

  return expense;
};

expenseServise.update = (id, body) => {
  const expense = expenseServise.getById(id);

  Object.assign(expense, body);

  return expense;
};

expenseServise.remove = (id) => {
  const index = expenses.findIndex((user) => user.id === Number(id));

  expenses.splice(index, 1);
};

module.exports = expenseServise;
