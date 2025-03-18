const checkIsValidSchema = (schema, fields) => {
  const hasAllKeys = Object.keys(schema).every((k) => fields[k]);

  const isValidTypes = Object.entries(fields).every(([key, value]) => {
    if (!schema[key]) {
      return false;
    }

    // eslint-disable-next-line valid-typeof
    return schema[key] === typeof value;
  });

  return isValidTypes && hasAllKeys;
};

module.exports = checkIsValidSchema;
