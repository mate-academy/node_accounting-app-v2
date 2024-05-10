'use strict';

const { v4: uuidv4 } = require('uuid');

function getId() {
  return uuidv4(null, Buffer.allocUnsafe(16)).readUInt32BE(0);
}

module.exports = {
  getId,
};
