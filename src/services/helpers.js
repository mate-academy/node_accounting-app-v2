'use strict';

function getNewId(array) {
  if (!array.length) {
    return 0;
  }

  return Math.max(...array.map(item => item.id)) + 1;
}

function deleteElementById(elements, id) {
  return elements.filter(element => element.id !== id);
}

function isElementExists(elements, id) {
  return elements.filter(element => element.id === id).length > 0;
}

function getElementById(elements, id) {
  return elements.find(element => element.id === id) || null;
}

module.exports = {
  getNewId,
  getElementById,
  deleteElementById,
  isElementExists,
};
