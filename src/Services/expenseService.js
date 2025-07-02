let expenses = [];

const expenseService = {
  getMany(userId, categories, from, to) {
    let result = expenses;

    if (userId) {
      result = result.filter((expense) => expense.userId === Number(userId));
    }

    if (categories) {
      result = result.filter((expense) =>
        categories.includes(expense.category),
      );
    }

    if (from) {
      result = result.filter(
        (expense) =>
          new Date(expense.spentAt).valueOf() > new Date(from).valueOf(),
      );
    }

    if (to) {
      result = result.filter(
        (expense) =>
          new Date(expense.spentAt).valueOf() < new Date(to).valueOf(),
      );
    }

    return result;
  },

  getById(id) {
    return expenses.find((expense) => expense.id === Number(id));
  },

  create(expense) {
    const nextId = expenses.length ? expenses[expenses.length - 1].id + 1 : 1;

    const newExpense = {
      id: nextId,
      ...expense,
    };

    expenses.push(newExpense);

    return newExpense;
  },

  update(id, newData) {
    const expense = this.getById(id);

    Object.assign(expense, newData);

    return expense;
  },
  delete(id) {
    expenses = expenses.filter((expense) => expense.id !== Number(id));
  },

  reset() {
    expenses = [];
  },
};

module.exports = expenseService;
