const handleErrors = (controllerFn) => (req, res, next) => {
  try {
    controllerFn(req, res, next);
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = {
  handleErrors,
};
