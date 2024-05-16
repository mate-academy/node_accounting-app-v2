const { v4: uuidv4 } = require('uuid');

const uuidToNumeric = () => {
  const hexString = uuidv4().replace(/-/g, '');
  const numericId = parseInt(hexString, 16);

  const MAX_DIGITS = 10000000000000000;
  const truncatedId = numericId % MAX_DIGITS;

  return truncatedId;
};

module.exports = { uuidToNumeric };
