"use strict";

const express = require("express");
const expensesController = require("../endpoints/expensesControllers");
const expensesRouter = express.Router();

expensesRouter.get("/", expensesController.getAllExpenses);

expensesRouter.post("/", expensesController.createExpense);

expensesRouter.get("/:id", expensesController.getExpenseById);

expensesRouter.delete("/:id", expensesController.removeExpenseById);

expensesRouter.patch("/:id", expensesController.updateExpense);

module.exports = {
  expensesRouter,
};
