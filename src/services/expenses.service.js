'use strict';

function createExpensesService() {
  const expenses = [];
  let lastID = 0;

  function getAll({ userId, from, to, categories } = {}) {
    let result = expenses;

    if (userId !== undefined) {
      result = result.filter((e) => e.userId === Number(userId));
    }

    if (from) {
      result = result.filter((e) => new Date(e.spentAt) >= new Date(from));
    }

    if (to) {
      result = result.filter((e) => new Date(e.spentAt) <= new Date(to));
    }

    if (categories) {
      const cats = Array.isArray(categories) ? categories : [categories];

      result = result.filter((e) => cats.includes(e.category));
    }

    return result;
  }

  function getById(id) {
    return expenses.find((expense) => expense.id === id);
  }

  function create(data) {
    lastID++;

    const expense = {
      id: lastID,
      ...data,
    };

    expenses.push(expense);

    return expense;
  }

  function deleteById(id) {
    const index = expenses.findIndex((e) => e.id === id);

    if (index === -1) {
      return;
    }

    const [expense] = expenses.splice(index, 1);

    return expense;
  }

  function update(id, data) {
    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      return;
    }

    Object.assign(expense, data);

    return expense;
  }

  return {
    getAll,
    getById,
    create,
    deleteById,
    update,
  };
}

module.exports = {
  createExpensesService,
};
