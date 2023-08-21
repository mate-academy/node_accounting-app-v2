'use strict';

class ExpenseService {
  static expenses = [];

  static queryType = {
    USER_ID: 'userId',
    FROM: 'from',
    TO: 'to',
    CATEGORY: 'category',
  }

   static IExpense = {
    userId: 0,
    spentAt: '',
    title: '',
    amount: 0,
    category: '',
    note: '',
  };

  static checkCreateDTO(expense) {
    const interfaceKeys = JSON.stringify(Object.keys(this.IExpense).sort());
    const expenseKeys = JSON.stringify(Object.keys(expense).sort());

    return interfaceKeys === expenseKeys;
  };

  static async getExpenses({ searchQuery }) {
    let filteredExpenses = [ ...this.expenses ];

    for (const [queryKey, queryValue] of Object.entries(searchQuery)) {
      console.log(Object.entries(searchQuery))
      console.log(queryKey, queryValue)
      filteredExpenses = filteredExpenses.filter((expense) => {
        switch (queryKey) {
          case this.queryType.FROM:
            return Date.parse(expense.spentAt) >= Date.parse(queryValue);

          case this.queryType.TO:
            return Date.parse(expense.spentAt) < Date.parse(queryValue);

          case this.queryType.USER_ID:
            return expense[queryKey] === Number(queryValue);

          case this.queryType.CATEGORY:
            return expense[queryKey] === String(queryValue);

          default:
            break;
        }
      });
    }

    return filteredExpenses;
  };

  static async getExpenseById(expenseId) {
    const existingExpense = await this.expenses.find(
      expense => expense.id === Number(expenseId),
    );

    return existingExpense || null;
  }

  static async createExpense(expense) {
    const id = await this.expenses[this.expenses.length - 1]?.id + 1 || 1;

    const newExpense = {
      id,
      ...expense,
    }

    this.expenses.push(newExpense);

    return newExpense;
  }

  static canBeUpdated = [
    'spentAt',
    'title',
    'amount',
    'category',
    'note',
  ]

  static checkUpdateDTO(expense) {
    return Object.keys(expense).every(key => this.canBeUpdated.includes(key))
  }

  static async updateExpense(expenseId, { ...fieldsToUpdate }) {
    const existingExpense = await this.getExpenseById(expenseId);

    if (existingExpense) {
      Object.assign(existingExpense, fieldsToUpdate);

      return existingExpense;
    }

    return null;
  }

  static async deleteExpense(expenseId) {
    this.expenses = this.expenses.filter(
      expense => expense.id !== Number(expenseId),
    );
  }
}

module.exports = { ExpenseService };
