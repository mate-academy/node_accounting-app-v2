const dateValidator = (date) => {
  return date === new Date(date).toISOString();
};

module.exports = {
  dateValidator,
};
