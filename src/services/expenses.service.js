import * as userService from './users.service.js';

export const expenses = [];

let maxExpenseId = -1;

export function getAll(query) {
  if (!query) {
    return expenses;
  } else {
    return expenses.filter((expense) => {
      const matchesUser =
        query.userId !== undefined
          ? expense.userId === Number(query.userId)
          : true;

      const matchesCategory =
        query.categories && query.categories.length > 0
          ? query.categories.includes(expense.category)
          : true;

      const matchesFrom = query.from
        ? expense.spentAt >= new Date(query.from)
        : true;

      const matchesTo = query.to ? expense.spentAt <= new Date(query.to) : true;

      return matchesUser && matchesCategory && matchesFrom && matchesTo;
    });
  }
}

export function getById(id) {
  return expenses.find((expense) => expense.id === id);
}

export function create(expense) {
  const id = ++maxExpenseId;
  const newExpense = { ...expense, id, spentAt: new Date(expense.spentAt) };

  const user = userService.getById(expense.userId);

  if (!user) {
    return null;
  }

  expenses.push(newExpense);

  return newExpense;
}

export function deleteById(id) {
  const index = expenses.findIndex((u) => u.id === id);

  if (index === -1) {
    return;
  }

  const [expense] = expenses.splice(index, 1);

  return expense;
}

export function update(id, updateExpense) {
  const expense = expenses.find((exp) => exp.id === id);

  if (!expense) {
    return;
  }

  return Object.assign(expense, updateExpense);
}
