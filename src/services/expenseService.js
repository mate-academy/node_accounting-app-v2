/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
'use strict';

const expenses = new Map();

class ExpenseService {
  createExpense(userId, spentAt, title, amount, category, note) {
    const newExpense = {
      userId,
      id: expenses.size + 1,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.set(newExpense.id, newExpense);

    return newExpense;
  }

  getAllExpenses(filters = {}) {
    const filteringTests = {
      userId: (id, expense) => Number(id) === expense.userId,
      id: (id, expense) => Number(id) === expense.id,
      from: (from, expense) => new Date(expense.spentAt) > new Date(from),
      to: (to, expense) => new Date(expense.spentAt) < new Date(to),
      categories: (category, expense) => category === expense.category,
      default: () => true,
    };

    return Array.from(expenses.values()).filter((expense) =>
      Object.entries(filters).every(([currKey, currVal]) => {
        const test = filteringTests[currKey] ?? filteringTests.default;

        return test(currVal, expense);
      }));
  }

  updateExpense(newExpense = {}) {
    const expense = expenses.get(Number(newExpense.id));

    if (expense) {
      const updatedExpense = { ...expense, ...newExpense };

      expenses.set(updatedExpense.id, updatedExpense);

      return updatedExpense;
    }

    return null;
  }

  deleteExpense(id) {
    return expenses.delete(id);
  }

  resetExpenses() {
    expenses.clear();
  }
}

module.exports = { ExpenseService };
