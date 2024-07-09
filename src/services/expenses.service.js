class ExpensesService {
  constructor() {
    this.expenses = [];
    this.errors = {};
  }
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
  checkData = (data, name) => {
    const requiredMessage = `"${name}" is required`;

    switch (name) {
      case 'userId': {
        if (!data) {
          this.errors[name] = requiredMessage;
        } else if (typeof +data !== 'number') {
          this.errors[name] = `"${name}" must be a number`;
        }
        break;
      }

      case 'spentAt': {
        if (!data) {
          this.errors[name] = requiredMessage;
        } else if (isNaN(Date.parse(data))) {
          this.errors[name] = `"${name}" is not a string date`;
        }
        break;
      }

      case 'amount': {
        if (!data) {
          this.errors[name] = requiredMessage;
        } else if (typeof data !== 'number' || data < 0) {
          this.errors[name] = `"${name}" must be a positive number`;
        }
        break;
      }

      default: {
        if (!data) {
          this.errors[name] = requiredMessage;
        } else if (typeof data !== 'string' || !data.trim()) {
          this.errors[name] = `"${name}" must be a non-empty string`;
        }
      }
    }
  };
  validate = ({ userId, spentAt, title, amount, category, note }) => {
    this.errors = {};

    [
      { data: userId, name: 'userId' },
      { data: spentAt, name: 'spentAt' },
      { data: amount, name: 'amount' },
      { data: title, name: 'title' },
      { data: category, name: 'category' },
      { data: note, name: 'note' },
    ].forEach(({ data, name }) => this.checkData(data, name));
  };
  getErrors = () => this.errors;
}

const expensesService = new ExpensesService();

module.exports = { expensesService };
