const { dbActions, mthds } = require('../static/constants');

const methodsToDbActions = {
  [mthds.post]: dbActions.post,
  [mthds.patch]: dbActions.patch,
  [mthds.delete]: dbActions.delete,
};

const controllerRouter = (entity, method, id = null, body = null) => {
  let action = methodsToDbActions[method];

  if (!action) {
    action = id === null ? dbActions.getAll : dbActions.getOne;
  }

  const args = [entity, id, body].filter((arg) => arg !== null);

  return { action: action, args: args };
};

module.exports = { controllerRouter };
