const createUserController = () => {
  let users = [];
  let expenses = [];

  const getUser = (request, response) => {
    if (users.length === 0) {
      return response.status(200).json(users);
    } else {
      response.status(200).json(users);
    }
  };

  const postAddUser = (request, response) => {
    const { name } = request.body;

    if (!name) {
      return response.sendStatus(400);
    }

    const user = {
      id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
      name: name,
    };

    users.push(user);

    return response.status(201).json(user);
  };

  const getOne = (request, response) => {
    const { id } = request.params;

    const user = users.find((u) => u.id === parseInt(id));

    if (!user) {
      return response.sendStatus(404);
    } else {
      response.status(200).json(user);
    }
  };

  const deleteUser = (request, response) => {
    const { id } = request.params;

    const newUsers = users.filter((u) => u.id !== parseInt(id));

    if (newUsers.length === users.length) {
      return response.sendStatus(404);
    } else {
      users = newUsers;
      response.sendStatus(204);
    }
  };

  const editUser = (request, response) => {
    const id = parseInt(request.params.id);
    const { name } = request.body;

    const toEdit = users.find((u) => u.id === id);

    if (!toEdit) {
      return response.sendStatus(404);
    }

    if (!name || !id) {
      return response.sendStatus(400);
    } else {
      Object.assign(toEdit, { name });

      response.status(200).json(toEdit);
    }
  };
  const getExpense = (request, response) => {
    const userIdQuery = parseInt(request.query.userId);
    const { from, to } = request.query;
    const { categories } = request.query;

    let expenseFiltered = expenses;

    if (categories) {
      // eslint-disable-next-line max-len
      expenseFiltered = expenseFiltered.filter(
        (c) => c.category === categories,
      );
    }

    if (from || to) {
      if (from) {
        expenseFiltered = expenseFiltered.filter((d) => d.spentAt >= from);
      }

      if (to) {
        expenseFiltered = expenseFiltered.filter((d) => d.spentAt <= to);
      }
    }

    if (userIdQuery) {
      expenseFiltered = expenseFiltered.filter(
        (ex) => ex.userId === userIdQuery,
      );

      return response.status(200).json(expenseFiltered);
    }

    response.status(200).json(expenseFiltered);
  };

  const postExpense = (request, response) => {
    const { spentAt, title, category, note } = request.body;
    const userId = parseInt(request.body.userId);
    const amount = parseInt(request.body.amount);

    const isUser = users.find((u) => parseInt(u.id) === userId);

    if (!isUser) {
      return response.sendStatus(400);
    }

    const expense = {
      id: expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(expense);

    response.status(201).json(expense);
  };

  const getOneExpense = (request, response) => {
    const id = parseInt(request.params.id);

    const expense = expenses.find((ex) => ex.id === id);

    if (!expense) {
      return response.sendStatus(404);
    } else {
      response.status(200).json(expense);
    }
  };

  const updateExpense = (request, response) => {
    const { spentAt, title, amount, category, note } = request.body;
    const expenseId = parseInt(request.params.id);

    const editExpense = expenses.find((ex) => ex.id === expenseId);

    if (!editExpense) {
      return response.sendStatus(404);
    }

    if (spentAt) {
      editExpense.spentAt = spentAt;
    }

    if (title) {
      editExpense.title = title;
    }

    if (amount) {
      editExpense.amount = amount;
    }

    if (category) {
      editExpense.category = category;
    }

    if (note) {
      editExpense.note = note;
    }

    response.status(200).json(editExpense);
  };

  const deleteExpense = (request, response) => {
    const expenseId = parseInt(request.params.id);

    if (!expenseId) {
      return response.sendStatus(404);
    }

    const newExpense = expenses.filter((ex) => ex.id !== expenseId);

    if (newExpense.length === expenses.length) {
      return response.sendStatus(404);
    }

    expenses = newExpense;

    response.status(204).json(expenses);
  };

  return {
    getUser,
    postAddUser,
    getOne,
    deleteUser,
    editUser,
    users,
    postExpense,
    getExpense,
    getOneExpense,
    updateExpense,
    deleteExpense,
  };
};

module.exports = {
  createUserController,
};
