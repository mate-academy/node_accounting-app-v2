const {
    getAllExpenses,
    getExpenseById,
    addExpense,
    updateExpense,
    deleteExpense,
  } = require('../services/expensesService');
  
  export const get = (req, res) => {
    res.send(getAllExpenses);
  };
  
  export const getOne = (req, res) => {
    const { id } = req.params;
  
    const expense = getExpenseById(id);
  
    if (!expense) {
      res.statusCode(404);
      res.end('Expense not found');
      return;
    }
  
    res.send(expense);
  };
  
  export const add = (req, res) => {
    const { userId, spentAt, title, amount, category, note }  = req.body;
  
    if (!userId || !spentAt || !title || !amount || !category) {
      res.statusCode(404);
      res.end('Name is required');
      return;
    }
  
    const newExpense = addExpense(userId, spentAt, title, amount, category, note);
      
    res.statusCode(201);
  
    res.send(newExpense);
  };
  
  export const change = (req, res) => {
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
  
  export const remove = (req, res) => {
    const { id } = req.params;
  
    if (getExpenseById(id)) {
      res.statusCode(404);
      res.end('User not found');
      return;
    }
  
    deleteExpense(id);
      
    res.sendStatus(204);
  };
  