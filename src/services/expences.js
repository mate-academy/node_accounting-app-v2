'use strict';

let expences = [];
let expencesIdCount = 0;

function resetExpences() {
  expences = [];
  expencesIdCount = 0;
}

function create(userData) {
  expencesIdCount++;

  const newExpence = {
    id: expencesIdCount,
    ...userData,
  };

  expences.push(newExpence);

  return newExpence;
}

function filterAll({ userId, categories, from, to }) {
  let filteredExpences = [...expences];

  if (userId) {
    filteredExpences = expences.filter((expence) => expence.userId === +userId);
  }

  if (categories) {
    filteredExpences = expences.filter((expence) => (
      categories.includes(expence.category)
    ));
  }

  if (from && to) {
    filteredExpences = expences.filter((expence) => (
      expence.spentFor >= from && expence.spentFor <= to
    ));
  }

  return filteredExpences;
}

function getById(expenceId) {
  return expences.find((expence) => expence.id === Number(expenceId));
}

function update(expenceId, expenceData) {
  const gotExpences = getById(expenceId);

  Object.assign(gotExpences, { ...expenceData });

  return gotExpences;
}

function remove(expenceId) {
  expences = expences.filter((expence) => expence.id !== Number(expenceId));
}

module.exports = {
  resetExpences,
  create,
  filterAll,
  getById,
  update,
  remove,
};
