const uuidv4 = require('uuidv4'); 

let expenses = [];

export const getAllExpenses = () => {
  return expenses;
};

export const getExpenseById = (expenseId) => {
  return users.find(expense => expense.id === expenseId) || null;
};

export const updateExpense = (userId, spentAt, title, amount, category, note) => {
  const expense = getExpenseById(expenseId);

  Object.assign(user, { userId, spentAt, title, amount, category, note });

  return expense;
}

export const addExpense = (userId, spentAt, title, amount, category, note = 'empty') => {
  const newExpense = {
    id: uuidv4(),
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

export const deleteExpense = (expenseId) => {
  expenses = expenses.filter(expense => expense.id !== expenseId);
}