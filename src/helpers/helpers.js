'use strict';

let idUser = 0;


const uniqueUserId = (name) => {
  switch (name) {
    case 'user':
      idUser++;

      return idUser;
    case 'expenses':
      idExpenses++;

      return idExpenses;
  }
};

let idExpenses = 0;
const uniqueExpenseId = (name) => {
  idExpenses++;

      return idExpenses;
};

module.exports = { uniqueUserId, uniqueExpenseId };
