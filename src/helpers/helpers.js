'use strict';

let idUser = 0;
let idExpenses = 0;

const unicId = (name) => {
  if (name === 'user') {
    idUser++;

    return idUser;
  }

  idExpenses++;

  return idExpenses;
};

module.exports = { unicId };
