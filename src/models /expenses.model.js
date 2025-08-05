const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'expenses.json');

function getAllExpenses() {
  const data = fs.readFileSync(filePath, 'utf-8');

  return JSON.parse(data);
}

function getExpense(expId) {
  const expenses = getAllExpenses();

  return expenses.find((curExp) => curExp.id === expId);
}

function createExpense(body) {
  const expenses = getAllExpenses();
  const newId = expenses.length
    ? Math.max(...expenses.map((exp) => exp.id)) + 1
    : 1;

  const newExp = {
    id: newId,
    ...body,
  };

  expenses.push(newExp);

  fs.writeFileSync(filePath, JSON.stringify(expenses, null, 2));

  return newExp;
}

function removeExpense(expId) {
  const expenses = getAllExpenses();
  const ids = expenses.map((exp) => exp.id);

  if (!ids.includes(expId)) {
    return;
  }

  const removedExp = expenses.find((exp) => exp.id === expId);
  const newExpances = expenses.filter((exp) => exp.id !== expId);

  fs.writeFileSync(filePath, JSON.stringify(newExpances, null, 2));

  return removedExp;
}

function editExpense(expId, body) {
  const expenses = getAllExpenses();
  const curExpIndex = expenses.findIndex((exp) => exp.id === expId);

  if (curExpIndex === -1) {
    return null;
  }

  const newExp = {
    id: expId,
    userId: expenses[curExpIndex].userId,
    ...body,
  };
  const newExpanses = [
    ...expenses.slice(0, curExpIndex),
    newExp,
    ...expenses.slice(curExpIndex + 1),
  ];

  fs.writeFileSync(filePath, JSON.stringify(newExpanses, null, 2));

  return newExp;
}

module.exports = {
  getAllExpenses,
  getExpense,
  createExpense,
  removeExpense,
  editExpense,
};
