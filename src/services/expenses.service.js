const expensesSorter = require('../sorters/expenses.sorter');

let expenses = [];

function getAll() {
  return expenses.sort((a, b) => a.id - b.id);
}

function getSortedExpenses(userId, category, from, to) {
  let sortedExpenses = getAll();

  sortedExpenses = expensesSorter.sortByUserId(userId, sortedExpenses);
  sortedExpenses = expensesSorter.sortByCategory(category, sortedExpenses);
  sortedExpenses = expensesSorter.sortByFrom(from, sortedExpenses);
  sortedExpenses = expensesSorter.sortByTo(to, sortedExpenses);

  return sortedExpenses.sort((a, b) => a.id - b.id);
}

function getOne(id) {
  return expenses.find((item) => item.id === +id);
}

function create(data) {
  expenses.push(data);

  return data;
}

function filterExpensesById(id) {
  return expenses.filter((exp) => exp.id === +id);
}

function getIndexOf(expense) {
  return expenses.indexOf(expense);
}

function update(index, data) {
  expenses[index] = data;

  return data;
}

function deleteOne(id) {
  expenses = expenses.filter((item) => item.id !== id);
}

module.exports = {
  getAll,
  getSortedExpenses,
  getOne,
  create,
  filterExpensesById,
  getIndexOf,
  update,
  deleteOne,
};
