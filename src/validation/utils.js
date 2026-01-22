const getValError = (statusCode, msg) => ({
  ok: false,
  statusCode: statusCode,
  message: msg,
});

async function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';

    req.on('error', reject);

    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => resolve(data));

    req.on('cancel', () => {
      req.destroy();

      return reject;
    });
  });
}

const isJSON = (data) => {
  try {
    const res = JSON.parse(data);

    return res;
  } catch {
    return false;
  }
};

module.exports = { getValError, readBody, isJSON };
