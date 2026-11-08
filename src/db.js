'use strict';

function createDb() {
  return {
    users: [],
    expenses: [],
    nextUserId: 1,
    nextExpenseId: 1,
  };
}

module.exports = { createDb };
