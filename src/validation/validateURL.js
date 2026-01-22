const { ent, mthds } = require('../static/constants');
const { getValError, readBody, isJSON } = require('./utils');

const expSchema = {
  spentAt: '',
  title: 't',
  amount: 0,
  category: 'c',
  mote: 'n',
};

const methodsBodyMap = {
  [ent.usr]: {
    [mthds.get]: null,
    [mthds.patch]: { name: 'n' },
    [mthds.post]: { name: 'n' },
    [mthds.delete]: null,
  },
  [ent.exp]: {
    [mthds.get]: null,
    [mthds.patch]: expSchema,
    [mthds.post]: { id: 0, ...expSchema },
    [mthds.delete]: null,
  },
};

async function validateBody(req, method, path) {
  try {
    const body = await readBody(req);

    if (!body) {
      return getValError(400, 'Request body is missing');
    }

    const decoded = isJSON(body);

    if (!isJSON) {
      return getValError(400, 'Unexpected body extension');
    }

    const schemeKeys = Object.keys(methodsBodyMap[method][path]);
    const bodyKeys = Object.keys(decoded);

    if (schemeKeys.length !== bodyKeys.length) {
      return getValError(400, 'Unexpected body length');
    }

    if (!bodyKeys.every((el) => schemeKeys.includes(el))) {
      return getValError(400, 'Unexpected body keys');
    }

    for (const [key, value] of methodsBodyMap) {
      const check = typeof value === typeof decoded[key];

      if (!check) {
        return getValError(
          400,
          `Expected ${decoded[key]} to be ${typeof value}`,
        );
      }
    }

    return { ok: true };
  } catch {
    return getValError(500, 'Unexpected server error');
  }
}

function validate(req) {
  const method = req.method;
  const path = req.pathname;

  const requestCheck = validateURL(method, path);

  if (!requestCheck.ok) {
    return requestCheck;
  }

  const endpoint = path.split('/')[0];

  if (methodsBodyMap[method][endpoint]) {
    const check = validateBody(req, method, endpoint);

    if (!check.ok) {
      return check;
    }
  }

  return { ok: true };
}

function validateURL(mthd, pth) {
  const path = pth.split('/');

  const validateMethod = Object.values(mthds).includes(mthd);

  if (!validateMethod) {
    return getValError(405, `Unsupported  API method: ${mthd}`);
  }

  if (pth.length > 2) {
    return getValError(
      400,
      `Expected endpoint to be /entity/id?, received: ${pth}`,
    );
  }

  if (!Object.values(ent).includes(path[0])) {
    return getValError(400, `Unexpected entity: ${path[0]}`);
  }

  if (pth[1]) {
    const id = Number(path[1]);

    if (!Number.isInteger(id)) {
      return getValError(400, `Unexpected non-integer id: ${path[1]}`);
    }
  }

  return {
    ok: true,
  };
}

module.exports = { validateURL };
