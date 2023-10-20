'use strict';

function prepareIdFromReq(req) {
  return Number(req.url.slice(1));
}

module.exports = {
  prepareIdFromReq,
};
