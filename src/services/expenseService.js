let expenses = [];
let expenseId = 1;

class ExpensesService {
  resetData = () => {
    expenses = [];
  };

  getByFilter = ({ categories, userId, from, to }) => {
    let filteredExpenses = [...expenses];

    if (userId) {
      filteredExpenses = filteredExpenses.filter(
        (item) => String(item.userId) === String(userId),
      );
    }

    if (categories) {
      const cats = categories.split(',');

      filteredExpenses = filteredExpenses.filter(
        (item) => cats.includes(item.category),
        // eslint-disable-next-line function-paren-newline
      );
    }

    if (from && to) {
      filteredExpenses = filteredExpenses.filter(
        (item) => item.spentAt >= from && item.spentAt <= to,
      );
    }

    return filteredExpenses;
  };

  getById = (id) => {
    return expenses.find((user) => user.id === id) || null;
  };

  create = (expenseData) => {
    const { userId, spentAt, title, amount, category, note } = expenseData;

    const newExpense = {
      id: expenseId++,
      userId,
      spentAt,
      title,
      amount,
      category,
      note: note || '',
    };

    expenses.push(newExpense);

    return newExpense;
  };

  update(id, expenseData) {
    const { userId, spentAt, title, amount, category, note } = expenseData;
    const expense = this.getById(id);

    if (userId) {
      expense.userId = userId;
    }

    if (spentAt) {
      expense.spentAt = spentAt;
    }

    if (title) {
      expense.title = title.trim();
    }

    if (amount) {
      expense.amount = amount;
    }

    if (category) {
      expense.category = category;
    }

    if (note) {
      expense.note = note;
    }

    return expense;
  }

  delete = (id) => {
    expenses = expenses.filter((expense) => expense.id !== id);
  };
}

module.exports = new ExpensesService();
