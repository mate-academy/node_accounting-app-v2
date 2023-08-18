'use strict';

function getNextId(array) {
  if (!array.length) {
    return 0;
  }

  return Math.max(...array.map(item => item.id)) + 1;
}

function getElementById(elements, id) {
  return elements.find(element => element.id === id) || null;
}

function deleteElementById(elements, id) {
  return elements.filter(element => element.id !== id);
}

function isElementExists(elements, id) {
  return elements.some(element => element.id === id);
}

module.exports = {
  getNextId,
  getElementById,
  deleteElementById,
  isElementExists,
};
