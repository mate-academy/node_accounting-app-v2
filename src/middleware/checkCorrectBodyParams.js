'use strict';

function checkCorrectBodyParams(paramsTitle, statusCode = 400) {
  return (req, res, next) => {
    for (const param of paramsTitle) {
      if (typeof req.body[param] !== 'string' || !req.body[param]) {
        res.send(statusCode);

        return;
      }
    }

    next();
  };
}

module.exports = {
  checkCorrectBodyParams,
};
