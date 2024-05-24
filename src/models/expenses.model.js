const fs = require('fs');
const path = require('path');
const { Expense } = require('../helpers/newExpense');

async function getAllExpenses() {
  const fullPath = path.join(__dirname, '..', 'db', 'expenses.json');

  const expenses = await fs.readFileSync(fullPath);

  return JSON.parse(expenses.toString());
}

async function postExpense({
  userId,
  spentAt,
  title,
  amount,
  category,
  note = '',
}) {
  const newExpense = new Expense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  const { expenses } = await getAllExpenses();

  expenses.push(newExpense);

  const fullPath = path.join(__dirname, '..', 'db', 'expenses.json');

  fs.writeFileSync(fullPath, JSON.stringify({ expenses }));

  return newExpense;
}

async function getExpenseById(id) {
  const { expenses } = await getAllExpenses();

  return expenses.find((expense) => expense.id === id);
}

async function deleteExpenseById(id) {
  let { expenses } = await getAllExpenses();

  const isExpenseExist = expenses.find((expense) => expense.id === id);

  if (!isExpenseExist) {
    return false;
  }

  expenses = expenses.filter((expense) => expense.id !== id);

  const fullPath = path.join(__dirname, '..', 'db', 'expenses.json');

  fs.writeFileSync(fullPath, JSON.stringify({ expenses }));

  return true;
}

async function updateExpenseById(id, data) {
  let { expenses } = await getAllExpenses();
  let updatedExpense;

  expenses = expenses.map((expense) => {
    if (expense.id === id) {
      const newExpense = { ...expense, ...data };

      updatedExpense = newExpense;

      return newExpense;
    }

    return expense;
  });

  const fullPath = path.join(__dirname, '..', 'db', 'expenses.json');

  fs.writeFileSync(fullPath, JSON.stringify({ expenses }));

  return updatedExpense;
}

module.exports = {
  getAllExpenses,
  postExpense,
  getExpenseById,
  deleteExpenseById,
  updateExpenseById,
};
