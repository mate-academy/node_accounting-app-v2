'use strict';

const { expensesId } = require('../helpers/getId');

const getAll = (expenses) => {
  return (req, res) => {
    const { userId, categories, from, to } = req.query;

    const filteredExpenses = expenses.filter(expense => {
      if (!isNaN(userId) && expense.userId !== +userId) {
        return false;
      }

      if (categories) {
        const arrayCategory = Array.isArray(categories)
          ? categories.forEach((category) => category.toLowerCase())
          : [categories.toLowerCase()];

        if (!arrayCategory.includes(expense.category.toLowerCase())) {
          return false;
        }
      }

      if (from && (new Date(expense.spentAt)) <= (new Date(from))) {
        return false;
      }

      if (to && (new Date(expense.spentAt)) >= (new Date(to))) {
        return false;
      }

      return true;
    });

    res.send(filteredExpenses);
  };
};

const add = (expenses, users) => {
  return (req, res) => {
    const { userId, spentAt, title, amount, category } = req.body;

    if (!userId || !spentAt || !title || !amount || !category) {
      res.sendStatus(400);

      return;
    }

    const foundUser = users.find((user) => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(400);

      return;
    }

    const expense = {
      id: expensesId.getId(),
      ...req.body,
    };

    expenses.push(expense);

    res.status(201).send(expense);
  };
};

const getOne = (expenses) => {
  return (req, res) => {
    const { id } = req.params;

    const foundExpense = expenses.find(
      (expense) => expense.id === +id
    );

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpense);
  };
};

const update = (expenses) => {
  return (req, res) => {
    const { id } = req.params;
    const { spentAt, title, amount, category, note } = req.body;

    const foundedExpense = expenses.find(
      (expense) => expense.id === +id
    );

    if (!foundedExpense) {
      res.sendStatus(404);

      return;
    }

    if (spentAt) {
      foundedExpense.spentAt = spentAt;
    }

    if (title) {
      foundedExpense.title = title;
    }

    if (amount) {
      foundedExpense.amount = amount;
    }

    if (category) {
      foundedExpense.category = category;
    }

    if (note) {
      foundedExpense.note = note;
    }

    res.send(foundedExpense);
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
