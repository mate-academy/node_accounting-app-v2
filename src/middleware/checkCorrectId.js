'use strict';

function checkCorrectId(variable, statusCode) {
  return (req, res, next) => {
    if (isNaN(req.params[variable])) {
      res.status(statusCode).send({ error: 'Bad request' });

      return;
    }

    next();
  };
}

module.exports = {
  checkCorrectId,
};
