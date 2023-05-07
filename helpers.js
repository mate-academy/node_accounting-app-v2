'use strict';

function validateReqBody(requestBody, fieldsToCorrespond) {
  return Object.entries(requestBody)
    .reduce((acc, [key, value]) => {
      if (fieldsToCorrespond.includes(key)) {
        acc[key] = value;
      }

      return acc;
    }, {});
}

function getMaxIdInArray(array) {
  return array.length ? Math.max(...array.map(({ id }) => id)) + 1 : 1;
};

module.exports = {
  validateReqBody,
  getMaxIdInArray,
};
