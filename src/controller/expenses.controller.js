const expenses = [{
  "id": 0,
  "userId": 0,
  "spentAt": "2015-07-20T15:49:04-07:00",
  "title": "string",
  "amount": 0,
  "category": "string",
  "note": "string"
}];


const get = (req, res) => {
  const { id } = req.params;
  console.log(id);

  if (!id) {
    res.sendStatus(404);
  }

  const expense = expenses.find((exp) => exp.id === +id);

  res.send(expense);
};


module.exports = {
  get
}
