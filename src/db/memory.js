'use strict';

const users = [];
const expenses = [];

let userIdSeq = 1;
let expenseIdSeq = 1;

const toNum = (v) => Number.parseInt(v, 10);

const findUser = (id) => users.find((u) => u.id === id);
const findExpense = (id) => expenses.find((e) => e.id === id);

module.exports = {
  users,
  expenses,
  // Mesma lógica do código original: começa em 1 e soma 1 antes de atribuir
  nextUserId: () => (userIdSeq += 1),
  nextExpenseId: () => (expenseIdSeq += 1),
  findUser,
  findExpense,
  toNum,
};
