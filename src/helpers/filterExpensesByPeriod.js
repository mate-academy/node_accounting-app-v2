function filterByPeriod(el, from, to) {
  const spentAt = new Date(el.spentAt);
  const start = new Date(from);
  let end = new Date();

  if (to) {
    end = new Date(to);
  }

  return spentAt >= start && spentAt <= end;
}

module.exports = filterByPeriod;
