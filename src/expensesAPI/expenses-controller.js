'use strict';

// Imports:
const fs = require('fs');
const path = require('path');
const { getUsersFromDB } = require('../usersAPI/users-controller');

// Path:
const expensesDataBasePath = path.join(
  __dirname, '..', 'data', 'expenses.json'
);

// - Array for tests only; expenses.json file
// |-- could store all the data permanently.
let expensesArr = [];

// Function to get the data from the array/json/db:
const getExpensesFromDB = () => {
  const data = fs.readFileSync(expensesDataBasePath).toString();

  // TODO:
  // Return this from this func but NOT expensesArr to use .json as DB.
  JSON.parse(data);

  return expensesArr;
};

// Function to write the data into the array/json/db:
const writeExpensesToDB = (newData) => {
  fs.writeFileSync(expensesDataBasePath, JSON.stringify(newData, null, 2));

  // TODO:
  // Remove this line to use .json as DB.
  expensesArr = newData;
};

const getAllExpenses = (request, response) => {
  try {
    const jsonData = getExpensesFromDB();
    const params = request.query;
    let responseData = jsonData;

    if (params.userId) {
      responseData = responseData.filter(
        item => item.userId === +params.userId
      );
    }

    if (params.category) {
      responseData = responseData.filter(
        item => item.category === params.category
      );
    }

    if (params.from && params.to) {
      responseData = responseData.filter(item => {
        const itemDate = new Date(item.spentAt);

        return itemDate >= new Date(params.from)
          && itemDate <= new Date(params.to);
      });
    }

    response.statusCode = 200;
    response.json(responseData);
  } catch (e) {
    response.sendStatus(500);
  }
};

const getOneExpense = (request, response) => {
  const { userID } = request.params;

  try {
    const jsonData = getExpensesFromDB();
    const targetExpense = jsonData.find(
      item => item.id === +userID
    );

    if (!targetExpense) {
      response.sendStatus(404);

      return;
    }

    response.statusCode = 200;
    response.json(targetExpense);
  } catch (e) {
    response.sendStatus(500);
  }
};

const createExpense = (req, res) => {
  try {
    const allUsers = getUsersFromDB();
    const jsonData = getExpensesFromDB();
    const newData = req.body;
    const currentUser = allUsers.find(user => user.id === newData.userId);

    if (!newData.title || !currentUser) {
      res.sendStatus(400);

      return;
    }

    newData.id = jsonData.length + 1;
    jsonData.push(newData);

    writeExpensesToDB(jsonData);

    res.statusCode = 201;
    res.json(newData);
  } catch (e) {
    res.sendStatus(500);
  }
};

const updateExpense = (req, res) => {
  const { expenseId } = req.params;

  try {
    const jsonData = getExpensesFromDB();
    const currentExpenseIndex = jsonData
      .findIndex(item => item.id === +expenseId);
    const currentExpense = jsonData.find(item => item.id === +expenseId);
    const newData = req.body;

    if (!currentExpense || !newData.title) {
      res.sendStatus(404);

      return;
    }

    jsonData[currentExpenseIndex] = {
      ...currentExpense, ...newData, id: +expenseId,
    };

    writeExpensesToDB(jsonData);

    res.statusCode = 200;
    res.json(jsonData[currentExpenseIndex]);
  } catch (e) {
    res.sendStatus(500);
  }
};

const deleteExpense = (req, res) => {
  const { expenseId } = req.params;

  try {
    const jsonData = getExpensesFromDB();

    if (!jsonData.find(item => item.id === +expenseId)) {
      res.sendStatus(404);

      return;
    }

    const newData = jsonData.filter(item => item.id !== +expenseId);

    writeExpensesToDB(newData);

    res.sendStatus(204);
  } catch (e) {
    res.sendStatus(500);
  }
};

module.exports = {
  getAllExpenses,
  getOneExpense,
  createExpense,
  updateExpense,
  deleteExpense,
};
