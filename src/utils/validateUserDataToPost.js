'use strict';

function validateUserDataToPost({ spentAt, title, amount, category }) {
  return typeof spentAt === 'string'
  || typeof title === 'string'
  || typeof amount === 'number'
  || typeof category === 'string';
}

module.exports = {
  validateUserDataToPost,
};
