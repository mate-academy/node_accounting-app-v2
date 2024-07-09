class ExpensesService {
  expenses = [];
  getAll = ({ userId, categories, from, to }) => {
    let filteredExpenses = this.expenses;

    if (userId) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.userId === +userId,
      );
    }

    if (categories) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.category === categories,
      );
    }

    if (from) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => new Date(expense.spentAt) >= new Date(from),
      );
    }

    if (to) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => new Date(expense.spentAt) <= new Date(to),
      );
    }

    return filteredExpenses;
  };
  resetAll = () => {
    this.expenses = [];
  };
  getById = (idToFind) => this.expenses.find(({ id }) => id === +idToFind);
  create = ({ userId, spentAt, title, amount, category, note }) => {
    const newExpense = {
      id: this.expenses.length,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    this.expenses.push(newExpense);

    return newExpense;
  };
  update = (id, data) => {
    const expense = this.getById(id);

    Object.assign(expense, data);

    return expense;
  };
  delete = (idToDelete) => {
    this.expenses = this.expenses.filter(({ id }) => id !== +idToDelete);
  };
}

const expensesService = new ExpensesService();

module.exports = { expensesService };
