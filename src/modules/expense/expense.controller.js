'use strict';

const { ExpenseService } = require('./expense.service');
const { UserService } = require('./../user/user.service');

class ExpenseController {
  async getExpenses(req, res) {
    const searchQuery = req.query;

    const expenses = await ExpenseService.getExpenses({ searchQuery });

    res.statusCode = 200;
    res.send(expenses);
  }

  async getExpensesById(req, res) {
    const { expenseId } = req.params;

    const existingExpense = await ExpenseService.getExpenseById(expenseId);

    if (!existingExpense) {
      res.statusCode = 404;
      res.end(`Expense not found`);
    }

    res.statusCode = 200;
    res.send(existingExpense);
  }

  async addExpense(req, res) {
    const expense = req.body;

    if (!ExpenseService.checkCreateDTO(expense)) {
      res.statusCode = 404;
      res.send('fill expense correctly');
    }

    if (!await UserService.getUserById(expense.userId)) {
      res.statusCode = 404;
      res.send('No user was found');
    }

    const newExpense = await ExpenseService.createExpense(expense);

    res.statusCode = 201;
    res.send(newExpense);
  }

  async updateExpense(req, res) {
    const { ...fieldsToUpdate } = req.body;
    const { expenseId } = req.params;

    const expense = await ExpenseService.getExpenseById(expenseId);

    if (!expense) {
      res.statusCode = 404;
      res.send('expense not found');
    }

    const isValid = ExpenseService.checkUpdateDTO(fieldsToUpdate);

    if (!isValid) {
      res.statusCode = 404;
      res.send('expense update not correct');
    }

    const updatedExpense = await ExpenseService.updateExpense(
      expenseId, fieldsToUpdate,
    );

    res.statusCode = 203;
    res.send(updatedExpense);
  }

  async deleteExpense(req, res) {
    const { expenseId } = req.params;

    const expense = await ExpenseService.getExpenseById(expenseId);

    if (!expense) {
      res.statusCode = 404;
      res.send('expense not found');
    }

    await ExpenseService.deleteExpense(expenseId);

    res.statusCode = 200;
    res.send('deleted successfully');
  }
}

const expenseController = new ExpenseController();

module.exports = { expenseController };
