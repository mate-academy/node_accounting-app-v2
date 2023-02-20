/* eslint-disable no-console */
/* eslint-disable space-before-function-paren */
'use strict';

const { sequelize } = require('./index');

const { DataTypes } = require('sequelize');

const Expense = sequelize.define('Expense', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  spendAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Expense.sync();

const getExpenses = async (userId, from, to) => {
  let filteredExpenses = [];

  try {
    if (userId) {
      filteredExpenses = await Expense.findAll({
        where: {
          userId,
        },
      });
    } else {
      filteredExpenses = await Expense.findAll();
    }

    if (from && to) {
      filteredExpenses = getBetweenDates(filteredExpenses, from, to);
    }

    return filteredExpenses;
  } catch (error) {
    console.error(error);
  }
};

const getBetweenDates = (expenses, from, to) => {
  if (!from || !to) {
    return;
  }

  const fromDate = new Date(from);
  const toDate = new Date(to);

  if (fromDate > toDate) {
    return;
  }

  return expenses.filter((e) => e.spendAt >= fromDate && e.spendAt <= toDate);
};

const getExpenseById = async (id) => {
  try {
    const expense = await Expense.findByPk(id);

    return expense;
  } catch (error) {
    console.error(error);
  }
};

const addExpense = async (userId, title, amount, category, note, spendAt) => {
  if (!userId || !title || !amount || !category || !note || !spendAt) {
    return;
  }

  try {
    const expense = await Expense.create({
      userId,
      title,
      amount,
      category,
      note,
      spendAt,
    });

    return expense;
  } catch (error) {
    console.error(error);
  }
};

const removeExpense = async (id) => {
  try {
    const expense = await Expense.findByPk(id);

    if (expense) {
      await expense.destroy();
    }
  } catch (error) {
    console.error(error);
  }
};

const updateExpense = async (id, title, amount, category, note, spendAt) => {
  if (!title || !amount || !category || !note || !spendAt) {
    return;
  }

  try {
    const expense = await Expense.findByPk(id);

    if (!expense) {
      return;
    }

    expense.title = title;
    expense.amount = amount;
    expense.category = category;
    expense.note = note;
    expense.spendAt = spendAt;

    await expense.save();

    return expense;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getExpenses,
  getExpenseById,
  removeExpense,
  addExpense,
  updateExpense,
  getBetweenDates,
  Expense,
};
