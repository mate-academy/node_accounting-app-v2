'use strict';

let number = 0;

const unicId = () => {
  number++;

  return number;
};

module.exports = { unicId };
