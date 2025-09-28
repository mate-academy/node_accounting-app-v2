// expensesData.js
const expenses = [];

function resetExpenses() {
  expenses.length = 0; // очищаємо масив
}

module.exports = { expenses, resetExpenses };
