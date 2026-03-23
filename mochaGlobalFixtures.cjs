'use strict';

const { expect } = require('expect');

function mochaGlobalSetup() {
  global.expect = expect;
}

module.exports = {
  mochaGlobalSetup,
};