'use strict';

const {
  getAllExpenses,
  getExpensesById,
  // createExpenses,
  // deletcreateExpenses,
  // editcreateExpenses,
} = require('../services/expenses.services');

const getAllExp = (req, res) => {
  const expenses = getAllExpenses();

  res.send(expenses);
};

const getOneExp = (req, res) => {
  const { id } = req.params;
  const Expense = getExpensesById(+id);

  if (!Expense) {
    res.sendStatus(404);

    return;
  }

  res.send(Expense);
};

// const addExpenses = (req, res) => {
//   const { name } = req.body;

//   if (!name) {
//     res.sendStatus(400);

//     return;
//   }

//   res.status(201);
//   res.send(createUser(name));
// };

// const deleteExpenses = (req, res) => {
//   const { id } = req.params;
//   const isUserExist = getUserById(+id);

//   if (!isUserExist) {
//     res.sendStatus(404);

//     return;
//   }

//   deletUser(+id);
//   res.sendStatus(204);
// };

// const editExpenses = (req, res) => {
//   const { id } = req.params;
//   const { name } = req.body;
//   const userToUpdate = getUserById(+id);

//   if (!userToUpdate) {
//     res.sendStatus(404);

//     return;
//   }

//   if (typeof name !== 'string') {
//     res.sendStatus(422);

//     return;
//   }

//   const editedUser = editNameOfUser(userToUpdate, name);

//   res.send(editedUser);
// };

module.exports = {
  getAllExp,
  getOneExp,
  // addExpenses,
  // deleteExpenses,
  // editExpenses,
};
