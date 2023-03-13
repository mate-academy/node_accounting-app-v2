'use strict';

const generateUnicId = () => {
  const date = Number(Date.now().toString());

  return date;
};

module.exports = generateUnicId;
