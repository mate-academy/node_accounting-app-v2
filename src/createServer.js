'use strict';

const express = require('express');
const cors = require('cors');
const {
  getUserById, getAllUsers, createNewUser, removeUser, updateUser,
} = require('./users');
const {
  getAllExpenses, getExpense, createNewExpense, removeExpense, updateExpense,
} = require('./expenses');

function createServer() {
  const app = express().use(cors());

  app.users = [];
  app.expenses = [];

  app.getUser = (userId) => {
    return app.users.find(user => user.id === +userId);
  };

  getAllUsers(app);
  getUserById(app);
  createNewUser(app);
  removeUser(app);
  updateUser(app);

  getAllExpenses(app);
  getExpense(app);
  createNewExpense(app);
  removeExpense(app);
  updateExpense(app);

  return app;
}

module.exports = {
  createServer,
};
