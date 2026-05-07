let expenseId = 1;
const expenses = [];

const services = {
  getExpenses() {
    return expenses;
  },
  getExpense(id) {
    return expenses.find((expense) => expense.id === id) || null;
  },
  createExpense(expense) {
    const newExpense = { ...expense, id: expenseId++ };

    expenses.push(newExpense);

    return newExpense;
  },
  deleteExpense(id) {
    const index = expenses.findIndex((expense) => expense.id === id);

    if (index === -1) {
      return null;
    }

    const deletedExpense = expenses.splice(index, 1)[0];

    return deletedExpense;
  },
  updateExpense(id, updatedExpense) {
    const index = expenses.findIndex((expense) => expense.id === id);

    if (index === -1) {
      return null;
    }

    Object.assign(expenses[index], updatedExpense);

    return expenses[index];
  },
  reset() {
    expenseId = 1;
    expenses.length = 0;
  },
};

module.exports = {
  services,
};
