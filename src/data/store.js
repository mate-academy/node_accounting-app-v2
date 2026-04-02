const users = [];
const expenses = [];
let nextUserId = 1;
let nextExpenseId = 1;

function reset() {
  users.length = 0;
  expenses.length = 0;
  nextUserId = 1;
  nextExpenseId = 1;
}

module.exports = {
  users,
  expenses,
  reset,
  getNextUserId() {
    return nextUserId++;
  },
  getNextExpenseId() {
    return nextExpenseId++;
  },
};
