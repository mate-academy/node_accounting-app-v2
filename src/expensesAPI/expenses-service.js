const fs = require('fs');
const path = require('path');

// Path:
const expensesDataBasePath = path.join(
  __dirname, '..', 'data', 'expenses.json'
);

// - Array for tests only; expenses.json file
// |-- could store all the data permanently.
let expenses = [];

// Function to get the data from the array/json/db:
const getExpensesFromDB = () => {
  const data = fs.readFileSync(expensesDataBasePath).toString();

  // TODO:
  // Return this from this func but NOT expensesArr to use .json as DB.
  JSON.parse(data);

  return expenses;
};

// Function to write the data into the array/json/db:
const writeExpensesToDB = (newData) => {
  fs.writeFileSync(expensesDataBasePath, JSON.stringify(newData, null, 2));

  // TODO:
  // Remove this line to use .json as DB.
  expenses = newData;
};

module.exports = {
  getExpensesFromDB,
  writeExpensesToDB,
};
