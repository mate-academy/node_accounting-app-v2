let expenses = [];

let maxId = 0;

class Expense {
  static getExpenses({ userId, categories, from, to }) {
    const resultExpenses = expenses.filter((expense) => {
      if (userId && expense.userId.toString() !== userId) {
        return false;
      }

      if (categories && !categories.includes(expense.category)) {
        return false;
      }

      const expenseDate = new Date(expense.spentAt);

      if (from) {
        const fromDate = new Date(from);

        if (expenseDate < fromDate) {
          return false;
        }
      }

      if (to) {
        const toDate = new Date(to);

        if (expenseDate > toDate) {
          return false;
        }
      }

      return true;
    });

    return resultExpenses;
  }

  static addExpense({ userId, spentAt, title, amount, category, note }) {
    const newExpense = {
      id: maxId++,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpense);

    return newExpense;
  }

  static getExpense(id) {
    return (
      expenses.find((expense) => expense.id.toString() === id.toString()) ||
      null
    );
  }

  static deleteExpense(id) {
    expenses = expenses.filter(
      (expense) => expense.id.toString() !== id.toString(),
    );
  }

  static updateExpense(id, props) {
    const index = expenses.findIndex(
      (expense) => expense.id.toString() === id.toString(),
    );

    expenses[index] = { ...expenses[index], ...props };

    return expenses[index];
  }

  static reset() {
    expenses = [];
    maxId = 0;
  }
}

module.exports = Expense;
