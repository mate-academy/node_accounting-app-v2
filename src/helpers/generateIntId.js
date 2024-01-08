'use strict';

const { v4: uuidv4 } = require('uuid');
const uuidParse = require('uuid-parse');

function generateIntId() {
  const parsedUuid = uuidParse.parse(uuidv4());
  const buffer = Buffer.from(parsedUuid);
  const result = buffer.readUInt32BE(0);

  return result;
}

module.exports = {
  generateIntId,
};
