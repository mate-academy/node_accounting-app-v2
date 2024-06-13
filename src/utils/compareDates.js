function compareDates(a, b) {
  const timeA = new Date(a).getTime();
  const timeB = new Date(b).getTime();

  return timeA - timeB;
}

module.exports = {
  compareDates,
};
