/* eslint-disable no-console */
/* eslint-disable space-before-function-paren */
'use strict';

const { sequelize } = require('./index');

const { DataTypes } = require('sequelize');

const { DateTime } = require('luxon');

const Expense = sequelize.define('Expense', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  spentAt: {
    type: DataTypes.STRING,
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

const getBetweenDates = (expenses, from, to) => {
  if (!from || !to) {
    return;
  }

  const fromDate = DateTime.fromISO(from).toMillis();
  const toDate = DateTime.fromISO(to).toMillis();

  console.log(fromDate, toDate);

  if (fromDate > toDate) {
    return;
  }

  return expenses.filter((e) => {
    const expenseDate = DateTime.fromISO(e.spentAt).toMillis();

    return expenseDate >= fromDate && expenseDate <= toDate;
  });
};

const getExpenses = async (userId, from, to, category) => {
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

    if (category) {
      filteredExpenses = filteredExpenses.filter(
        (e) => e.category === category
      );
    }

    if (from && to) {
      filteredExpenses = getBetweenDates(filteredExpenses, from, to);
    }

    return filteredExpenses;
  } catch (error) {
    console.error(error);
  }
};

const getExpenseById = async (id) => {
  try {
    const expense = await Expense.findByPk(id);

    return expense;
  } catch (error) {
    console.error(error);
  }
};

const addExpense = async ({
  userId,
  title,
  amount,
  category,
  note,
  spentAt,
}) => {
  try {
    const expense = await Expense.create({
      userId,
      title,
      amount,
      category,
      note,
      spentAt,
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

const updateExpense = async (id, title, amount, category, note, spentAt) => {
  if (!title || !amount || !category || !note || !spentAt) {
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
    expense.spentAt = spentAt;

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
