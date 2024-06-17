const dateComparer = (a, b) => {
  const firstDate = new Date(a).getTime();
  const secondDate = new Date(b).getTime();

  return firstDate - secondDate;
};

module.exports = {
  dateComparer,
};
