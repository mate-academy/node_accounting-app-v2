const userService = require('./userService');

let expenses = [];

class ExpenseService {
  resetData() {
    expenses = [];
  }

  getAllExpenses({ userId, categories, from, to } = {}) {
    let result = [...expenses];

    if (userId) {
      const id = Number(userId);

      result = result.filter((e) => e.userId === id);
    }

    if (categories) {
      const cats = Array.isArray(categories) ? categories : [categories];

      result = result.filter((e) => cats.includes(e.category));
    }

    if (from) {
      const fromDate = new Date(from);

      result = result.filter((e) => new Date(e.spentAt) >= fromDate);
    }

    if (to) {
      const toDate = new Date(to);

      result = result.filter((e) => new Date(e.spentAt) <= toDate);
    }

    return result;
  }

  createExpense(expenseData) {
    const { userId, spentAt, title, amount, category, note } = expenseData;

    if (!userId || !spentAt || !title || amount === undefined || !category) {
      throw new Error('Required fields missing');
    }

    // Always store userId as integer for consistency with tests
    const intUserId = typeof userId === 'string' ? parseInt(userId) : userId;

    try {
      userService.getUserById(intUserId);
    } catch (error) {
      throw new Error('User not found');
    }

    const expense = {
      id: Date.now(),
      userId: intUserId,
      spentAt,
      title,
      amount,
      category,
      ...(note && { note }),
    };

    expenses.push(expense);

    return expense;
  }

  getExpenseById(id) {
    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      throw new Error('Expense not found');
    }

    return expense;
  }

  updateExpense(id, expenseData) {
    const { spentAt, title, amount, category, note } = expenseData;
    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      throw new Error('Expense not found');
    }

    if (spentAt !== undefined) {
      expense.spentAt = spentAt;
    }

    if (title !== undefined) {
      expense.title = title;
    }

    if (amount !== undefined) {
      expense.amount = amount;
    }

    if (category !== undefined) {
      expense.category = category;
    }

    if (note !== undefined) {
      expense.note = note;
    }

    return expense;
  }

  deleteExpense(id) {
    const expenseIndex = expenses.findIndex((e) => e.id === id);

    if (expenseIndex === -1) {
      throw new Error('Expense not found');
    }

    expenses.splice(expenseIndex, 1);

    return true;
  }
}

module.exports = new ExpenseService();
