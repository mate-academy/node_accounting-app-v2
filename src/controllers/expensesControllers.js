const {
    getAllExpenses,
    getExpenseById,
    addExpense,
    updateExpense,
    deleteExpense,
  } = require('../services/expensesService');
  
const loadExpenses = (req, res) => {
  res.send(getAllExpenses);
};
  
const loadOneExpense = (req, res) => {
  const { id } = req.params;

  const expense = getExpenseById(id);

  if (!expense) {
    res.statusCode(404);
    res.end('Expense not found');
    return;
  }
  
  res.send(expense);
};
  
const addOneExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note }  = req.body;

  if (!userId || !spentAt || !title || !amount || !category) {
    res.statusCode(404);
    res.end('All fields are required');
    return;
  }

  try {
    const newExpense = addExpense(userId, spentAt, title, amount, category, note);
  
    res.statusCode(201);
  
    res.send(newExpense);
  } catch {
    res.statusCode(500);
    res.end('Error while adding');
    return;
  }
};
  
const changeOneExpense = (req, res) => {
  const { expenseId } = req.params;
  const { userId, spentAt, title, amount, category, note } = req.body;

  const expense = getExpenseById(expenseId);

  if (!expense) {
    res.statusCode(404);
    res.end('No such user');
    return;
  }

  if (typeof userId !== 'number'
    || typeof spentAt !== 'string'
    || typeof title !== 'string'
    || typeof amount !== 'number'
    || typeof category !== 'string') {
    res.statusCode(422);
    res.end('Invalid request data');
    return;
  }
  
  const updatedExpense = updateExpense(expenseId, userId, spentAt, title, amount, category, note);

  res.send(updatedExpense);
};
  
const removeExpense = (req, res) => {
  const { id } = req.params;

  if (getExpenseById(id)) {
    res.statusCode(404);
    res.end('User not found');
    return;
  }

  deleteExpense(id);
  
  res.sendStatus(204);
};

module.exports = {
  loadExpenses,
  loadOneExpense,
  addOneExpense,
  changeOneExpense,
  removeExpense,
};
  