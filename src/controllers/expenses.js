'use strict';

const { expensesId } = require('../helpers/getId');

const getAll = (expenses) => {
  return (req, res) => {
    const { userId, categories, from, to } = req.query;

    let filteredExpenses = expenses;

    if (!isNaN(userId)) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.userId === +userId
      );
    }

    if (categories) {
      const arrayCategory = Array.isArray(categories)
        ? categories.forEach((category) => category.toLowerCase())
        : [categories.toLowerCase()];

      filteredExpenses = filteredExpenses.filter((expense) =>
        arrayCategory.includes(expense.category.toLowerCase())
      );
    }

    if (from) {
      filteredExpenses = filteredExpenses.filter(
        ({ spentAt }) => (new Date(spentAt)) > (new Date(from))
      );
    }

    if (to) {
      filteredExpenses = filteredExpenses.filter(
        ({ spentAt }) => (new Date(spentAt)) < (new Date(to))
      );
    }

    res.send(filteredExpenses);
  };
};

const add = (expenses, users) => {
  return (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount || !category) {
      res.sendStatus(400);

      return;
    }

    const foundedUser = users.find((user) => user.id === +userId);

    if (!foundedUser) {
      res.sendStatus(400);

      return;
    }

    const expense = {
      id: expensesId.getId(),
      ...req.body,
      note,
    };

    expenses.push(expense);

    res.status(201).send(expense);
  };
};

const getOne = (expenses) => {
  return (req, res) => {
    const { id } = req.params;

    const foundedExpense = expenses.find(
      (expense) => expense.id === +id
    );

    if (!foundedExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(foundedExpense);
  };
};

const update = (expenses) => {
  return (req, res) => {
    const { id } = req.params;
    const { spentAt, title, amount, category, note } = req.body;

    const foundededExpense = expenses.find(
      (expense) => expense.id === +id
    );

    if (!foundededExpense) {
      res.sendStatus(404);

      return;
    }

    if (spentAt) {
      foundededExpense.spentAt = spentAt;
    }

    if (title) {
      foundededExpense.title = title;
    }

    if (amount) {
      foundededExpense.amount = amount;
    }

    if (category) {
      foundededExpense.category = category;
    }

    if (note) {
      foundededExpense.note = note;
    }

    res.send(foundededExpense);
  };
};

const remove = (expenses) => {
  return (req, res) => {
    const { id } = req.params;

    const index = expenses.findIndex(
      (expense) => expense.id === +id
    );

    if (index === -1) {
      res.sendStatus(404);

      return;
    }

    expenses.splice(index, 1);
    expensesId.addFreeId(index);

    res.sendStatus(204);
  };
};

module.exports = {
  getAll,
  add,
  getOne,
  update,
  remove,
};
